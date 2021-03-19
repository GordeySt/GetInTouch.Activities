export interface IActivity {
    id?: string;
    title: string;
    description: string;
    category: string;
    date?: Date;
    city: string;
    venue: string;
    isGoing: boolean;
    isHost: boolean;
    attendees: IAttendee[];
    comments: IComment[];
}

interface IActivityFormValues extends Partial<IActivity> {}

export class ActivityFormValues implements IActivityFormValues {
    id?: string = undefined;
    title: string = "";
    description: string = "";
    category: string = "";
    date?: Date = undefined;
    city: string = "";
    venue: string = "";

    constructor(init?: IActivity) {
        Object.assign(this, init);
    }
}

export interface IAttendee {
    userName: string;
    displayedName: string;
    image: string;
    isHost: boolean;
}

export interface IComment {
    id: string;
    createdAt: Date;
    body: string;
    userName: string;
    displayedName: string;
    image: string;
}