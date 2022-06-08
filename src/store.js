// import { createStore } from 'redux'

// const initialState = {
//   sidebarShow: true,
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)
// export default store
import { configureStore } from "@reduxjs/toolkit";
import { newCategoryReducer, AllcategoryReducer } from "./reducers/categoryReducer.js";
import { loginReducer } from "./reducers/directoryReducer.js";

const store = configureStore({
  reducer: {

    newCategory: newCategoryReducer,
    AllCategory: AllcategoryReducer,

  },
});

export default store;