export const actionTypes = {
    FetchRestaurants: '[Restaurants] Fetch Restaurants Action',
    FetchRestaurantsSuccess: '[Restaurants] Fetch Restaurants Success Action',
    FetchRestaurantById: '[Restaurants] Fetch Restaurant By Id Action',
    FetchRestaurantDocuments: '[Restaurants] Fetch Restaurant Documents Action',
    UpdateRestaurantDocuments: '[Restaurants] Update Restaurant Documents Action',
    UpdateRestaurantStatus: '[Restaurants] Update Restaurant Status Action',
};

export const restaurantsActions = {
    fetchRestaurants: (payload, onSuccess, onError) => ({ type: actionTypes.FetchRestaurants, payload, onSuccess, onError }),
    fetchRestaurantsSuccess: (payload) => ({ type: actionTypes.FetchRestaurantsSuccess, payload }),
    fetchRestaurantById: (payload, onSuccess, onError) => ({ type: actionTypes.FetchRestaurantById, payload, onSuccess, onError }),
    fetchRestaurantDocuments: (payload, onSuccess, onError) => ({ type: actionTypes.FetchRestaurantDocuments, payload, onSuccess, onError }),
    updateRestaurantDocuments: (payload, onSuccess, onError) => ({ type: actionTypes.UpdateRestaurantDocuments, payload, onSuccess, onError }),
    updateRestaurantStatus: (payload, onSuccess, onError) => ({ type: actionTypes.UpdateRestaurantStatus, payload, onSuccess, onError }),
};
