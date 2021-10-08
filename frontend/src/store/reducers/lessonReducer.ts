import { AnyAction } from "redux";
import { IStateLesson } from "../../interfaces/state";
import { CHANGE_PARAMS, ERROR, GET_EDIT_LESSON, GET_LESSON } from "../types";

const initialState: IStateLesson = {
  loading: true,
  lesson: {
    _id: "",
    array: [],
    course: {
      _id: "",
      tags: [],
      level: "",
      certificate: "",
      description: "",
      title: "",
      image: {
        public_id: "",
        photo_url: "",
      },
      lessons: [],
      owner: {
        _id: "",
        firstName: "",
        lastName: "",
      },
      rating: [],
      favorites: [],
      isVerification: false,
    },
    comments: [],
  },
  error: false,
};

export const lessonReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_LESSON:
      return {
        ...state,
        lesson: action.payload.lesson,
        loading: false,
      };

    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_EDIT_LESSON:
      return {
        ...state,
        loading: false,
        lesson: action.payload.lesson,
      };

    case CHANGE_PARAMS:
      return { ...state, lesson: { ...state.lesson, [action.payload.key]: action.payload.value } };

    default:
      return state;
  }
};
