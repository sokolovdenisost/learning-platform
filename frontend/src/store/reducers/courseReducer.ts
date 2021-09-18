import { AnyAction } from 'redux';
import { CHANGE_PARAMS, ERROR, GET_COURSE, GET_EDIT_COURSE, GO_EMPTY } from '../types';

const initialState = {
  loading: true,
  error: false,
  course: {
    _id: '',
    tags: [],
    level: '',
    certificate: '',
    description: '',
    title: '',
    image: {
      public_id: '',
      photo_url: '',
    },
    lessons: [],
    owner: {
      _id: '',
      firstName: '',
      lastName: '',
    },
    rating: [],
  },
};

export const courseReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_EDIT_COURSE:
      return { ...state, course: action.payload, loading: false };

    case CHANGE_PARAMS:
      return { ...state, course: { ...state.course, [action.payload.key]: action.payload.value } };

    case GET_COURSE:
      return { ...state, course: action.payload, loading: false };

    case GO_EMPTY:
      return {
        ...state,
        course: {
          _id: '',
          tags: [],
          level: '',
          certificate: '',
          description: '',
          title: '',
          image: {
            public_id: '',
            photo_url: '',
          },
          lessons: [],
          owner: {
            _id: '',
            firstName: '',
            lastName: '',
          },
          rating: [],
        },
      };

    case ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
