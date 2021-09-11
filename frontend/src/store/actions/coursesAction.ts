import { Dispatch } from 'redux';
import { API_URL } from '../../consts';
import { GET_ALL_COURSES, GET_MY_CREATED_COURSES } from '../types';

export const getAllCourses = () => async (dispatch: Dispatch) => {
  const response = await fetch(`${API_URL}/courses`);

  const result = await response.json();

  dispatch({
    type: GET_ALL_COURSES,
    payload: result.courses,
  });
};

export const getMyCreatedCourses = () => async (dispatch: Dispatch) => {
  const user_id = localStorage.getItem('user_id');
  const response = await fetch(`${API_URL}/courses/${user_id}`);

  const result = await response.json();

  dispatch({
    type: GET_MY_CREATED_COURSES,
    payload: result.courses,
  });
};
