import { renderHook, act } from "@testing-library/react";
import useInputs from "../src/hooks/useInputs";
import { expect, test } from "vitest";

test("should initialize with initial values", () => {
    const initialValues = { username: "testuser", email: "" };
    const { result } = renderHook(() => useInputs(initialValues));

    const [values] = result.current;
    expect(values).toEqual(initialValues);
});

test("should update values on change", () => {
    const initialValues = { username: "" };
    const { result } = renderHook(() => useInputs(initialValues));

    const [, onChange] = result.current;

    // Simular evento de cambio
    act(() => {
        onChange({
            target: { name: "username", value: "newuser", type: "text" },
        } as any);
    });

    const [values] = result.current;
    expect(values.username).toBe("newuser");
});

test("should handle checkbox type correctly", () => {
    const initialValues = { rememberMe: false };
    const { result } = renderHook(() => useInputs(initialValues));

    const [, onChange] = result.current;

    act(() => {
        onChange({
            target: { name: "rememberMe", checked: true, type: "checkbox" },
        } as any);
    });

    const [values] = result.current;
    expect(values.rememberMe).toBe(true);
});

test("should manually set values using setValues", () => {
    const initialValues = { count: 0 };
    const { result } = renderHook(() => useInputs(initialValues));

    const [, , setValues] = result.current;

    act(() => {
        setValues({ count: 10 });
    });

    const [values] = result.current;
    expect(values.count).toBe(10);
});
