import { AnyAction } from 'redux';
import { ERROR, GET_LESSON } from '../types';

const initialState = {
  loading: true,
  lesson: {
    array: [],
    course: {},
  },
  error: false,
};

export const lessonReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_LESSON:
      return {
        ...state,
        lesson: action.payload.lesson,
        loading: false,
      };

    case ERROR:
      return {
        ...state,
        lesson: {},
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
