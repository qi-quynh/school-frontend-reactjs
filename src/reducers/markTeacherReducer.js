import { findIndex } from "../utils/utils";

import {
  FETCH_ALL_MARK_TEACHER,
  FETCH_ALL_MARK_TEACHER_FAIL,
} from "../action-types/mark-teacher-action-types";
const initialState = {
  listClassTeaching: [],
  class: {},
  error: "",
};
const markTeacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_MARK_TEACHER: {
      console.log(state);
      console.log(action.payload);
      return { ...state, listClassTeaching: action.payload, error: "" };
    }
    case FETCH_ALL_MARK_TEACHER_FAIL: {
      console.log(state);
      console.log(action.payload);
      return { ...state, listClassTeaching: [], error: action.payload };
    }

    default:
      return state;
  }
};

export default markTeacherReducer;
