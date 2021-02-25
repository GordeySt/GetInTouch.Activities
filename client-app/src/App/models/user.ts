export interface IUser {
    username: string;
    displayedName: string;
    token: string;
    image?: string;
}

export interface IUserFormValues {
    email: string;
    password: string;
    displayedName?: string;
    username?: string;
}