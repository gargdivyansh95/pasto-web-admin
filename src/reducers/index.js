import { combineReducers } from 'redux';
import {authReducer} from '../modules/admin/auth/auth.reducer';
import { dashboardReducer } from '../modules/admin/dashboard/dashboard.reducer';
import { restaurantsReducer } from '../modules/admin/restaurants/restaurants.reducer';
import { ordersReducer } from '../modules/admin/orders/orders.reducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    restaurants: restaurantsReducer,
    orders: ordersReducer
});

export default rootReducer;
