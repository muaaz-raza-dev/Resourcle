export interface IResource  {
    title: string;
    tags:string[];
    description: string;
    publisher: string;
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
    skill_level: string;
    stars: number;
}

export const defaultResource: IResource = {
    title: '',
    tags: [],
    description: '',
    publisher: '',
    upvotes: 0,
    content: [],
    createdAt: new Date(),
    updatedAt: new Date()
};