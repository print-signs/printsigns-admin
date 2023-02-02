import { createReducer } from "@reduxjs/toolkit";
let initialState = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : ({
    cartItems: [],
    subTotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
})




export const cartReducer = createReducer(
    initialState,
    {
        addToCart: (state, action) => {
            const item = action.payload;
            const isItemExist = state.cartItems.find((i) => i.id === item.id);

            if (isItemExist) {
                state.cartItems.forEach((i) => {
                    if (i.id === item.id) i.quantity += 1;
                });
            } else {
                state.cartItems.push(item);
            }
        },

        decrement: (state, action) => {
            const item = state.cartItems.find((i) => i.id === action.payload);
            if (item.quantity > 1) {
                state.cartItems.forEach((i) => {
                    if (i.id === item.id) i.quantity -= 1;
                });
            }
        },

        deleteFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
        },
        calculatePrice: (state) => {
            let sum = 0;
            state.cartItems.forEach((i) => (sum += i.price * i.quantity));
            state.subTotal = sum;
            // state.shipping = state.subTotal > 1000 ? 0 : 200;
            // state.tax = +(state.subTotal * 0.18).toFixed();
            state.total = state.subTotal
            //  + state.tax + state.shipping;
        },

    }
);




let initialInfo = localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : ({
    franchisees: [],

})


export const shipingReducer = createReducer(
    initialInfo,
    {
        addShippingInfo: (state, action) => {
            const item = action.payload;
            const isItemExist = state.franchisees.find((i) => i.id === item.id);

            if (isItemExist) {
                // state.cartItems.forEach((i) => {
                //     if (i.id === item.id) i.quantity += 1;
                // });
                return;
            } else {
                state.franchisees.push(item);
            }
        },

        deleteFromshippingInfo: (state, action) => {
            state.franchisees = state.franchisees.filter((i) => i.id !== action.payload);

        },
    }
)