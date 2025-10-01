import { Eye, EyeOff } from "lucide-react";
import {
  type InputHTMLAttributes,
  forwardRef,
  useState,
  type ReactNode,
} from "react";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  error?: string;
  helperText?: string;
  size?: "sm" | "md" | "lg";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  allowPasswordToggle?: boolean;
};

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2",
  lg: "px-4 py-3 text-base",
};

const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      error,
      helperText,
      size = "md",
      type = "text",
      leftIcon,
      rightIcon,
      allowPasswordToggle = true,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const [show, setShow] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && show ? "text" : type;

    const describedByIds: string[] = [];
    if (error) describedByIds.push(`${id}-error`);
    if (helperText) describedByIds.push(`${id}-help`);

    return (
      <div className={`w-full ${disabled ? "opacity-60" : ""}`}>
        <div className="relative">
          {/* Ícone à esquerda */}
          {leftIcon && (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {leftIcon}
            </span>
          )}

          <input
            id={id}
            ref={ref}
            type={inputType}
            disabled={disabled}
            aria-invalid={!!error || undefined}
            aria-describedby={
              describedByIds.length ? describedByIds.join(" ") : undefined
            }
            className={`
              block w-full rounded-md shadow-sm
              ${sizeClasses[size]}
              ${leftIcon ? "pl-10" : ""}
              ${rightIcon || (isPassword && allowPasswordToggle) ? "pr-10" : ""}

              border placeholder-text-300
              focus:outline-none focus:ring-2
              ${
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-text-200 focus:ring-primary focus:border-primary"
              }
              bg-white text-text
              transition-colors
              ${className}
            `}
            {...props}
          />

          {/* Botão de show/hide password ou ícone à direita */}
          {isPassword && allowPasswordToggle ? (
            <button
              type="button"
              aria-label={show ? "Ocultar senha" : "Mostrar senha"}
              onClick={() => setShow((s) => !s)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-400 hover:text-text-600"
              tabIndex={-1}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          ) : rightIcon ? (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {rightIcon}
            </span>
          ) : null}
        </div>

        {/* Mensagens */}
        {error ? (
          <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${id}-help`} className="mt-1 text-sm text-text-400">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

InputComponent.displayName = "Input";
export const Input = InputComponent;
