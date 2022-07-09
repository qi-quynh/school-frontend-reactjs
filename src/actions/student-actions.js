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
    DELETE_STUDENT_FAIL
}

from "../action-types/student-action-types"
export const fetchStudentSuccess = (data) => ({
    type: FETCH_ALL_STUDENT,
    payload: data
});
export const fetchStudentFail = (data) => ({
    type: FETCH_ALL_STUDENT_FAIL,
    payload: data
});



export const getStudentSuccess = (data) => ({
    type: GET_STUDENT_BY_ID,
    payload: data
});

export const getStudentFail = (data) => ({
    type: GET_STUDENT_BY_ID_FAIL,
    payload: data
});

export const resetStudentSuccess = () => ({
    type: RESET_STUDENT
});

export const resetStudentFail = () => ({
    type: RESET_STUDENT_FAIL
});

export const addStudentSuccess = (data) => ({
    type: ADD_STUDENT,
    payload: data
});

export const addStudentFail = (data) => ({
    type: ADD_STUDENT_FAIL,
    payload: data
});

export const updateStudentSuccess = (data) => ({
    type: UPDATE_STUDENT,
    payload: data
});

export const updateStudentFail = (data) => ({
    type: UPDATE_STUDENT_FAIL,
    payload: data
});

export const deleteStudentSuccess = (data) => ({
    type: DELETE_STUDENT,
    payload: data
});

export const deleteStudentFail = (error) => ({
    type: DELETE_STUDENT_FAIL,
    payload: error
});