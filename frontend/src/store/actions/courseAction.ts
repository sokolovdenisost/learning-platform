import { Dispatch } from 'redux';
import { API_URL } from '../../consts';
import { CHANGE_PARAMS, ERROR, GET_COURSE, GET_EDIT_COURSE, GO_EMPTY } from '../types';

export const getEditCourse = (course_id: string) => async (dispatch: Dispatch) => {
  const user_id = localStorage.getItem('user_id');
  const response = await fetch(`${API_URL}/course/edit/${course_id}/${user_id}`);

  const result = await response.json();

  if (result.type === 'Error') {
    dispatch({
      type: ERROR,
      payload: true,
    });
  } else {
    dispatch({
      type: GET_EDIT_COURSE,
      payload: result.course,
    });
  }
};

export const getCourse = (course_id: string) => async (dispatch: Dispatch) => {
  const response = await fetch(`${API_URL}/course/${course_id}`);
  const result = await response.json();

  if (result.type === 'Error') {
    dispatch({
      type: ERROR,
      payload: true,
    });
  } else {
    dispatch({
      type: GET_COURSE,
      payload: result.course,
    });
  }
};

export const changeParams = (key: string, value: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: CHANGE_PARAMS,
    payload: {
      key,
      value,
    },
  });
};

export const goEmpty = () => async (dispatch: Dispatch) => {
  dispatch({
    type: GO_EMPTY,
    payload: null,
  });
};
