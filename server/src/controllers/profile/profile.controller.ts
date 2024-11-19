import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { ErrorResponse, SuccessResponse } from "../../utils/responsehandler";
import { SaveList } from "../../models/savelist.model";

export async function GetProfileInfoController(req: Request, res: Response) {
    try {
        const user_details = await User.findById(req.userid).select("-password -user_provider_id")
        if (!user_details) {
            ErrorResponse(res, { message: "User not found", status: 404 }); 
             return;
            }
        SuccessResponse(res, { payload: user_details });
        return;
    }
    catch (error) {
        ErrorResponse(res, { message: "Internal Server Error", status: 500 });
        return;
    }
}


export async function UpdateProfileInfoController(req: Request, res: Response) {
    try {
        const { name, links, about, headline, picture } = req.body
        const user_details = await User.findByIdAndUpdate(req.userid, { name, links, about, headline, picture }, { new: true })
            .select("-password -user_provider_id ")
        if (!user_details) {  ErrorResponse(res, { message: "User not found", status: 404 }); return; }
        SuccessResponse(res, { payload: user_details });
        return;
    }
    catch (error) {
        console.log(error)
        ErrorResponse(res, { message: "Internal Server Error", status: 500 });
        return;
    }
}

export async function SaveResourceInfoController(req: Request, res: Response) {
    try {
        const { id } = req.body
        let save_list = await SaveList.findOne({ user: req.userid })
        if (!save_list) {
            save_list = await SaveList.create({ user: req.userid, resource: [id] })
        }
        else{
            const query:{[key:string]:{[key:string]:string}} = { }
            
            if(save_list.resource.some(res=>res.toString()==id)){
                query.$pull={ resource: id }
            }
            else {
                query.$addToSet={ resource: id }
            }
            let updated_savelist = await SaveList.findOneAndUpdate({ user: req.userid }, query, { new: true })
            SuccessResponse(res, { payload:updated_savelist });
            return ;
        }
    }
    catch (error) {
        console.log(error)
        ErrorResponse(res, { message: "Internal Server Error", status: 500 });
        return;
    }
}




export async function GetUserProfileInfoController(req: Request, res: Response) {
    try {
        const {id} = req.params
        const user_details = await User.findById(id).select("-password -user_provider_id -email -email_verified -provider -interest")
        if (!user_details) {
            ErrorResponse(res, { message: "User not found", status: 404 }); 
             return;
        }
        SuccessResponse(res, { payload: user_details });
        return;
    }
    catch (error) {
        ErrorResponse(res, { message: "Internal Server Error", status: 500 });
        return;
    }
}

