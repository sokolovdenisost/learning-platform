import { AnyAction } from "redux";
import { IStateUser } from "../../interfaces/state";
import { ERROR, GET_ALL_USERS, GET_AUTH, GET_NOTIFICATIONS, GET_USER } from "../types";

const initialState: IStateUser = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    avatar: {
      photo_url: "",
      public_id: "",
    },
    _id: "",
    registered: "",
    takeCourses: [],
    completedCourses: [],
    role: "",
  },
  profile: {
    firstName: "",
    lastName: "",
    email: "",
    avatar: {
      photo_url: "",
      public_id: "",
    },
    _id: "",
    registered: "",
    takeCourses: [],
    completedCourses: [],
    role: "",
  },
  users: [],
  notifications: [],
  loading: true,
  error: false,
};

export const userReducer = (state: IStateUser = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_AUTH:
      return { ...state, user: { ...action.payload }, loading: false };

    case GET_USER:
      return { ...state, profile: { ...action.payload }, loading: false };

    case ERROR:
      return { ...state, error: true };

    case GET_ALL_USERS:
      return { ...state, users: action.payload, loading: false };

    case GET_NOTIFICATIONS:
      return { ...state, notifications: action.payload, loading: false };

    default:
      return state;
  }
};
