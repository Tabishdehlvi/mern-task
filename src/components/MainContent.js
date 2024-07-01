import React, { useEffect, useState } from "react";
import { MealCard } from "./Card";
import { Modal } from "./add-meal-into-week-modal";
import { MealTabs } from "../constants/mealtsbs";
import { useDispatch, useSelector } from "react-redux";
import { addToWeek, removeFromWeek, setAllMeals } from "../store/recipesSlice";

const MainContent = () => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("allMeals");
  const [selectedMeal, setSelectedCard] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState("");

  const fetchingMeals = useSelector((state) => state.recipes[selectedTab]);
  const weekMeals = useSelector((state) => state.recipes[selectedWeek]);

  const handleAddToWeek = () => {
    const mealToAdd = fetchingMeals.find((meal) => meal.id === selectedMeal);

    if (!weekMeals.some((m) => m.id === mealToAdd.id)) {
      dispatch(addToWeek({ week: selectedWeek, meal: mealToAdd }));
      setSelectedCard(null);
      setSelectedTab(selectedWeek);
      setSelectedWeek("");
    } else {
      alert(`Meal '${mealToAdd.name}' is already added to ${selectedWeek}.`);
    }
    setModal(false);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://dummyjson.com/recipes");
        const data = await response.json();
        const transformedData = data.recipes.map((recipe) => ({
          id: recipe.id,
          name: recipe.name,
          image: recipe.image,
          instructions: recipe.instructions.join(""),
          rating: recipe.rating,
          mealType: recipe.mealType[0],
          tag: recipe.tags[0],
        }));

        dispatch(setAllMeals(transformedData));
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [dispatch]);

  const handleRemoveMealFromWeek = (week, mealId) => {
    dispatch(removeFromWeek({ week, mealId }));
  };

  return (
    <main className="max-w-full py-8 bg-pink-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto mb-8 pt-8">
        <h2 className="text-4xl font-bold text-gray-900">Week Orders</h2>
      </div>

      <div className="bg-white p-8 mb-8 sticky top-0 left-0 w-full shadow-md z-50">
        <div className="flex flex-row justify-between items-center max-w-[1400px] mx-auto">
          <div className="hidden md:flex flex-row justify-between w-9/12">
            {MealTabs.map((item) => (
              <p
                key={item.value}
                onClick={() => setSelectedTab(item.value)}
                className={`text-lg font-bold cursor-pointer whitespace-nowrap mx-2 ${
                  selectedTab === item.value
                    ? "text-blue-900 border-b-4 border-blue-900"
                    : ""
                } transition-all duration-300`}
              >
                {item.label}
              </p>
            ))}
          </div>

          <div className="relative md:hidden w-44">
            <select
              value={selectedTab}
              onChange={(e) => setSelectedTab(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              {MealTabs.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div
            className={`sm:py-4 py-2 sm:px-12 px-2 text-sm ${
              !selectedMeal ? "bg-slate-400" : "bg-blue-900"
            }  text-white rounded-md text-base`}
          >
            <button onClick={() => setModal(true)} disabled={!selectedMeal}>
              Add To Week
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto py-16">
        <div className="flex justify-around flex-wrap gap-3 transition-all duration-300">
          {fetchingMeals.length === 0 ? (
            <p className="text-xl font-bold text-gray-800">{`No meals found in ${selectedTab}`}</p>
          ) : (
            fetchingMeals.map((meal, index) => (
              <MealCard
                key={index}
                id={meal.id}
                name={meal.name}
                image={meal.image}
                instructions={meal.instructions}
                rating={meal.rating}
                mealType={meal.mealType}
                tag={meal.tag}
                isSelected={selectedMeal === meal.id}
                onSelect={() => setSelectedCard(meal.id)}
                selectedTab={selectedTab}
                onDelete={handleRemoveMealFromWeek}
              />
            ))
          )}
        </div>
      </div>

      {modal && (
        <Modal
          isOpen={modal}
          onSave={handleAddToWeek}
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
          onClose={() => setModal(false)}
        />
      )}
    </main>
  );
};

export default MainContent;
