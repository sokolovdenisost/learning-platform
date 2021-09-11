import { Dispatch } from 'redux';
import { API_URL } from '../../consts';
import { GET_AUTH } from '../types';

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
