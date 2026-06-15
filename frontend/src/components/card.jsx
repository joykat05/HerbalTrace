import React from "react";
import "../app.css";

function Card({ title, description, children }) {
  return (
    <div className="font-prompt border-4 border-green-300 p-5 m-4 rounded-2xl max-w-lg w-full bg-white shadow-md space-y-3 hover:scale-105
    hover:border-pink-300 transition duration-300 ease-out">
      
      {title && (
        <h2 className="text-3xl text-green-600 wrap-break-word">
          {title}
        </h2>
      )}

      {description && (
        <p className="text-gray-700 leading-relaxed wrap-break-word">
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