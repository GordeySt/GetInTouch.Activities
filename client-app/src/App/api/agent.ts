import axios, { AxiosResponse } from "axios";
import { IActivity } from '../models/activity';
import { ErrorsHandler } from "./errors"
import { IUser, IUserFormValues } from "../models/user"

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem("jwt");
    
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(undefined, er => {
    ErrorsHandler.handleNetworkError(er);

    ErrorsHandler.handle404Error(er.response);
    ErrorsHandler.handle400Error(er.response);
    ErrorsHandler.handle500Error(er.response);

    throw er.response;
})

const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
}

export const Activities = {
    list: (): Promise<IActivity[]> => requests.get('/activities'),
    details: (id: string): Promise<IActivity> => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post('/activities', activity),
    update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/activities/${id}`),
}

export const User = {
    current: (): Promise<IUser> => requests.get("/user"),
    login: (user: IUserFormValues): Promise<IUser> => requests.post('/user/login', user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post("/user/register", user)
}