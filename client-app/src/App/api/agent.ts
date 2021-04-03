import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/activity";
import { ErrorsHandler } from "./errors";
import { IUser, IUserFormValues } from "../models/user";
import { IPhoto, IProfile } from "../models/profile";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (er) => {
  ErrorsHandler.handleNetworkError(er);

  ErrorsHandler.handle404Error(er.response);
  ErrorsHandler.handle400Error(er.response);
  ErrorsHandler.handle500Error(er.response);

  throw er.response;
});

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) =>
    axios.get<T>(url).then(sleep(1000)).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(sleep(1000)).then(responseBody),
  put: <T>(url: string, body: {}) =>
    axios.put<T>(url, body).then(sleep(1000)).then(responseBody),
  del: <T>(url: string) =>
    axios.delete<T>(url).then(sleep(1000)).then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody);
  },
};

export const Activities = {
  list: (): Promise<IActivity[]> => requests.get<IActivity[]>("/activities"),
  details: (id: string): Promise<IActivity> =>
    requests.get<IActivity>(`/activities/${id}`),
  create: (activity: IActivity): Promise<void> =>
    requests.post<void>("/activities", activity),
  update: (activity: IActivity): Promise<void> =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string): Promise<void> =>
    requests.del<void>(`/activities/${id}`),
  attend: (id: string): Promise<void> =>
    requests.post<void>(`/activities/${id}/attend`, {}),
  unattend: (id: string): Promise<void> =>
    requests.del<void>(`/activities/${id}/attend`),
  cancel: (id: string): Promise<void> =>
    requests.post<void>(`/activities/${id}/cancel`, {}),
};

export const User = {
  current: (): Promise<IUser> => requests.get<IUser>("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post<IUser>("/user/login", user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post<IUser>("/user/register", user),
};

export const Profiles = {
  get: (username: string): Promise<IProfile> =>
    requests.get<IProfile>(`/profiles/${username}`),
  uploadPhoto: (photo: Blob): Promise<IPhoto> =>
    requests.postForm("/photos", photo),
  setMainPhoto: (id: string): Promise<void> =>
    requests.post<void>(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string): Promise<void> =>
    requests.del<void>(`/photos/${id}`),
  updateFollowing: (username: string) =>
    requests.post(`/follow/${username}`, {}),
};
