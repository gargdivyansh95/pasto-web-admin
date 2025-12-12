export const actionTypes = {
    FetchOrders: '[Orders] Fetch Orders Action',
    FetchOrdersSuccess: '[Orders] Fetch Orders Success Action',
    FetchOrderById: '[Orders] Fetch Order By Id Action',
};

export const ordersActions = {
    fetchOrders: (payload, onSuccess, onError) => ({ type: actionTypes.FetchOrders, payload, onSuccess, onError }),
    fetchOrdersSuccess: (payload) => ({ type: actionTypes.FetchOrdersSuccess, payload }),
    fetchOrderById: (payload, onSuccess, onError) => ({ type: actionTypes.FetchOrderById, payload, onSuccess, onError }),
};
