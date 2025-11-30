import React from "react";
import type { IUserItemProps } from "../../interfaces/auth";
import { AiOutlineDelete } from "react-icons/ai";
import { useDeleteMutation, useVerifiedMutation } from "../../queries/user.query";
import SweetAlertas from "../alerts/SweetAlertas";
import { useQueryClient } from "@tanstack/react-query";

const UserListItem: React.FC<IUserItemProps> = ({ users, index }) => {
  const queryClient = useQueryClient();
  const { _id, email, username, role, accountVerified } = users;
  const userDelete = useDeleteMutation();
  const verifiedMutation = useVerifiedMutation();

  function deleteOneBlog() {
    SweetAlertas.OnDialogChoose({
      message: `Estas seguro de eliminar el blog ${username}`,
      onConfirm: DeleteAccount,
      onCancel: Cancel,
    });
  }

  const Cancel = () => {};

  const DeleteAccount = () => {
    userDelete.mutateAsync(_id, {
      onSuccess: async (response: any) => {
        await queryClient.invalidateQueries();
        SweetAlertas.OnDialogSuccess({
          message: response.data.message,
        });
      },
      onError: async (error: any) => {
        SweetAlertas.OnDialogFail({
          message: error.response.data.message,
        });
      },
    });
  };

  const VerifyAccount = () => {
    verifiedMutation.mutateAsync(
      {userId: _id, verified: !accountVerified},
      {
        onSuccess: async (response: any) => {
          await queryClient.invalidateQueries();
          SweetAlertas.OnDialogSuccess({
            message: response.data.message,
          });
        },
        onError: (error: any) => {
          SweetAlertas.OnDialogFail({
            message: error.response.data.message,
          });
        },
      }
    );
  };

  return (
    <tr className="border-y border-gray-300 hover:bg-gray-300 transition-colors">
      <th scope="row" className="px-2 py-4 font-medium text-gray-900">
        {index}
      </th>
      <td className="px-2 py-4">{username}</td>
      <td className="px-2 py-4">{email}</td>
      <td className="px-2 py-4">{role}</td>
      <td className="px-4 py-4">
        <div className="flex justify-between text-xs gap-3">
          {
            <button
              onClick={VerifyAccount}
              className={`border px-3 py-1.5 rounded cursor-pointer transition-colors hover:shadow-md ${
                accountVerified
                  ? "border-green-600 text-green-700 hover:bg-green-50"
                  : "border-red-600 text-red-700 hover:bg-red-50"
              }`}
            >
              {accountVerified ? "Verificada" : "No verificada"}
            </button>
          }
          <AiOutlineDelete
            size={28}
            onClick={deleteOneBlog}
            className="hover:scale-110 text-red-600 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default UserListItem;
