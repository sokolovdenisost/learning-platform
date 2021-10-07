import { Dispatch } from "redux";
import { API_URL } from "../../consts";
import { CHANGE_PARAMS, ERROR, GET_EDIT_LESSON, GET_LESSON } from "../types";

export const getLesson = (user_id: string, lesson_id: string) => async (dispatch: Dispatch) => {
  const response = await fetch(`${API_URL}/lesson/${lesson_id}/${user_id}`);

  const result = await response.json();

  if (result.type === "Error") {
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

export const getEditLesson = (user_id: string, lesson_id: string) => async (dispatch: Dispatch) => {
  const response = await fetch(`${API_URL}/lesson/edit-lesson/${lesson_id}/${user_id}`);

  const result = await response.json();

  if (result.type === "Error") {
    dispatch({
      type: ERROR,
      payload: true,
    });
  } else {
    dispatch({
      type: GET_EDIT_LESSON,
      payload: result,
    });
  }
};

export const changeLesson = (key: string, value: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: CHANGE_PARAMS,
    payload: { key, value },
  });
};
