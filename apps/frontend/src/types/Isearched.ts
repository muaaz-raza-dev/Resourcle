import { IResourceFeed } from "./Ifeed";

export interface IResourceSearched extends IResourceFeed{
banner?:string;
isOwned:boolean;
linksLength:number;
upvotes:number;
views:number,
isPrivate:boolean;
createdAt:string;
publisher:{name:string;_id:string;
    picture:string;
};
_id:string;

}