import { findIndex } from "../utils/utils";

import {
  FETCH_ALL_STUDENT,
  FETCH_ALL_STUDENT_FAIL,
  GET_STUDENT_BY_ID,
  GET_STUDENT_BY_ID_FAIL,
  RESET_STUDENT,
  RESET_STUDENT_FAIL,
  ADD_STUDENT,
  ADD_STUDENT_FAIL,
  UPDATE_STUDENT,
  UPDATE_STUDENT_FAIL,
  DELETE_STUDENT,
  DELETE_STUDENT_FAIL,
} from "../action-types/student-action-types";
const initialState = {
  listStudent: [],
  student: {},
  error: "",
};
const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_STUDENT: {
      console.log(state);
      return { ...state, listStudent: action.payload, error: "" };
    }
    case FETCH_ALL_STUDENT_FAIL: {
      return { ...state, listStudent: [], error: action.payload };
    }
    case ADD_STUDENT: {
      const newList = [...state.listStudent];
      newList.push(action.payload);
      return { ...state, listStudent: newList, error: "" };
    }
    case ADD_STUDENT_FAIL: {
      return { ...state, error: action.payload };
    }
    case UPDATE_STUDENT: {
      const index = findIndex(state.listStudent, action.payload.id);
      const newList = [...state.listStudent];
      newList[index] = action.payload;
      console.log(newList);

      return { ...state, listStudent: newList, error: "" };
    }
    case UPDATE_STUDENT_FAIL: {
      return { ...state, error: action.payload };
    }
    case DELETE_STUDENT: {
      const index = findIndex(state.listStudent, action.payload);
      const newList = [...state.listStudent];
      newList.splice(index, 1);
      console.log(newList);
      return { ...state, listStudent: newList };
    }
    case DELETE_STUDENT_FAIL: {
      return { ...state, error: action.payload };
    }
    case GET_STUDENT_BY_ID: {
      console.log(state);
      return { ...state, student: action.payload, error: "" };
    }
    case GET_STUDENT_BY_ID_FAIL: {
      return { ...state, error: action.payload };
    }
    case RESET_STUDENT: {
      return { ...state, student: null };
    }
    case RESET_STUDENT_FAIL: {
      return { ...state, error: action.payload };
    }

    default:
      return state;
  }
};

export default studentReducer;
