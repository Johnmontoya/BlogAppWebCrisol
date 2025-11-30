import type { AxiosResponse } from "axios";
import type {
  IAuthResponse,
  IForgot,
  ILogin,
  IRegister,
  IResetPassword,
  IUserResponse,
  IUsersResponse,
  IVerify,
} from "../../interfaces/auth";
import apiClient from "../apiClient";
import type { IResponse, IVerified } from "../../interfaces/blog";

export const postLogin = async (
  data: ILogin
): Promise<AxiosResponse<IAuthResponse>> => {
  return await apiClient<IAuthResponse>({
    method: "post",
    url: `/api/v1/user/login`,
    data: data,
  });
};

export const registerUser = async (
  data: IRegister
): Promise<AxiosResponse<IResponse>> => {
  return await apiClient<IResponse>({
    method: "post",
    url: `/api/v1/user/register`,
    data: data,
  });
};

export const getUsers = async (): Promise<AxiosResponse<IUsersResponse>> => {
  return await apiClient<IUsersResponse>({
    method: "get",
    url: `/api/v1/user/users`,
  });
};

export const getUserId = async (
  id: string
): Promise<AxiosResponse<IUserResponse>> => {
  return await apiClient<IUserResponse>({
    method: "get",
    url: `/api/v1/user/user/${id}`,
  });
};

export const forgotPassword = async (email: IForgot): Promise<AxiosResponse<IResponse>> => {  
  return await apiClient<IResponse>({
    method: "post",
    url: `/api/v1/user/forgot`,
    data: email,
  });
};

export const resetPassword = async (data: IResetPassword): Promise<AxiosResponse<IResponse>> => {
  return await apiClient<IResponse>({
    method: "put",
    url: `/api/v1/user/reset`,
    data: data,
  });
};

export const userState = async ({userId, verified}: IVerified): Promise<AxiosResponse<IResponse>> => {
  return await apiClient<IResponse>({
    method: "put",
    url: `/api/v1/user/change-state`,
    data: {
      userId,
      verified
    }
  });
}

export const deleteUserId = async (
  id: string
): Promise<AxiosResponse<IResponse>> => {
  return await apiClient<IResponse>({
    method: "delete",
    url: `/api/v1/user/user/${id}`,
  });
};

export const verifyuser = async (
  data: IVerify
): Promise<AxiosResponse<IResponse>> => {
  return await apiClient<IResponse>({
    method: "put",
    url: `/api/v1/user/verifyuser`,
    data: data
  });
}