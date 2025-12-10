export const actionTypes = {
    FetchRestaurants: '[Restaurants] Fetch Restaurant Counts Action',
    FetchRestaurantsSuccess: '[Restaurants] Fetch Restaurant Counts Success Action',
    FetchRestaurantById: '[Restaurants] Fetch Restaurant By Id Action',
};

export const restaurantsActions = {
    fetchRestaurants: (payload, onSuccess, onError) => ({ type: actionTypes.FetchRestaurants, payload, onSuccess, onError }),
    fetchRestaurantsSuccess: (payload) => ({ type: actionTypes.FetchRestaurantsSuccess, payload }),
    fetchRestaurantById: (payload, onSuccess, onError) => ({ type: actionTypes.FetchRestaurantById, payload, onSuccess, onError }),
};
