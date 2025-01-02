export interface IResourceFeed {
    title: string;
    upvotes: number;
    _id: string;
    createdAt:string;
    isSaved: boolean;
    isUpvoted: boolean;
}


export interface ITagFeed {

    name: string;
    _id: string;
    total: number;
}



export interface IUserFeed {
    user: { name: string; headline: string; _id: string; picture: string }
}