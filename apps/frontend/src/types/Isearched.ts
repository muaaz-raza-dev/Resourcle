import { IResourceFeed } from "./Ifeed";

export interface IResourceSearched extends IResourceFeed{
banner?:string;
isOwned:boolean;
linksLength:number;
upvotes:number;
views:number,
isPrivate:boolean;
categories:string[]
createdAt:string;
publisher:{name:string;_id:string;
    picture:string;
};
_id:string;

}
export interface ILinkSearched {
    clicks:number;
    isUpvoted:boolean;
    title: string;
    upvotes:number;
    url:string;
    description: string;
    _id:string;
    resource:string;
}