import { createContext, type JSX } from "react";
import useIsLoginContext from "../hooks/useIsLoginContext";

interface IUserContextProviderProps {
  children: JSX.Element[] | JSX.Element;
}

export const UserContext = createContext(
  {} as ReturnType<typeof useIsLoginContext>
);

const UserContextProvider = ({ children }: IUserContextProviderProps) => {
  return (
    <UserContext.Provider value={useIsLoginContext()}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;