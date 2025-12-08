export const actionTypes = {
    FetchRestaurantCounts: '[Dashboard] Fetch Restaurant Counts Action',
    FetchRestaurantCountsSuccess: '[Dashboard] Fetch Restaurant Counts Success Action',
};

export const dashboardActions = {
    fetchRestaurantCounts: (payload, onSuccess, onError) => ({ type: actionTypes.FetchRestaurantCounts, payload, onSuccess, onError }),
    fetchRestaurantCountsSuccess: (payload) => ({ type: actionTypes.FetchRestaurantCountsSuccess, payload }),
};
