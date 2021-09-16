import { Dispatch } from 'redux';
import { API_URL } from '../../consts';
import { ERROR, GET_LESSON } from '../types';

export const getLesson = (lesson_id: string) => async (dispatch: Dispatch) => {
  const user_id = localStorage.getItem('user_id');
  const response = await fetch(`${API_URL}/course/lesson/${lesson_id}/${user_id}`);

  const result = await response.json();

  if (result.type === 'Error') {
    dispatch({
      type: ERROR,
      payload: true,
    });
  } else {
    dispatch({
      type: GET_LESSON,
      payload: result,
    });
  }
};
