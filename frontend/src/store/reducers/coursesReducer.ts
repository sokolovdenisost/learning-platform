import { AnyAction } from "redux";
import { GET_ALL_COURSES, GET_MY_CREATED_COURSES, GET_MY_FAVORITE_COURSES, GET_MY_TAKE_COURSES } from "../types";

const initialState = {
  loading: true,
  allCourses: [],
  takeCourses: [],
  favoriteCourses: [],
  createdCourses: [],
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

    default:
      return state;
  }
};
