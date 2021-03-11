export interface IProfile {
    displayedName: string,
    userName: string,
    bio: string,
    mainImage: string,
    photos: IPhoto[]
}

export interface IPhoto {
    id: string,
    url: string,
    isMain: boolean
}