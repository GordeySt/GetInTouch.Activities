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
  refreshTokenTimeout: any;

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
      this.startRefreshTokenTimer(user);
      history.push("/activities");
    } catch (error) {
      throw error;
    }
  };

  register = async (values: IUserFormValues) => {
    try {
      await User.register(values);
      store.modalStore.closeModal();
      history.push(`/user/registerSuccess?email=${values.email}`);
    } catch (error) {
      throw error;
    }
  };

  getUser = async () => {
    this.loadingUser = true;

    try {
      const user = await User.current();
      store.commonStore.setToken(user.token);
      runInAction(() => {
        this.user = user;
      });
      this.startRefreshTokenTimer(user);
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
          this.startRefreshTokenTimer(user);
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

  refreshToken = async () => {
    this.stopRefreshTokenTimer();
    try {
      const user = await User.refreshToken();
      runInAction(() => {
        this.user = user;
      });
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
    } catch (error) {
      console.log(error);
    }
  };

  private startRefreshTokenTimer(user: IUser) {
    const jwtToken = JSON.parse(atob(user.token.split(".")[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 30 * 1000;
    this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
