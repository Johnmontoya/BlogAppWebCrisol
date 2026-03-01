import type { Meta, StoryObj } from "@storybook/react";
import Sidebar from "./Sidebar";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";

const meta: Meta<typeof Sidebar> = {
    title: "Components/Navigation/Sidebar",
    component: Sidebar,
    decorators: [
        (Story, context: any) => (
            <BrowserRouter>
                <UserContext.Provider
                    value={{
                        darkMode: context.globals.theme === "dark",
                        navigate: () => { },
                        isLogin: true,
                        setIsLogin: () => { },
                        authToken: "mock-token",
                        hasValidToken: true,
                        role: context.args.role || "User",
                        setRole: () => { },
                        input: "",
                        setInput: () => { },
                        setDarkMode: () => { },
                        axios: {} as any,
                    }}
                >
                    <div className="min-h-screen">
                        <Story />
                    </div>
                </UserContext.Provider>
            </BrowserRouter>
        ),
    ],
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AdminView: Story = {
    args: {
        role: "Admin",
    } as any,
};

export const UserView: Story = {
    args: {
        role: "User",
    } as any,
};