export interface IActivity {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date | undefined;
    city: string;
    venue: string;
}