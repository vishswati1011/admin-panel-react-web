import { combineReducers } from 'redux';
import userReducer from './userReducer';
import storage from 'redux-persist/lib/storage';

const appReducer = combineReducers({
    userRoot: userReducer,
});
export const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        storage.removeItem('persist:root');
        return appReducer(undefined, action);
    }

    return appReducer(state, action);
};
