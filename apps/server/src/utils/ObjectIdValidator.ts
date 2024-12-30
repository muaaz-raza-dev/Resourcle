import { Types } from "mongoose";
export const isValidObjectId = (id: string) => {
  return Types.ObjectId.isValid(id) && new Types.ObjectId(id).toString() === id;
};
