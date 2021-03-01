export interface IUser {
    userName: string;
    displayedName: string;
    token: string;
    image?: string;
}

export interface IUserFormValues {
    email: string;
    password: string;
    displayedName?: string;
    userName?: string;
}