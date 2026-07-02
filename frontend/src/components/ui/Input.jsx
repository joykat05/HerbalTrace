import { forwardRef } from "react";

const Input = forwardRef(
  ({placeholder,className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        placeholder={placeholder}
        className={`
          w-full
          px-4 py-2
          rounded-lg
          bg-white
          placeholder-black/70
          border border-black/40
          text-black
          font-prompt
          outline-none
          backdrop-blur-md
          focus:ring-2 focus:ring-green-300
          transition duration-200
          dark:bg-gray-700/70
          dark:placeholder-white/70
          dark:text-white
          ${className}
        `}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;