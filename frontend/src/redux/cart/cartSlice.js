import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE,
} from "../../utils/constants";
import { createSlice } from "@reduxjs/toolkit";
import { addItemToCart, removeItemFromCart } from "./cart-utils";

const INITIAL_STATE = {
  cartItems: [],
  shippingCost: 0,
  hidden: true,
};

const calculateSubtotal = (cartItems = []) =>
  cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

const calculateShippingCost = (cartItems = []) => {
  if (!cartItems.length) {
    return 0;
  }

  const subtotal = calculateSubtotal(cartItems);
  return subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    addToCart: (state, action) => {
      const updatedCartItems = addItemToCart(state.cartItems, action.payload);

      return {
        ...state,
        cartItems: updatedCartItems,
        shippingCost: calculateShippingCost(updatedCartItems),
      };
    },
    removeFromCart: (state, action) => {
      const updatedCartItems = removeItemFromCart(state.cartItems, action.payload);

      return {
        ...state,
        cartItems: updatedCartItems,
        shippingCost: calculateShippingCost(updatedCartItems),
      };
    },
    clearCart: (state) => {
      return {
        ...state,
        cartItems: [],
        shippingCost: 0,
      };
    },
    toggleHiddenCart: (state) => {
      return {
        ...state,
        hidden: !state.hidden,
      };
    },
    setHiddenCart: (state, action) => {
      return {
        ...state,
        hidden: action.payload ?? false,
      };
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  toggleHiddenCart,
  setHiddenCart,
} = cartSlice.actions;

export default cartSlice.reducer;
