export interface IProfile {
  displayedName: string;
  userName: string;
  bio: string;
  mainImage: string;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
  photos: IPhoto[];
}

export interface IPhoto {
  id: string;
  url: string;
  isMain: boolean;
}
