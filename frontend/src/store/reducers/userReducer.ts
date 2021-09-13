import { AnyAction } from 'redux';
import { IUser } from '../../interfaces/user';
import { GET_AUTH } from '../types';

const initialState = {
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
  loading: true,
};

export const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_AUTH:
      return { ...state, ...action.payload, loading: false };

    default:
      return state;
  }
};
