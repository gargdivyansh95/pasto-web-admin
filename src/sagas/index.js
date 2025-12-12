import { all } from 'redux-saga/effects';
import * as auth from '../modules/admin/auth/auth.saga';
import * as dashboard from '../modules/admin/dashboard/dashboard.saga';
import * as restaurants from '../modules/admin/restaurants/restaurants.saga';
import * as orders from '../modules/admin/orders/orders.saga';

export default function* rootSaga() {
    yield all([
        auth.saga(),
        dashboard.saga(),
        restaurants.saga(),
        orders.saga(),
    ]);
}
