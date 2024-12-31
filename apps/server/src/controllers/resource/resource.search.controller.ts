import { Request, Response } from "express";
import { Resource } from "../../models/resource.model.js";
import { SuccessResponse } from "../../utils/responsehandler.js";
import { ValidateLogin } from "../../middlewares/Authenticate.js";
import { PopulateResources } from "../../functions/populate-resources.js";

export default async function ResourceSearchController(
  req: Request,
  res: Response,
) {
  const {
    search,
    sort = "upvotes",
    count = 0,
  }: {
    search: string;
    sort: "upvotes" | "createdAt";
    count: number;
  } = req.body;
  try {
    if (!search) {
      res.status(400).json({ message: "Search query is required." });
      return;
    } else {
      await ValidateLogin(req);

      const totalResource = await Resource.countDocuments({
        $text: { $search: search },
      });

      const resources = await PopulateResources(req, {
        query: [
          {
            $match: { $text: { $search: search } },
          },
        ],
        sort,
        count,
      });

      SuccessResponse(res, { payload: { resources, total: totalResource } });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}
