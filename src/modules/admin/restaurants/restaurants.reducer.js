import { actionTypes } from "./restaurants.action";

const initialState = {
    restaurantList: null,
}

export const restaurantsReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FetchRestaurantsSuccess:
            if (action.payload && action.payload?.success === true) {
                return { ...state, restaurantList: action.payload?.data };
            } else {
                return { ...state, restaurantList: null };
            }
        default:
            return state;
    }
}
