import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { actionTypes, restaurantsActions } from './restaurants.action';

export function* getAllRestaurants(action) {
    const { status, lastDocId } = action.payload;
    try {
        const response = yield call(axios.get, `/api/admin/restaurants?status=${status}&lastDocId=${lastDocId}`);
        if (response.status === 200) {
            yield put(restaurantsActions.fetchRestaurantsSuccess(response.data));
            action.onSuccess(response.data);
        } else {
            action.onError(response.data);
        }
    } catch (error) {
        console.error('Fetch Restaurants Error:', error);
        action.onError(error.response.data);
    }
}

// Watcher saga
export function* saga() {
    yield takeLatest(actionTypes.FetchRestaurants, getAllRestaurants);
}