import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler";
import { SaveList } from "../../models/savelist.model";
import mongoose, { Types } from "mongoose";
import { isValidObjectId } from "../../utils/ObjectIdValidator";
import { Resource } from "../../models/resource.model";
import { Upvotes } from "../../models/upvote.model";
import bcrpyt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import moment from "moment";
import { ResourceCollection } from "../../models/resource-collection.model";
import { ResourceLink } from "../../models/link.model";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export async function GetProfileInfoController(req: Request, res: Response) {
  try {
    const user_details = await User.findById(req.userid).select(
      "-password -user_provider_id",
    );
    if (!user_details) {
      ErrorResponse(res, { message: "User not found", status: 404 });
      return;
    }
    SuccessResponse(res, { payload: user_details });
    return;
  } catch (error) {
    ErrorResponse(res, { message: "Internal Server Error", status: 500 });
    return;
  }
}

export async function UpdateProfileInfoController(req: Request, res: Response) {
  try {
    const { name, links, about, headline, picture, username } = req.body;
    const user_details = await User.findByIdAndUpdate(
      req.userid,
      { name, links, about, headline, picture, username },
      { new: true },
    ).select("-password -user_provider_id ");
    if (!user_details) {
      ErrorResponse(res, { message: "User not found", status: 404 });
      return;
    }
    SuccessResponse(res, { payload: user_details });
    return;
  } catch (error) {
    console.log(error);
    ErrorResponse(res, { message: "Internal Server Error", status: 500 });
    return;
  }
}

export async function SaveResourceInfoController(req: Request, res: Response) {
  try {
    const { id } = req.body;
    let save_list = await SaveList.findOne({ user: req.userid });
    if (!save_list) {
      save_list = await SaveList.create({ user: req.userid, resource: [id] });
    } else {
      const query: { [key: string]: { [key: string]: string } } = {};

      if (save_list.resource.some((res) => res.toString() == id)) {
        query.$pull = { resource: id };
      } else {
        query.$addToSet = { resource: id };
      }
      const updated_savelist = await SaveList.findOneAndUpdate(
        { user: req.userid },
        query,
        { new: true },
      );
      SuccessResponse(res, { payload: updated_savelist });
      return;
    }
  } catch (error) {
    console.log(error);
    ErrorResponse(res, { message: "Internal Server Error", status: 500 });
    return;
  }
}

export async function GetUserProfileInfoController(
  req: Request,
  res: Response,
) {
  try {
    const { id } = req.params;
    const query: { $or: { [key: string]: any }[] } = {
      $or: [{ username: id }],
    };

    if (isValidObjectId(id)) {
      query.$or.push({ _id: new Types.ObjectId(id) });
    }

    const user_details = await User.findOne({
      ...query,
      isDeleted: false,
    }).select(
      "-password -user_provider_id -email -email_verified -provider -interest",
    );
    if (!user_details) {
      ErrorResponse(res, { message: "User not found", status: 404 });
      return;
    }

    SuccessResponse(res, { payload: user_details });
    return;
  } catch (error) {
    console.log(error);
    ErrorResponse(res, { message: "Internal Server Error", status: 500 });
    return;
  }
}

export async function ValidateUsername(req: Request, res: Response) {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username }).select("_id");
    if (!user) {
      SuccessResponse(res, {
        message: "username available",
        payload: { isAvailable: true },
      });
      return;
    }
    SuccessResponse(res, {
      message: "username is taken. try another",
      payload: { isAvailable: false },
    });
    return;
  } catch (error) {
    ErrorResponse(res, { message: "Internal Server Error", status: 500 });
    return;
  }
}

// resource delete
// upvotes delete
// collections delete
// savelist delete

