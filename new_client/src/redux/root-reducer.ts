import { combineReducers } from 'redux';

import testReducer  from './test-reducer/test-reducer';

var rootReducer = combineReducers({
    testReducer
});

export default rootReducer;