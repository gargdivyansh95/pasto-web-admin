import { all } from 'redux-saga/effects';
import * as auth from '../modules/admin/auth/auth.saga';
import * as dashboard from '../modules/admin/dashboard/dashboard.saga';

export default function* rootSaga() {
    yield all([
        auth.saga(),
        dashboard.saga(),
    ]);
}
