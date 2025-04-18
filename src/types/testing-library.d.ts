import "@testing-library/jest-dom";

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeInTheDocument(): R;
            toHaveTextContent(text: string | RegExp): R;
            toBeDisabled(): R;
            toHaveValue(value: string | number | string[]): R;
            toHaveClass(className: string): R;
            toHaveAttribute(attr: string, value?: string): R;
            toBeVisible(): R;
            toBeChecked(): R;
            toBePartiallyChecked(): R;
            toHaveFocus(): R;
            toContainElement(element: HTMLElement | null): R;
        }
    }
}
