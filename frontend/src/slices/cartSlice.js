import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItems: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {//! functions that have anything to do with the cart

    }
});

//? Then we need to export addToCart function as an ACTION
export const { 
    
} = cartSlice.actions;

export default cartSlice.reducer;