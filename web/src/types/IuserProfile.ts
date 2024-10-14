export interface IuserProfile{
    name: string;
    email: string;
    picture: string;
    headline?: string;
    links?: Array<{
      label: string;
      url: string;
    }>;
    about?: string;
}