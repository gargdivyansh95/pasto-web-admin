export const actionTypes = {
    FetchRestaurants: '[Dashboard] Fetch Restaurant Counts Action',
    FetchRestaurantsSuccess: '[Dashboard] Fetch Restaurant Counts Success Action',
};

export const restaurantsActions = {
    fetchRestaurants: (payload, onSuccess, onError) => ({ type: actionTypes.FetchRestaurants, payload, onSuccess, onError }),
    fetchRestaurantsSuccess: (payload) => ({ type: actionTypes.FetchRestaurantsSuccess, payload }),
};
