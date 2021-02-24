import { observable, action, makeAutoObservable, computed, configure, runInAction } from "mobx"
import { IUser, IUserFromValues } from "../models/user";
import { User } from "../api/agent"

class UserStore {
    @observable user: IUser | null = null;

    @computed get isLoggedIn() { return !!this.user }

    constructor() {
        makeAutoObservable(this);
    }

    @action login = async (values: IUserFromValues) => {
        try {
            const user = await User.login(values);
            this.user = user;
        }
        catch (error) {
            console.log(error);
        }
    }
}

export default new UserStore();