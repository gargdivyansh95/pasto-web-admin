export const actionTypes = {
    FetchOrderStatuses: '[Orders] Fetch Order Statuses Action',
    FetchOrderStatusesSuccess: '[Orders] Fetch Order Statuses Success Action',
    FetchOrders: '[Orders] Fetch Orders Action',
    FetchOrdersSuccess: '[Orders] Fetch Orders Success Action',
    FetchOrderById: '[Orders] Fetch Order By Id Action',
};

export const ordersActions = {
    fetchOrderStatuses: (payload, onSuccess, onError) => ({ type: actionTypes.FetchOrderStatuses, payload, onSuccess, onError }),
    fetchOrderStatusesSuccess: (payload) => ({ type: actionTypes.FetchOrderStatusesSuccess, payload }),
    fetchOrders: (payload, onSuccess, onError) => ({ type: actionTypes.FetchOrders, payload, onSuccess, onError }),
    fetchOrdersSuccess: (payload) => ({ type: actionTypes.FetchOrdersSuccess, payload }),
    fetchOrderById: (payload, onSuccess, onError) => ({ type: actionTypes.FetchOrderById, payload, onSuccess, onError }),
};
