import { render, screen } from "@testing-library/react";
import { UserContext } from "../src/contexts/UserContextProvider";
import Banner from "../src/components/Banner";
import { expect, test } from "vitest";

test("renders Banner with correct title", () => {
    render(
        <UserContext.Provider value={{ darkMode: false } as any}>
            <Banner />
        </UserContext.Provider>
    );

    const titleText = screen.getByText(/El Arte de/i);
    expect(titleText).toBeInTheDocument();
});
