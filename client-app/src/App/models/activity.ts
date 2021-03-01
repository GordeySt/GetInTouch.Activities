export interface IActivity {
    id?: string;
    title: string;
    description: string;
    category: string;
    date?: Date;
    city: string;
    venue: string;
    attendees: IAttendee[] | null;
}

export class ActivityFormValues implements IActivity {
    id?: string = undefined;
    title: string = "";
    description: string = "";
    category: string = "";
    date?: Date = undefined;
    city: string = "";
    venue: string = "";
    attendees: IAttendee[] | null = null;

    constructor(init?: IActivity) {
        Object.assign(this, init);
    }
}

export interface IAttendee {
    username: string;
    displayedName: string;
    image: string;
    isHost: boolean;
}