import { actionTypes } from "./orders.action";

const initialState = {
    ordersList: null,
}

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FetchOrdersSuccess:
            if (action.payload && action.payload?.success === true) {
                return { ...state, ordersList: action.payload?.data };
            } else {
                return { ...state, ordersList: null };
            }
        default:
            return state;
    }
}
