import { observable, action, makeAutoObservable, computed, configure, runInAction } from "mobx"
import { IUser, IUserFormValues } from "../models/user";
import { User } from "../api/agent"
import { history } from "../..";
import { store } from "./Store"
import ModalStore from "./ModalStore";

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
            store.commonStore.setToken(user.token);
            history.push("/activities");
        }
        catch (error) {
            throw error;
        }
    }

    @action register = async (values: IUserFormValues) => {
        try {
            const user = await User.register(values);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push("/activities");
            ModalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    @action getUser = async () => {
        try {
            const user = await User.current();
            runInAction(() => {
                this.user = user;
            })
        }
        catch (error) {
            console.log(error);
        }

    }

    @action logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        history.push("/");
    }
}

export default new UserStore();