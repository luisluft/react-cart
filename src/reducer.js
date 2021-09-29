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

  if (action.type === "DECREASE") {
    let temporaryCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        } else return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);

    return { ...state, cart: temporaryCart };
  }

  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce(
      (previousValue, currentValue) => {
        const { price, amount } = currentValue;
        const itemTotal = price * amount;

        previousValue.total += itemTotal;
        previousValue.amount += amount;
        return previousValue;
      },
      {
        total: 0,
        amount: 0,
      }
    );

    total = parseFloat(total.toFixed(2));

    return { ...state, total, amount };
  }

  if (action.type === "LOADING") return { ...state, loading: true };

  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }

  return state;
};

export default reducer;
