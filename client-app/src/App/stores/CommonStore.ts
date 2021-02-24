import { observable, action, makeAutoObservable, computed, configure, runInAction } from "mobx"
import UserStore from "./UserStore"

configure({ enforceActions: "always" });

class CommonStore {
    constructor() {
        makeAutoObservable(this);
    }

    @observable token: string | null = null;
    @observable appLoaded = false;

    @action setToken = (token: string | null) => {
        window.localStorage.setItem('jwt', token!);
        this.token = token;
    }

    @action setAppLoaded = () => {
        this.appLoaded = true;
    }
}

export default new CommonStore();