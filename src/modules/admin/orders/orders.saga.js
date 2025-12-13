import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { actionTypes, ordersActions } from './orders.action';

export function* getAllOrderStatuses(action) {
    try {
        const response = yield call(axios.get, '/api/admin/order-status');
        if (response.status === 200) {
            yield put(ordersActions.fetchOrderStatusesSuccess(response.data));
            action.onSuccess(response.data);
        } else {
            action.onError(response.data);
        }
    } catch (error) {
        console.error('Fetch Order Statuses Error:', error);
        action.onError(error.response?.data || { error: error.message });
    }
}

export function* getAllOrders(action) {
    const { isSelfOrder, statusId, lastDocId } = action.payload;
    try {
        const response = yield call(axios.get, `/api/admin/orders?isSelfOrder=${isSelfOrder}&statusId=${statusId}&lastDocId=${lastDocId}`);
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

export function* getOrderById(action) {
    const { orderId } = action.payload;
    try {
        const response = yield call(axios.get, `/api/admin/orders/${orderId}`);
        if (response.status === 200) {
            action.onSuccess(response.data);
        } else {
            action.onError(response.data);
        }
    } catch (error) {
        console.error('Fetch Order By Id Error:', error);
        action.onError(error.response.data);
    }
}

// Watcher saga
export function* saga() {
    yield takeLatest(actionTypes.FetchOrderStatuses, getAllOrderStatuses);
    yield takeLatest(actionTypes.FetchOrders, getAllOrders);
    yield takeLatest(actionTypes.FetchOrderById, getOrderById);
}