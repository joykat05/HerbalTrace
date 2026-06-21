import React from "react";
import "../app.css";

function Card({ title, description, children }) {
  return (
    <div className="font-prompt 
      border-4 border-green-300 
      p-5 max-md:p-2 
      m-4 max-md:m-1 
      rounded-2xl 
      max-w-lg w-full 
      max-md:max-w-full   
      bg-white 
      shadow-md 
      space-y-3 max-md:space-y-1
      hover:scale-105
      hover:border-pink-300 
      transition duration-300 ease-out
      dark:bg-gray-900
      dark:text-green-300
      ">

      {title && (
        <h2 className="
          text-3xl 
          max-md:text-sm 
          text-green-600 
          leading-tight
        ">
          {title}
        </h2>
      )}

      {description && (
        <p className="
          text-gray-700 
          dark:text-gray-300
          leading-relaxed 
          max-md:text-[10px]
          max-md:leading-tight
        ">
          {description}
        </p>
      )}

      {children && (
        <div className="pt-2 max-md:pt-1">
          {children}
        </div>
      )}

    </div>
  );
}

export default Card;