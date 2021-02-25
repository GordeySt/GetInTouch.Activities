import { observable, action, makeAutoObservable, configure, reaction } from "mobx"

configure({ enforceActions: "always" });

class CommonStore {    
    @observable token: string | null = window.localStorage.getItem('jwt');
    @observable appLoaded = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }

    @action setToken = (token: string | null) => {
        this.token = token;
    }

    @action setAppLoaded = () => {
        this.appLoaded = true;
    }
}

export default new CommonStore();