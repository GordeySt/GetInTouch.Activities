import { observable, action, makeAutoObservable, computed, configure, runInAction } from "mobx"
import { IUser, IUserFromValues } from "../models/user";
import { User } from "../api/agent"
import { history } from "../..";

configure({ enforceActions: "always" });

class UserStore {
    @observable user: IUser | null = null;

    @computed get isLoggedIn() { return !!this.user }

    constructor() {
        makeAutoObservable(this);
    }

    @action login = async (values: IUserFromValues) => {
        try {
            const user = await User.login(values);
            runInAction(() => {
                this.user = user;
            })
            console.log(user);
            history.push("/activities");
        }
        catch (error) {
            throw error;
        }
    }
}

export default new UserStore();