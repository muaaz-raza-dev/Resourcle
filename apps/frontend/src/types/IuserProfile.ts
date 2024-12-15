export interface IuserProfile{
    name: string;
    _id:string;
    email: string;
    username?:string;
    banner?:string;
    picture: string;
    headline?: string;
    links?: Array<{
      label: string;
      url: string;
    }>;
    about?: string;
}