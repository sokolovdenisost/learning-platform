import { createStore, combineReducers, applyMiddleware, CombinedState, Reducer, AnyAction } from 'redux';
import thunk from 'redux-thunk';
import { courseReducer } from './reducers/courseReducer';
import { coursesReducer } from './reducers/coursesReducer';
import { lessonReducer } from './reducers/lessonReducer';
import { userReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  courses: coursesReducer,
  course: courseReducer,
  lesson: lessonReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
