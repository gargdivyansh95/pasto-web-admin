import { combineReducers } from 'redux';
import {authReducer} from '../modules/admin/auth/auth.reducer';

export const rootReducer = combineReducers({
    // theme: themeReducer,
    auth: authReducer,
});

export default rootReducer;
