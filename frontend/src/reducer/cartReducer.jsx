const cartReducer = (state, action) => {
    switch (action.type) {
        case "INIT":
            const { init } = action.payload;
            return { ...state, cart: [...state.cart, init] };
        case "ADD_TO_CART":
            const { product } = action.payload;
            localStorage.setItem(
                "cartList",
                JSON.stringify([...state.cart, product])
            );
            return { ...state, cart: [...state.cart, product] };
        case "SET_QUANTITY":
            const { product_id, price, quantity } = action.payload;
            const newCart = state.cart.filter(item => {
                if (item.product_id === product_id) {
                    item.quantity = quantity;
                    item.price = price;
                    localStorage.setItem(
                        "cartList",
                        JSON.stringify(state.cart)
                    );
                    return { ...state, cart: [...state.cart] };
                }
            });
        case "DECREASE_QUANTITY":
            state.cart.filter(item => {
                if (item.product_id === action.payload.product_id) {
                    item.quantity = action.payload.quantity;
                    item.price = action.payload.price;
                    localStorage.setItem(
                        "cartList",
                        JSON.stringify(state.cart)
                    );
                    return { ...state, cart: [...state.cart] };
                }
            });

        case "REMOVE_CART":
            const filter = state.cart.filter(
                item => item.product_id !== action.payload.id
            );
            localStorage.setItem("cartList", JSON.stringify(filter));
            return {
                ...state,
                cart: filter
            };
        case "CLEAR_CART":
            return { ...state, cart: [] };
        default:
            throw new Error();
    }
};
export { cartReducer };
