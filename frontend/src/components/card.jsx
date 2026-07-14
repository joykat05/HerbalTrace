import React from "react";
import "../app.css";

function Card({ title, description, children }) {
  return (
    <div className="font-prompt 
       
      p-5 max-md:p-2 
      m-4 max-md:m-1 
      rounded-2xl 
      max-w-lg w-full 
      max-md:max-w-full   
      bg-linear-to-b from-white via-white/90 to-gray-300/90 
      shadow-md 
      space-y-3 max-md:space-y-1
      hover:scale-102
      inset-shadow-sm
      inset-shadow-green-300
      hover:inset-shadow-pink-300 
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