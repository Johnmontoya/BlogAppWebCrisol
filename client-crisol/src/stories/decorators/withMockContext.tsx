import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../contexts/UserContextProvider";

export const withMockContext = (Story: any) => (
    <BrowserRouter>
        <UserContext.Provider
            value={{
                darkMode: false, // Will be controlled by Storybook themes addon
                navigate: () => { },
                isLogin: false,
                setIsLogin: () => { },
                authToken: null,
                hasValidToken: false,
                role: null,
                setRole: () => { },
                input: "",
                setInput: () => { },
                setDarkMode: () => { },
                axios: {} as any,
            }}
        >
            <Story />
        </UserContext.Provider>
    </BrowserRouter>
);
