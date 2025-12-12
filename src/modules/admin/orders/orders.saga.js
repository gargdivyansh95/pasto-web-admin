import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { actionTypes, ordersActions } from './orders.action';

export function* getAllOrders(action) {
    const { status, lastDocId } = action.payload;
    try {
        const response = yield call(axios.get, `/api/admin/orders?isSelfOrder=${status}&lastDocId=${lastDocId}`);
        if (response.status === 200) {
            yield put(ordersActions.fetchOrdersSuccess(response.data));
            action.onSuccess(response.data);
        } else {
            action.onError(response.data);
        }
    } catch (error) {
        console.error('Fetch Orders Error:', error);
        action.onError(error.response.data);
    }
}

// export function* getRestaurantById(action) {
//     const { restaurantId } = action.payload;
//     try {
//         const response = yield call(axios.get, `/api/admin/restaurants/${restaurantId}`);
//         if (response.status === 200) {
//             action.onSuccess(response.data);
//         } else {
//             action.onError(response.data);
//         }
//     } catch (error) {
//         console.error('Fetch Restaurants Error:', error);
//         action.onError(error.response.data);
//     }
// }


// Watcher saga
export function* saga() {
    yield takeLatest(actionTypes.FetchOrders, getAllOrders);
    // yield takeLatest(actionTypes.FetchRestaurantById, getRestaurantById);
}