import { AnyAction } from 'redux';
import { IUser } from '../../interfaces/user';
import { ERROR, GET_AUTH, GET_USER } from '../types';

const initialState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    avatar: {
      photo_url: '',
      public_id: '',
    },
    _id: '',
    favorites: [],
    registered: '',
    takeCourses: [],
  },
  profile: {
    firstName: '',
    lastName: '',
    email: '',
    avatar: {
      photo_url: '',
      public_id: '',
    },
    _id: '',
    favorites: [],
    registered: '',
    takeCourses: [],
  },
  loading: true,
  error: false,
};

export const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_AUTH:
      return { ...state, user: { ...action.payload }, loading: false };

    case GET_USER:
      return { ...state, profile: { ...action.payload }, loading: false };

    case ERROR:
      return { ...state, error: true };

    default:
      return state;
  }
};
