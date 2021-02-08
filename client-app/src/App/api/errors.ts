import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";

export const ErrorsHandler = {
    handleNetworkError: (error: AxiosError) => error.message === "Network Error" && !error.response && toast.error('Network error - make sure API is running'),
    handle404Error: (response: AxiosResponse) => response.status === 404 && history.push('/notfound'),
    handle400Error: (response: AxiosResponse) => response.status === 400 && response.config.method === "get" && 
        response.data.errors.hasOwnProperty("id") && history.push('/notfound'),
    handle500Error: (response: AxiosResponse) => response.status === 500 && toast.error("Server error - check the terminal for more info!")
}