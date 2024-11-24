import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  type: string;
  maxLength?: number;
  minLength?: number;
  autoComplete?: string;
  isRequired?: boolean;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  name,
  autoComplete,
  isRequired,
  value,
  onChange,
  maxLength,
  minLength,
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      autoComplete={autoComplete || ""}
      required={isRequired}
      value={value}
      minLength={minLength}
      maxLength={maxLength || 255}
      onChange={onChange}
      className="w-full border 
        border-gray-300 
        rounded-md px-3 py-2 
        focus:outline-none 
        focus:border-darkGreen font-poppins text-black"
    />
  );
};

export default InputField;
