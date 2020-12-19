import { combineReducers } from 'redux';

import testReducer  from './test-reducer/test-reducer';

var rootReducer = combineReducers({
    test: testReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;