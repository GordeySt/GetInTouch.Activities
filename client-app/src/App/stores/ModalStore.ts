import { observable, action, makeAutoObservable, configure, runInAction } from "mobx"
import { ReactComponentElement } from "react";

configure({ enforceActions: "always" });

class ModalStore {
    @observable.shallow modal = {
        open: false,
        body: null
    }

    constructor() {
        makeAutoObservable(this);
    }

    @action openModal = (content: any) => {
        this.modal.open = true;
        this.modal.body = content;
    }

    @action closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;
    }

}

export default new ModalStore();