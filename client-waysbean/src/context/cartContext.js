import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  cartItems: [],
  isCheckout: false,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "CART_ADD_ITEM":
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: [...payload.items],
          isCheckout: payload.isCheckout,
        })
      );
      return {
        cartItems: [...payload.items],
        isCheckout: payload.isCheckout,
      };

    case "CART_REMOVE_ITEM":
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: [...payload.items],
          isCheckout: payload.isCheckout,
        })
      );
      return {
        cartItems: [...payload.items],
        isCheckout: payload.isCheckout,
      };

    case "CART_CHECKOUT_SUCCESS":
      localStorage.removeItem("cart");

      return {
        cartItems: [],
        isCheckout: false,
      };
    default:
      throw new Error();
  }
};

export const CartContextProvider = ({ children }) => {
  const [cart, cartDispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={[cart, cartDispatch]}>
      {children}
    </CartContext.Provider>
  );
};
