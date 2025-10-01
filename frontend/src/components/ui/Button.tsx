import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`w-full flex justify-center py-2 px-4 rounded-md shadow-sm
          text-sm font-medium text-white
          bg-primary hover:bg-primary-600
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
          disabled:opacity-50 transition-colors ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ButtonComponent.displayName = "Button";
export const Button = ButtonComponent;
