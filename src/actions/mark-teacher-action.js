import {
  FETCH_ALL_MARK_TEACHER,
  FETCH_ALL_MARK_TEACHER_FAIL,
} from "./../action-types/mark-teacher-action-types";

export const fetchMarkTeacherSuccess = (data) => ({
  type: FETCH_ALL_MARK_TEACHER,
  payload: data,
});
export const fetchMarkTeacherFail = (data) => ({
  type: FETCH_ALL_MARK_TEACHER_FAIL,
  payload: data,
});
