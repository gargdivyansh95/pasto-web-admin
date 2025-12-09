import { combineReducers } from 'redux';
import {authReducer} from '../modules/admin/auth/auth.reducer';
import { dashboardReducer } from '../modules/admin/dashboard/dashboard.reducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
});

export default rootReducer;
