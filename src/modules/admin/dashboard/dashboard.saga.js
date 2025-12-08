import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { actionTypes, dashboardActions } from './dashboard.action';

export function* getRestaurantsCount(action) {
    try {
        const response = yield call(axios.get, '/api/admin/dashboard');
        if (response.status === 200) {
            yield put(dashboardActions.fetchRestaurantCountsSuccess(response.data));
            action.onSuccess(response.data);
        } else {
            action.onError(response.data);
        }
    } catch (error) {
        console.error('Dashboard Saga Counts Error:', error);
        action.onError(error.response.data);
    }
}

// Watcher saga
export function* saga() {
    yield takeLatest(actionTypes.FetchRestaurantCounts, getRestaurantsCount);
}