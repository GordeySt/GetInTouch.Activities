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
  isCancelled: boolean;
  attendees: IAttendee[];
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
  isGoing: boolean = false;
  isHost: boolean = false;
  isCancelled: boolean = false;
  attendees: IAttendee[] = [];

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
