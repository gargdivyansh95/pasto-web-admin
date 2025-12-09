import { actionTypes } from "./dashboard.action";

const initialState = {
    restaurantCounts: null,
}

export const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FetchRestaurantCountsSuccess:
            if (action.payload && action.payload?.success === true) {
                return { ...state, restaurantCounts: action.payload?.data };
            } else {
                return { ...state, restaurantCounts: null };
            }
        default:
            return state;
    }
}
