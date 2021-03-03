import { observable, action, makeAutoObservable, configure } from "mobx"

configure({ enforceActions: "always" });

interface Modal {
    open: boolean,
    body: JSX.Element | null,
}

class ModalStore {
    @observable modal: Modal = {
        open: false,
        body: null
    }

    constructor() {
        makeAutoObservable(this);
    }

    @action openModal = (content: JSX.Element) => {
        this.modal.open = true;
        this.modal.body = content;
    }

    @action closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;
    }

}

export default new ModalStore();