export interface IResource  {
    title: string;
    tags:string[];
    description: string;
    publisher: string;
    banner:string|File;
    upvotes: number;
    content: Array<{
        label: string;
        links:IResourceLink[];
    }>;
    createdAt: Date;
    updatedAt: Date;
}

export interface IResourceLink{
    title: string;
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
    publisher: '',
    upvotes: 0,
    banner:"",
    content: [],
    createdAt: new Date(),
    updatedAt: new Date()
};

export const defaultResourceLink: IResourceLink = {
    title: '',
    url: '',
    description: '',
    isPaid: false,
    consumption_time: '',
    level_information: 'intermediate',
    }