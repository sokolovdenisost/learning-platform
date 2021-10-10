import { AnyAction } from "redux";
import { IStateAdmin } from "../../interfaces/state";
import { GET_ALL_BAN_USERS, GET_ALL_PROVEN_COURSES, GET_ALL_UNTESTED_COURSES, GET_ALL_USERS } from "../types";

const initialState: IStateAdmin = {
  loading: true,
  error: false,
  banUsers: [],
  users: [],
  provenCourses: [],
  untestedCourses: [],
};

export const adminReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, users: action.payload, loading: false };

    case GET_ALL_BAN_USERS:
      return { ...state, banUsers: action.payload, loading: false };

    case GET_ALL_PROVEN_COURSES:
      return { ...state, provenCourses: action.payload, loading: false };

    case GET_ALL_UNTESTED_COURSES:
      return { ...state, untestedCourses: action.payload, loading: false };

    default:
      return state;
  }
};
