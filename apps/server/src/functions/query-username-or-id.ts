import { isValidObjectId, Types } from 'mongoose';

export default function GetQueryObjectUsernameOrId(id:string) {
    const query: { $or: { [key: string]: any }[] } = {
        $or: [{ username: id }]
    };
    if (isValidObjectId(id)) {
        query.$or.push({ _id: new Types.ObjectId(id) });
    }
  return query
}

