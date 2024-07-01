// src/components/Card.js

import React from "react";
import { IoTrashBinOutline } from "react-icons/io5";

export const MealCard = ({
  id,
  name,
  image,
  instructions,
  rating,
  mealType,
  tag,
  isSelected,
  onSelect,
  onDelete,
  selectedTab,
}) => {
  return (
    <div
      className={`p-5 bg-white rounded-lg max-w-[450px] flex flex-col gap-5 cursor-pointer relative ${
        selectedTab === "allMeals" && isSelected
          ? "border-4 border-blue-900"
          : ""
      }`}
      onClick={selectedTab === "allMeals" ? onSelect : () => {}}
      key={id}
    >
      {selectedTab !== "allMeals" && (
        <div className="absolute top-9 left-7 bg-red-100 p-1">
          <button
            onClick={() => onDelete(selectedTab, id)}
            className="text-red-600"
          >
            <IoTrashBinOutline size={20} color="red" />
          </button>
        </div>
      )}
      <div className="absolute top-9 right-7 bg-blue-900 text-white px-3 py-1 rounded-full text-sm">
        {mealType}
      </div>
      <div>
        <img
          src={image}
          alt="meal-image"
          className="rounded-md h-72 w-full object-cover"
        />
      </div>
      <div>
        <p className="text-2xl font-bold">{name}</p>
      </div>
      <div className="flex-grow">
        <p className="text-base font-normal overflow-hidden overflow-ellipsis">
          {instructions}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div>
          <div className="font-bold">
            Cuisine: <span className="font-normal">{tag}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="font-bold">Rating: </div>
          <div className="flex gap-2">
            {rating}
            {[1, 2, 3, 4, 5].map((star, index) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={rating >= star ? "darkblue" : "lightgray"}
                className="size-6"
                key={index}
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
