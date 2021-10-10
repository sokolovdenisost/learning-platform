import { Dispatch } from "redux";
import { API_URL } from "../../consts";
import { ERROR, GET_ALL_USERS, GET_AUTH, GET_NOTIFICATIONS, GET_USER } from "../types";

export const getAuth = () => async (dispatch: Dispatch) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/auth`, {
    headers: {
      Authorization: `Bearer ${token ? token : ""}`,
    },
  });

  const result = await response.json();

  if (result._id) {
    localStorage.setItem("user_id", result._id);
  }

  dispatch({
    type: GET_AUTH,
    payload: result,
  });
};

export const getUser = (user_id: string) => async (dispatch: Dispatch) => {
  const response = await fetch(`${API_URL}/user/${user_id}`);

  const result = await response.json();

  if (result.type === "Error") {
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

export const getNotifications = (user_id: string) => async (dispatch: Dispatch) => {
  const response = await fetch(`${API_URL}/user/notifications/${user_id}`);

  const result = await response.json();

  console.log(result);

  dispatch({
    type: GET_NOTIFICATIONS,
    payload: result.notifications,
  });
};
