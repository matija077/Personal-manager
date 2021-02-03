import { combineReducers } from 'redux';

import testReducer  from './test-reducer/test-reducer';
import taskReducer  from './task-reducer/task-reducer';
import userReducer from './user-reducer/user-reducer';

var rootReducer = combineReducers({
    test: testReducer,
    tasks: taskReducer,
    user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export type ActionType = {
    type: string,
    payload?: any
}

export default rootReducer;