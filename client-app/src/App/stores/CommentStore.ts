import { IComment } from "../models/commets";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx"
import ActivityStore from "./ActivityStore"
import CommonStore from "./CommonStore";

class CommentStore {
    comments: IComment[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = (activityId: string) => {
        if (ActivityStore.activity) {
            this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/chat?activityId=' + activityId, {
                accessTokenFactory: () => CommonStore.token!
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection.start()
            .then(() => console.log(this.hubConnection!.state))
            .catch(error => console.log("Error establishinh connection: ", error))

        this.hubConnection.on("LoadComments", (comments: IComment[]) => {
            runInAction(() => {
                this.comments = comments;
            })
        })

        this.hubConnection.on("RecieveComment", (comment: IComment) => {
            runInAction(() => {
                this.comments.push(comment);
            })
        })

        }
    }

    stopHubConnection = () => {
        this.hubConnection!
            .stop()
            .catch(error => console.log("Error stopping connection: ", error));
    }

    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    }

    addComment = async (values: any) => {
        values.activityId = ActivityStore.activity?.id;
        console.log(values);

        try {
            await this.hubConnection?.invoke("SendComment", values);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new CommentStore();