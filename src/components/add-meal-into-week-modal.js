import React from "react";
import { MealTabs } from "../constants/mealtsbs";

export const Modal = ({
  isOpen,
  onSave,
  selectedWeek,
  setSelectedWeek,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl mx-auto overflow-hidden">
        <h2 className="text-xl font-bold text-center p-4">Select a Week</h2>
        <div className="p-4 flex flex-col text-center justify-center">
          <div className="flex flex-col justify-center sm:flex-row sm:flex-wrap gap-4">
            {MealTabs.slice(1).map(({ label, value }) => (
              <button
                key={value}
                value={value}
                className={`w-full sm:w-auto text-black py-3 px-6 rounded-lg mb-4 ${
                  selectedWeek === value ? "bg-blue-200" : "bg-gray-300"
                }`}
                onClick={() => setSelectedWeek(value)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-auto justify-center">
            <button
              onClick={onSave}
              disabled={!selectedWeek}
              className={`mt-4 w-48 text-white py-2 px-6 rounded-lg ${
                !selectedWeek ? "bg-slate-400" : "bg-blue-900 "
              }`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
