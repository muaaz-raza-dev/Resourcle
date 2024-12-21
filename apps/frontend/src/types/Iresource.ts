export interface IResource  {
    title: string;
    tags:string[];
    description: string;
    publisher: string;
    banner:string|File;
    upvotes: number;
    isPrivate:boolean;
    content: Array<IresourceContent>;
    createdAt: Date;
    updatedAt: Date;
}

export interface IresourceContent{
    label: string;
    links:IResourceLink[];
}
export interface IResourceLink{
    title: string;
    isUpvoted:boolean;
    _id:string;
    upvotes:number;
    url: string;
    description: string;
    isPaid: boolean;
    consumption_time: string;
    level_information: string;
}

export const defaultResource: IResource = {
    title: '',
    tags: [],
    description: '',
    isPrivate:false,
    publisher: '',
    upvotes: 0,
    banner:"",
    content: [],
    createdAt: new Date(),
    updatedAt: new Date()
};

export const defaultResourceLink: IResourceLink = {
    title: '',
    _id:"",
    url: '',
    upvotes:0,
    description: '',
    isUpvoted:false,
    isPaid: false,
    consumption_time: '',
    level_information: 'intermediate',
    }