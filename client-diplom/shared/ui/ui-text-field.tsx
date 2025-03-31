import { Input } from "@headlessui/react";
import clsx from "clsx";
import { InputHTMLAttributes, PropsWithRef, useId } from "react";

type UiTextFieldVariant = "primary" | "error";
export type UiTextFieldProps = {
  className?: string;
  label?: string;
  error?: string;
  inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>;
  placeholder?: string;
  isOptional?: boolean;
  disabled?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export function UiTextField({
  className,
  label,
  error,
  inputProps,
  placeholder = "",
  isOptional = false,
  disabled = false,
  ...props
}: UiTextFieldProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="block text-sm mb-1">
          {label}
        </label>
      )}
      <Input
        id={id}
        {...inputProps}
        placeholder={`${placeholder} ${isOptional ? "(не обязтельно)" : ""}`}
        className={clsx(
          className,
          "rounded bg-blue-100 disabled:bg-gray-100 border border-blue-100 focus:border-blue-400 focus:border-2 focus:bg-white px-2 h-10 outline-none",
          error && "border-red bg-pink border-2",
        )}
        disabled={disabled}
      />
      {error && <div className="text-red text-sm">{error}</div>}
    </div>
  );
}
