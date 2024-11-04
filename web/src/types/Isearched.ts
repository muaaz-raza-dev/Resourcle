import { IResourceFeed } from "./Ifeed";

export interface IResourceSearched extends IResourceFeed{
banner?:string;
linksLength:number;
upvotes:number;
createdAt:string;
publisher:{name:string;_id:string;
    picture:string;
};
_id:string;

}