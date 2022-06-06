import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  kind?: "text" | "phone" | "name";
  type: string;
  register?: UseFormRegisterReturn;
  placeholder?: string;
  required: boolean;
  onClick?: () => void;
}

export default function Input({
  label,
  name,
  kind = "text",
  register,
  type = "text",
  required = false,
  placeholder,
  onClick,
}: InputProps) {
  return (
    <div className="mt-4">
      <label
        className="mb-2 flex items-center text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        {label}
        {kind === "name" ? (
          <div
            onClick={onClick}
            className="ml-2 cursor-pointer rounded-lg bg-[#B0FAB7] px-2 py-1 text-xs"
          >
            중복확인
          </div>
        ) : null}
      </label>
      {kind === "text" ? (
        <div>
          <input
            {...register}
            id={name}
            required={required}
            type={type}
            placeholder={placeholder}
            className="h-10 w-full rounded-md border-0 bg-[#DCF0E9] pl-4 focus:ring-[#4f5653]"
          />
        </div>
      ) : null}
      {kind === "phone" ? (
        <div className="relative flex items-center">
          <input
            {...register}
            id={name}
            required={required}
            type={type}
            placeholder={placeholder}
            className="h-10 w-full rounded-md border-0 bg-[#DCF0E9] pl-4 focus:ring-[#4f5653]"
          />
          <div
            className="absolute right-2 flex cursor-pointer items-center justify-center rounded-lg bg-[#C6A6A6] py-1.5 px-2 text-xs"
            onClick={onClick}
          >
            인증번호 전송
          </div>
        </div>
      ) : null}
      {kind === "name" ? (
        <div>
          <input
            {...register}
            id={name}
            required={required}
            type={type}
            placeholder={placeholder}
            className="h-10 w-full rounded-md border-0 bg-[#DCF0E9] pl-4 focus:ring-[#4f5653]"
          />
        </div>
      ) : null}
    </div>
  );
}
