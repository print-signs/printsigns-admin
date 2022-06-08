import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
};

export const newCategoryReducer = createReducer(
    {},
    {
        NEW_CATEGORY_REQUEST: (state) => {
            state.loading = true;
        },
        NEW_CATEGORY_SUCCESS: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        NEW_CATEGORY_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        CLEAR_ERRORS: (state) => {
            state.error = null;
        },
        CLEAR_MESSAGE: (state) => {
            state.message = null;
        },
    }
);

///
export const AllcategoryReducer = createReducer(initialState, {
    ALL_CATEGORY_REQUEST: (state) => {
        state.loading = true;
    },
    ALL_CATEGORY_SUCCESS: (state, action) => {
        state.loading = false;
        state.category = action.payload;
    },
    ALL_CATEGORY_FAIL: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    CLEAR_ERRORS: (state) => {
        state.error = null;
    },
});