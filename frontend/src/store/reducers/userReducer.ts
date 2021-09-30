import { AnyAction } from "redux";
import { IStateUser } from "../../interfaces/state";
import { IUser } from "../../interfaces/user";
import { ERROR, GET_AUTH, GET_USER } from "../types";

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
  },
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

    default:
      return state;
  }
};
