import { Dispatch } from 'redux';
import { API_URL } from '../../consts';
import { ERROR, GET_AUTH, GET_USER } from '../types';

export const getAuth = () => async (dispatch: Dispatch) => {
  const user_id = localStorage.getItem('user_id');
  const response = await fetch(`${API_URL}/auth`, {
    headers: {
      Authorization: `USER_ID ${user_id ? user_id : ''}`,
    },
  });

  const result = await response.json();

  dispatch({
    type: GET_AUTH,
    payload: result,
  });
};

export const getUser = (user_id: string) => async (dispatch: Dispatch) => {
  const response = await fetch(`${API_URL}/user/${user_id}`);

  const result = await response.json();

  if (result.type === 'Error') {
    dispatch({
      type: ERROR,
      payload: true,
    });
  } else {
    dispatch({
      type: GET_USER,
      payload: result.user,
    });
  }
};
