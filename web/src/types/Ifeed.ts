export interface IResourceFeed{
    title:string;
    upvotes:number;
    _id:string;
}


export interface ITagFeed{

        name:string;
        _id:string;
        total:number;
}



export interface IUserFeed{
    upvotes:number;
    top_posts:number;
    user:{name:string;headline:string;_id:string;picture:string}
}