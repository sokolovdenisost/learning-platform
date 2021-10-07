import { Dispatch } from "redux";
import { API_URL } from "../../consts";
import {
  GET_ALL_COURSES,
  GET_ALL_PROVEN_COURSES,
  GET_ALL_UNTESTED_COURSES,
  GET_MY_COMPLETED_COURSES,
  GET_MY_CREATED_COURSES,
  GET_MY_FAVORITE_COURSES,
  GET_MY_TAKE_COURSES,
} from "../types";

export const getAllCourses = () => async (dispatch: Dispatch) => {
  const response = await fetch(`${API_URL}/courses`);

  const result = await response.json();

  dispatch({
    type: GET_ALL_COURSES,
    payload: result.courses,
  });
};

export const getCreatedCourses = (id: string) => async (dispatch: Dispatch) => {
  const response = await fetch(`${API_URL}/courses/${id}/created-courses`);

  const result = await response.json();

  dispatch({
    type: GET_MY_CREATED_COURSES,
    payload: result.courses,
  });
};

export const getTakeCourses = (id: string) => async (dispatch: Dispatch) => {
  const response = await fetch(`${API_URL}/courses/${id}/take-courses`);

  const result = await response.json();

  dispatch({
    type: GET_MY_TAKE_COURSES,
    payload: result.courses.reverse(),
  });
};

export const getFavoriteCourses = (user_id: string) => async (dispatch: Dispatch) => {
  const response = await fetch(`${API_URL}/courses/${user_id}/favorite-courses`);

  const result = await response.json();

  dispatch({
    type: GET_MY_FAVORITE_COURSES,
    payload: result.courses,
  });
};

export const getCompletedCourses = (id: string) => async (dispatch: Dispatch) => {
  const response = await fetch(`${API_URL}/courses/${id}/completed-courses`);

  const result = await response.json();

  dispatch({
    type: GET_MY_COMPLETED_COURSES,
    payload: result.courses,
  });
};

export const getProvenCourses = () => async (dispatch: Dispatch) => {
  const response = await fetch(`${API_URL}/courses/proven-courses`);

  const result = await response.json();

  dispatch({
    type: GET_ALL_PROVEN_COURSES,
    payload: result.courses,
  });
};

export const getUntestedCourses = () => async (dispatch: Dispatch) => {
  const response = await fetch(`${API_URL}/courses/untested-courses`);

  const result = await response.json();

  dispatch({
    type: GET_ALL_UNTESTED_COURSES,
    payload: result.courses,
  });
};
