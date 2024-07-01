// // src/features/recipesSlice.js

// import { createSlice } from "@reduxjs/toolkit";

// const recipesSlice = createSlice({
//   name: "recipes",
//   initialState: {
//     allMeals: [],
//     weekMeals: {
//       week1: [],
//       week2: [],
//       week3: [],
//       week4: [],
//     },
//   },
//   reducers: {
//     setAllMeals(state, action) {
//       state.allMeals = action.payload;
//     },
//     addToWeek(state, action) {
//       const { week, meal } = action.payload;
//       state.weekMeals[week].push(meal);
//     },
//     removeFromWeek(state, action) {
//       const { week, meal } = action.payload;
//       state.weekMeals[week] = state.weekMeals[week].filter(
//         (item) => item !== meal
//       );
//     },
//   },
// });

// export const { setAllMeals, addToWeek, removeFromWeek } = recipesSlice.actions;
// export default recipesSlice.reducer;

// src/features/recipesSlice.js

import { createSlice } from "@reduxjs/toolkit";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    allMeals: [],
    week1: [],
    week2: [],
    week3: [],
    week4: [],
  },
  reducers: {
    setAllMeals(state, action) {
      state.allMeals = action.payload;
    },
    addToWeek(state, action) {
      const { week, meal } = action.payload;
      state[week].push(meal);
    },
    removeFromWeek(state, action) {
      const { week, mealId } = action.payload;
      state[week] = state[week].filter((meal) => meal.id !== mealId);
    },
  },
});

export const { setAllMeals, addToWeek, removeFromWeek } = recipesSlice.actions;
export default recipesSlice.reducer;
