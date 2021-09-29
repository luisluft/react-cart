const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") return { ...state, cart: [] };

  if (action.type === "REMOVE_ITEM") {
    const filteredCart = state.cart.filter(
      (cartItem) => cartItem.id !== action.payload
    );

    return {
      ...state,
      cart: filteredCart,
    };
  }

  if (action.type === "INCREASE") {
    let temporaryCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload)
        return { ...cartItem, amount: cartItem.amount + 1 };
      else return cartItem;
    });
    return { ...state, cart: temporaryCart };
  }

  return state;
};

export default reducer;
