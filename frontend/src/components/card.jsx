import React from "react";
import "../app.css";

function Card({ title, description, children }) {
  return (
    <div className="font-prompt 
  border-4 border-green-300 
  p-5 max-md:p-3 
  m-4 max-md:m-2 
  rounded-2xl 
  max-w-lg w-full 
  max-md:max-w-[90%]   
  bg-white 
  shadow-md 
  space-y-3 max-md:space-y-2
  hover:scale-105
  hover:border-pink-300 
  transition duration-300 ease-out">
      
      {title && (
        <h2 className="
          text-3xl 
          max-md:text-lg 

          text-green-600 
          leading-tight
        ">
          {title}
        </h2>
      )}

      {description && (
        <p className="
          text-gray-700 
          leading-relaxed 
          max-md:text-sm
        ">
          {description}
        </p>
      )}

      {children && (
        <div className="pt-2">
          {children}
        </div>
      )}

    </div>
  );
}

export default Card;