import {
    FETCH_ALL_TEACHER, 
    FETCH_ALL_TEACHER_FAIL,
    GET_TEACHER_BY_ID,
    GET_TEACHER_BY_ID_FAIL,
    RESET_TEACHER,
    RESET_TEACHER_FAIL,
    ADD_TEACHER,
    ADD_TEACHER_FAIL,
    UPDATE_TEACHER,
    UPDATE_TEACHER_FAIL,
    DELETE_TEACHER,
    DELETE_TEACHER_FAIL
}

from "../action-types/teacher-action-types"
export const fetchTeacherSuccess = (data) => ({
    type: FETCH_ALL_TEACHER,
    payload: data
});
export const fetchTeacherFail = (data) => ({
    type: FETCH_ALL_TEACHER_FAIL,
    payload: data
});



export const getTeacherSuccess = (data) => ({
    type: GET_TEACHER_BY_ID,
    payload: data
});

export const getTeacherFail = (data) => ({
    type: GET_TEACHER_BY_ID_FAIL,
    payload: data
});

export const resetTeacherSuccess = () => ({
    type: RESET_TEACHER
});

export const resetTeacherFail = () => ({
    type: RESET_TEACHER_FAIL
});

export const addTeacherSuccess = (data) => ({
    type: ADD_TEACHER,
    payload: data
});

export const addTeacherFail = (data) => ({
    type: ADD_TEACHER_FAIL,
    payload: data
});

export const updateTeacherSuccess = (data) => ({
    type: UPDATE_TEACHER,
    payload: data
});

export const updateTeacherFail = (data) => ({
    type: UPDATE_TEACHER_FAIL,
    payload: data
});

export const deleteTeacherSuccess = (data) => ({
    type: DELETE_TEACHER,
    payload: data
});

export const deleteTeacherFail = (data) => ({
    type: DELETE_TEACHER_FAIL,
    payload: data
});