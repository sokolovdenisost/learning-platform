import { Dispatch } from "redux";
import { API_URL } from "../../consts";
import { GET_ALL_COURSES, GET_MY_CREATED_COURSES, GET_MY_FAVORITE_COURSES, GET_MY_TAKE_COURSES } from "../types";

export const getAllCourses = () => async (dispatch: Dispatch) => {
  const response = await fetch(`${API_URL}/courses`);

  const result = await response.json();

  dispatch({
    type: GET_ALL_COURSES,
    payload: result.courses,
  });
};

export const getCreatedCourses =
  (id: string | null = null) =>
  async (dispatch: Dispatch) => {
    const user_id = localStorage.getItem("user_id");
    const response = await fetch(`${API_URL}/courses/${id ? id : user_id}/created-courses`);

    const result = await response.json();

    dispatch({
      type: GET_MY_CREATED_COURSES,
      payload: result.courses,
    });
  };

export const getTakeCourses =
  (id: string | null = null) =>
  async (dispatch: Dispatch) => {
    const user_id = localStorage.getItem("user_id");
    const response = await fetch(`${API_URL}/courses/${id ? id : user_id}/take-courses`);

    const result = await response.json();

    dispatch({
      type: GET_MY_TAKE_COURSES,
      payload: result.courses.reverse(),
    });
  };

export const getFavoriteCourses = () => async (dispatch: Dispatch) => {
  const user_id = localStorage.getItem("user_id");
  const response = await fetch(`${API_URL}/courses/${user_id}/favorite-courses`);

  const result = await response.json();

  dispatch({
    type: GET_MY_FAVORITE_COURSES,
    payload: result.courses,
  });
};
