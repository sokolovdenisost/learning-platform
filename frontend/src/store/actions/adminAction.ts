import { Dispatch } from "redux";
import { API_URL } from "../../consts";
import { GET_ALL_BAN_USERS, GET_ALL_PROVEN_COURSES, GET_ALL_UNTESTED_COURSES, GET_ALL_USERS } from "../types";

export const getAllUsers = () => async (dispatch: Dispatch) => {
  const response = await fetch(`${API_URL}/admin/users`);

  const result = await response.json();

  dispatch({
    type: GET_ALL_USERS,
    payload: result.users,
  });
};

export const getBanUsers = () => async (dispatch: Dispatch) => {
  const response = await fetch(`${API_URL}/admin/ban-users`);

  const result = await response.json();

  console.log(result);

  dispatch({
    type: GET_ALL_BAN_USERS,
    payload: result.users,
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
