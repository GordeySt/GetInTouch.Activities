import { observable, action, makeAutoObservable, computed, configure, runInAction } from "mobx"
import { IUser, IUserFormValues } from "../models/user";
import { User } from "../api/agent"
import { history } from "../..";
import CommonStore from "./CommonStore"

configure({ enforceActions: "always" });

class UserStore {
    @observable user: IUser | null = null;

    @computed get isLoggedIn() { return !!this.user }

    constructor() {
        makeAutoObservable(this);
    }

    @action login = async (values: IUserFormValues) => {
        try {
            const user = await User.login(values);
            runInAction(() => {
                this.user = user;
            })
            CommonStore.setToken(user.token);
            history.push("/activities");
        }
        catch (error) {
            throw error;
        }
    }

    @action register = async (values: IUserFormValues) => {
        try {
            const user = await User.register(values);
            CommonStore.setToken(user.token);
            history.push("/activities")
        } catch (error) {
            throw error;
        }
    }

    @action getUser = async () => {
        try {
            const user = await User.current();
            console.log(CommonStore.token);
            console.log(user);
            runInAction(() => {
                this.user = user;
            })
        }
        catch (error) {
            console.log(error);
        }

    }

    @action logout = () => {
        CommonStore.setToken(null);
        this.user = null;
        history.push("/");
    }
}

export default new UserStore();