export async function DeleteAccount(req: Request, res: Response) {
  const { password } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (!req.details.password) {
      session.abortTransaction();
      ErrorResponse(res, {
        message: "Set up your password first",
        status: 401,
      });
      return;
    }
    const isValid = await bcrpyt.compare(password, req.details.password);
    if (!isValid) {
      session.abortTransaction();
      ErrorResponse(res, { message: "Invalid credentials", status: 401 });
      return;
    }
    // remove user resource
    const all_resource_ids = (
      await Resource.find({ publisher: req.userid }).select("_id")
    ).map((e) => e._id);
    await Resource.updateMany(
      { publisher: req.userid },
      { $set: { isDeleted: true } },
    );

    //removing all the upvotes by this user
    const all_upvoted_resource = (
      await Upvotes.find({
        $or: [
          { users: req.userid },
          { content_votes: { $elemMatch: { users: req.userid } } },
        ],
      }).select("resource")
    ).map((e) => e.resource);
    await Resource.updateMany(
      { _id: { $in: all_upvoted_resource } },
      { $inc: { upvotes: -1 } },
    );
    await Upvotes.updateMany(
      { resource: { $in: all_upvoted_resource } },
      { $pull: { users: req.userid, "content_votes.$[].users": req.userid } },
    );

    const all_links_ids = (
      await ResourceLink.find({ resource: { $in: all_resource_ids } }).select(
        "_id",
      )
    ).map((e) => e._id);
    await ResourceLink.updateMany(
      { resource: { $in: all_resource_ids } },
      { isDeleted: true },
    );
    await ResourceCollection.deleteMany({ user: req.userid });
    await ResourceCollection.updateMany(
      { links: { $in: all_links_ids } },
      { $pullAll: { links: all_links_ids } },
    );
    await SaveList.deleteMany({ user: req.userid });

    await User.findByIdAndUpdate(req.userid, {
      isDeleted: true,
      deletedAt: new Date(),
    });
    SuccessResponse(res, { message: "Account deleted successfully" });
  } catch (err) {
    console.log(err);
    session.abortTransaction();
    ErrorResponse(res, { message: "Somthing went wrong. Try again later" });
    return;
  } finally {
    await session.endSession();
  }
}

export async function GetSecurityInfo(req: Request, res: Response) {
  const user = await User.findById(req.userid).select(
    "provider email email_verified reset_verification reset_token_expiration",
  );
  SuccessResponse(res, { payload: user });
}

export async function ChangePassword(req: Request, res: Response) {
  const { new_password, current_password, provider } = req.body;
  try {
    const user = await User.findById(req.userid).select(
      "password reset_verification reset_token_expiration",
    );
    if (!user) {
      ErrorResponse(res, { message: "Invalid credentials", status: 401 });
      return;
    }
    if (req.details.password) {
      if (!user?.reset_verification) {
        const isValid = await bcrpyt.compare(
          current_password,
          req.details.password,
        );
        if (!isValid) {
          ErrorResponse(res, {
            message: "Current password is invalid",
            status: 401,
          });
          return;
        } else if (moment(user.reset_token_expiration).isBefore(moment())) {
          ErrorResponse(res, {
            message: "Times up! need to request otp again !",
            status: 401,
          });
          return;
        }
      }
    }

    const encryptedPassword = await bcrpyt.hash(String(new_password), 10);
    await User.findByIdAndUpdate(req.userid, {
      provider,
      reset_verification: false,
      password: encryptedPassword,
      ...(provider == "local" ? { $unset: { user_provider_id: "" } } : {}),
    }).select("password provider email email_verified");
    SuccessResponse(res, { message: "You're all done" });
  } catch (err) {
    console.log(err);
    ErrorResponse(res, { message: "Internal server error ,Try again later !" });
    return;
  }
}

export async function AttachGoogleLogin(req: Request, res: Response) {
  const { id_token, provider } = req.body;
  try {
    if (provider == "local") {
      ErrorResponse(res, {
        message: "Sorry You are at wrong place",
        status: 403,
      });
      return;
    }
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload?.sub || payload.email != req.details.email) {
      ErrorResponse(res, { message: "Invalid Credentials", status: 403 });
      return;
    }

    const user = await User.findByIdAndUpdate(req.userid, {
      provider,
      user_provider_id: payload?.sub,
      email_verified: true,
    }).select("password provider email email_verified");
    SuccessResponse(res, { payload: user });
  } catch (err) {
    ErrorResponse(res, { message: "Internal server error ,Try again later !" });
    return;
  }
}

export async function DetachHybridLoginProvider(req: Request, res: Response) {
  const { provider, password } = req.body;
  const currentProvider = req.details.provider;
  const isValid = await bcrpyt.compare(password, req.details.password);
  if (!isValid) {
    ErrorResponse(res, { message: "Invalid password", status: 401 });
    return;
  }
  if (currentProvider == provider) {
    ErrorResponse(res, { message: "You're already there" });
    return;
  } else if (currentProvider == "hybrid") {
    const updateQuery =
      provider == "local"
        ? { provider, $unset: { user_provider_id: 1 } }
        : { provider, $unset: { password: 1 } };
    await User.findByIdAndUpdate(req.userid, updateQuery).select(
      "password provider email email_verified",
    );
    SuccessResponse(res, {
      message: `You're are now in ${provider} login mode`,
    });
    return;
  } else {
    ErrorResponse(res, { message: "Unecessary request", status: 403 });
    return;
  }
}
