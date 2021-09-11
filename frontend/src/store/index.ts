import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { courseReducer } from './reducers/courseReducer';
import { coursesReducer } from './reducers/coursesReducer';
import { userReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  courses: coursesReducer,
  course: courseReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
