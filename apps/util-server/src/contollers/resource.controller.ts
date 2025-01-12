import { FastifyReply, FastifyRequest } from "fastify";
import { Resource } from "../models/resource.model.js";
export async function GetResourceUrls(request: FastifyRequest<{ Body: {link:string} }>, reply: FastifyReply,){
const resources = await Resource.find({isDeleted:false}).select("_id updatedAt")
reply.send(resources)
}