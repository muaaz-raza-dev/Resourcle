export interface IUser{
    name: string;
    email: string;
    email_verified: boolean;
    picture: string;
    provider: 'local' | 'google' | 'hybrid';
    user_provider_id?: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IauthState{
    isLogined:boolean;
    user: IUser | null;
}
export const defaultAuthState:IauthState = {
    isLogined:false,
    user: null,
}