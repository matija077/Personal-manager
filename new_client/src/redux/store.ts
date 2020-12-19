import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

var middlewares = [

];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

var store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
);

export type DispatchType = typeof store.dispatch;

export default store;