import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItems: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {//! functions that have anything to do with the cart
        addToCart: (state, action) => {
            //! the state is whatever the current state is of the cart
            //! any data inside of a payload (sending an item to add to the cart) which we can access
            //! action.payload
            const item = action.payload;

            const existItem = state.cartItems.find(x => x._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map(x => x._id === existItem._id ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item]
            }

            return updateCart(state);
        },
    }
});

//? Then we need to export addToCart function as an ACTION
export const {
    addToCart,
} = cartSlice.actions;

export default cartSlice.reducer;