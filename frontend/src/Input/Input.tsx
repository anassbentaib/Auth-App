import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
  required: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  required,
  disabled,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        {...register(id, {
          required: { value: required, message: "This field is required" },
        })}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          p-4
          pt-4
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled-cursor-not-allowed
          ${errors?.[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors?.[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
      <label
        className={`
          absolute text-sm duration-150 transform -translate-y-3 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 
          ${errors?.[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
