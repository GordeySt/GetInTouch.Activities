import { makeAutoObservable, configure, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import { User } from "../api/agent";
import { history } from "../..";
import { store } from "./Store";

configure({ enforceActions: "always" });

export default class UserStore {
  user: IUser | null = null;
  loadingUser = false;
  fbAccessToken: string | null = null;
  fbLoading = false;

  get isLoggedIn() {
    return !!this.user;
  }

  constructor() {
    makeAutoObservable(this);
  }

  login = async (values: IUserFormValues) => {
    try {
      const user = await User.login(values);
      runInAction(() => {
        this.user = user;
      });
      store.commonStore.setToken(user.token);
      history.push("/activities");
    } catch (error) {
      throw error;
    }
  };

  register = async (values: IUserFormValues) => {
    try {
      const user = await User.register(values);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      history.push("/activities");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  getUser = async () => {
    this.loadingUser = true;

    try {
      const user = await User.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loadingUser = false));
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    history.push("/");
  };

  getFacebookLoginStatus = async () => {
    window.FB.getLoginStatus((response) => {
      if (response.status === "connected") {
        this.fbAccessToken = response.authResponse.accessToken;
      }
    });
  };

  facebookLogin = () => {
    this.fbLoading = true;
    const apiLogin = (accessToken: string) => {
      User.fbLogin(accessToken)
        .then((user) => {
          store.commonStore.setToken(user.token);
          runInAction(() => {
            this.user = user;
            this.fbLoading = false;
          });
          history.push("/activities");
        })
        .catch((error) => {
          console.log(error);
          runInAction(() => (this.fbLoading = false));
        });
    };

    if (this.fbAccessToken) {
      apiLogin(this.fbAccessToken);
    } else {
      window.FB.login(
        (response) => {
          apiLogin(response.authResponse.accessToken);
        },
        {
          scope: "public_profile,email",
        }
      );
    }
  };
}
