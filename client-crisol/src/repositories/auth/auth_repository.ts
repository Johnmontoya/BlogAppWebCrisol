import type { AxiosResponse } from "axios";
import type { IAuthResponse, ILogin, IRegister, IUserResponse } from "../../interfaces/auth";
import apiClient from "../apiClient";
import type { IResponse } from "../../interfaces/blog";

export const postLogin = async (data: ILogin): Promise<AxiosResponse<IAuthResponse>> => {
  return await apiClient<IAuthResponse>({
    method: "post",
    url: `/api/v1/user/login`,
    data: data,
  });
};

export const registerUser = async(data: IRegister): Promise<AxiosResponse<IResponse>> => {
  return await apiClient<IResponse>({
    method: 'post',
    url: `/api/v1/user/register`,
    data: data
  })
}

export const getUserId = async(id: string): Promise<AxiosResponse<IUserResponse>> => {
  return await apiClient<IUserResponse>({
    method: 'get',
    url: `/api/v1/user/user/${id}`
  })
}