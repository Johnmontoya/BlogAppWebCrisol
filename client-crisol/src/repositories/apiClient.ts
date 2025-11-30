import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import token from '../lib/token';
import { ACCESS_TOKEN_KEY, urlServer } from '../config/config';

const apiClient = axios.create({
    baseURL: urlServer
})

const logOnDev = (message: string, log?: AxiosResponse | InternalAxiosRequestConfig | AxiosError) => {
    if(import.meta.env.DEV){
        console.log(message, log)
    }
}

apiClient.interceptors.request.use((request) => {
    const authToken: string | null = token.getToken(ACCESS_TOKEN_KEY);
    
    const { method, url } = request;

    if(authToken){
        request.headers['Authorization'] = `Bearer ${authToken}`
    }

    logOnDev(`[${method?.toUpperCase()}] ${url} | Request`, request);

    return request;
})

apiClient.interceptors.response.use(
    (response) => {
        const { method, url} = response.config;
        const { status } = response;

        logOnDev(`[${method?.toUpperCase()}] ${url} | Response ${status}`, response);

        return response;
    },
    (error) => {
        const { message } = error;
        const { status, data } = error.response;
        const { method, url } = error.config;

        logOnDev(`[${method?.toUpperCase()}] ${url} | Error ${status} ${data?.message || ''} | ${message}`, error);

        return Promise.reject(error);        
    }
)

export default apiClient;