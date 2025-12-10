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

export function* getRestaurantById(action) {
    const { restaurantId } = action.payload;
    try {
        const response = yield call(axios.get, `/api/admin/restaurants/${restaurantId}`);
        if (response.status === 200) {
            action.onSuccess(response.data);
        } else {
            action.onError(response.data);
        }
    } catch (error) {
        console.error('Fetch Restaurants Error:', error);
        action.onError(error.response.data);
    }
}

export function* getRestaurantDocuments(action) {
    const { restaurantId } = action.payload;
    try {
        const response = yield call(axios.get, `/api/admin/restaurants/${restaurantId}/documents`);
        if (response.status === 200) {
            action.onSuccess(response.data);
        } else {
            action.onError(response.data);
        }
    } catch (error) {
        console.error('Fetch Restaurants Error:', error);
        action.onError(error.response.data);
    }
}

export function* postRestaurantDocuments(action) {
    try {
        const response = yield call(axios.post, '/api/admin/restaurants/documents/approve', action.payload);
        if (response.status === 200) {
            action.onSuccess(response.data);
        } else {
            action.onError(response.data);
        }
    } catch (error) {
        console.error('Post Restaurants Documents Error:', error);
        action.onError(error.response.data);
    }
}

export function* postRestaurantStatus(action) {
    const { restaurantId } = action.payload;
    try {
        const response = yield call(axios.patch, `/api/admin/restaurants/${restaurantId}/status`, action.payload);
        if (response.status === 200) {
            action.onSuccess(response.data);
        } else {
            action.onError(response.data);
        }
    } catch (error) {
        console.error('Post Restaurants Documents Error:', error);
        action.onError(error.response.data);
    }
}

// Watcher saga
export function* saga() {
    yield takeLatest(actionTypes.FetchRestaurants, getAllRestaurants);
    yield takeLatest(actionTypes.FetchRestaurantById, getRestaurantById);
    yield takeLatest(actionTypes.FetchRestaurantDocuments, getRestaurantDocuments);
    yield takeLatest(actionTypes.UpdateRestaurantDocuments, postRestaurantDocuments);
    yield takeLatest(actionTypes.UpdateRestaurantStatus, postRestaurantStatus);
}