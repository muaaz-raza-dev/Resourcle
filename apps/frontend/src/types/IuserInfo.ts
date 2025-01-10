export interface IUser{
    name: string;
    _id:string;
    email: string;
    email_verified: boolean;
    picture: string;
}

export interface IauthState{
    isLogined:boolean;
    authReminderModal:boolean
    user: IUser | null;
}
export const defaultAuthState:IauthState = {
    isLogined:false,
    authReminderModal:false,
    user: null,
}