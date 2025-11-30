import { useMutation, useQueries } from "@tanstack/react-query";
import { deleteUserId, forgotPassword, getUserId, getUsers, postLogin, registerUser, resetPassword, userState, verifyuser } from "../repositories/auth/auth_repository";
import { USER_DATA, USERS_DATA } from "../constants";

export const useGetUserIdQueries = (userId: string) => {
  return useQueries({
    queries: [
      {
        queryKey: [USER_DATA],
        queryFn: () => getUserId(userId).then((response) => response.data),
        staleTime: 20000,
      },
    ],
  });
};

export const useGetUsersQueries = () => {
  return useQueries({
    queries: [
      {
        queryKey: [USERS_DATA],
        queryFn: () => getUsers().then((response) => response.data),
        staleTime: 20000,
      }
    ]
  })
}

export const useLoginMutation = () =>
  useMutation({
    mutationFn: postLogin
  })

export const useRegisterUserMutation = () =>
  useMutation({
    mutationFn: registerUser
  })

export const useForgotMutation = () =>
  useMutation({
    mutationFn: forgotPassword
  })

export const useResetMutation = () =>
  useMutation({
    mutationFn: resetPassword
  })

export const useVerifiedMutation = () =>
  useMutation({
    mutationFn: userState
  })

export const useDeleteMutation = () =>
  useMutation({
    mutationFn: deleteUserId
  })

export const useVerifyMutation = () =>
  useMutation({
    mutationFn: verifyuser
  })