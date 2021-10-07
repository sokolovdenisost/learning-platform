import { AnyAction } from "redux";
import { IStateCourses } from "../../interfaces/state";
import {
  GET_ALL_COURSES,
  GET_ALL_PROVEN_COURSES,
  GET_ALL_UNTESTED_COURSES,
  GET_MY_COMPLETED_COURSES,
  GET_MY_CREATED_COURSES,
  GET_MY_FAVORITE_COURSES,
  GET_MY_TAKE_COURSES,
  GO_EMPTY,
} from "../types";

const initialState: IStateCourses = {
  loading: true,
  allCourses: [],
  takeCourses: [],
  favoriteCourses: [],
  createdCourses: [],
  completedCourses: [],
  provenCourses: [],
  untestedCourses: [],
};

export const coursesReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_ALL_COURSES:
      return { ...state, allCourses: action.payload, loading: false };

    case GET_MY_CREATED_COURSES:
      return { ...state, createdCourses: action.payload, loading: false };

    case GET_MY_TAKE_COURSES:
      return { ...state, takeCourses: action.payload, loading: false };

    case GET_MY_FAVORITE_COURSES:
      return { ...state, favoriteCourses: action.payload, loading: false };

    case GET_MY_COMPLETED_COURSES:
      return { ...state, completedCourses: action.payload, loading: false };

    case GET_ALL_PROVEN_COURSES:
      return { ...state, provenCourses: action.payload, loading: false };

    case GET_ALL_UNTESTED_COURSES:
      return { ...state, untestedCourses: action.payload, loading: false };

    case GO_EMPTY:
      return { ...state, loading: true };

    default:
      return state;
  }
};
