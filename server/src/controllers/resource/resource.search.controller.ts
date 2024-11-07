import { Request, Response } from "express";
import { Resource } from "../../models/resource.model";
import { SuccessResponse } from "../../utils/responsehandler";
import { ValidateLogin } from "../../middlewares/Authenticate";
import { PopulateResources } from "../../functions/populate-resources";

export default async function ResourceSearchController(req: Request, res: Response) {
  const { search, sort = "upvotes", count = 0 }: { search: string, sort: "upvotes" | "createdAt", count: number } = req.body;
  try {
    if (!search) {
      res.status(400).json({ message: "Search query is required." });
      return;
    }
    else {
      await ValidateLogin(req)
      

      const totalResource = await Resource.countDocuments({ $text: { $search: search } })
      
        const resources  = await PopulateResources(req,[{
          $match: { $text: { $search: search } }
        }],sort,count)
      

      SuccessResponse(res, { payload: { resources, total: totalResource } })
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error. Please try again later." });
  }

}
