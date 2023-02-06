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

        // selectTax: (state, action) => {

        //     const tax = action.payload;

        //     const item = state.cartItems.find((i) => i.id === tax.productId);
        //     if (item) {

        //         state.cartItems.forEach((i) => {
        //             if (i.id === item.id) {

        //                 i.taxName = tax.name;
        //                 i.taxRate = tax.rate;
        //                 i.taxId = tax.taxId
        //                 let rate = tax.rate / 100
        //                 let PriceWithT = i.price;
        //                 PriceWithT += + (i.price * rate).toFixed();
        //                 i.PriceWithTax = PriceWithT

        //             }
        //         });
        //     }
        // },

        calculatePrice: (state) => {
            let sum = 0;
            state.cartItems.forEach((i) => (sum += i.PriceWithTax * i.quantity));
            state.subTotal = sum;
            // state.shipping = state.subTotal > 1000 ? 0 : 200;
            // state.tax = +(state.subTotal * 0.18).toFixed();
            state.total = state.subTotal
            //  + state.tax + state.shipping;
        },


    }
);




let initialInfo = localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : ({
    franchisees: null,

})


export const shipingReducer = createReducer(
    initialInfo,
    {
        addShippingInfo: (state, action) => {
            const item = action.payload;
            // const isItemExist = state.franchisees.find((i) => i.id === item.id);

            // if (isItemExist) {
            // state.cartItems.forEach((i) => {
            //     if (i.id === item.id) i.quantity += 1;
            // });
            //     return;
            // } else {
            state.franchisees = item;
            // }
        },

        deleteFromshippingInfo: (state, action) => {
            state.franchisees = null
            // state.franchisees.filter((i) => i.id !== action.payload);

        },
    }
)