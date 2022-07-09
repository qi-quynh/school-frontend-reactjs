import {
    FETCH_ALL_SUBJECT, 
    FETCH_ALL_SUBJECT_FAIL,
    GET_SUBJECT_BY_ID,
    GET_SUBJECT_BY_ID_FAIL,
    RESET_SUBJECT,
    RESET_SUBJECT_FAIL,
    ADD_SUBJECT,
    ADD_SUBJECT_FAIL,
    UPDATE_SUBJECT,
    UPDATE_SUBJECT_FAIL,
    DELETE_SUBJECT,
    DELETE_SUBJECT_FAIL
}

from "../action-types/subject-action-types"
export const fetchSubjectSuccess = (data) => ({
    type: FETCH_ALL_SUBJECT,
    payload: data
});
export const fetchSubjectFail = (data) => ({
    type: FETCH_ALL_SUBJECT_FAIL,
    payload: data
});



export const getSubjectSuccess = (data) => ({
    type: GET_SUBJECT_BY_ID,
    payload: data
});

export const getSubjectFail = (data) => ({
    type: GET_SUBJECT_BY_ID_FAIL,
    payload: data
});

export const resetSubjectSuccess = () => ({
    type: RESET_SUBJECT
});

export const resetSubjectFail = () => ({
    type: RESET_SUBJECT_FAIL
});

export const addSubjectSuccess = (data) => ({
    type: ADD_SUBJECT,
    payload: data
});

export const addSubjectFail = (data) => ({
    type: ADD_SUBJECT_FAIL,
    payload: data
});

export const updateSubjectSuccess = (data) => ({
    type: UPDATE_SUBJECT,
    payload: data
});

export const updateSubjectFail = (data) => ({
    type: UPDATE_SUBJECT_FAIL,
    payload: data
});

export const deleteSubjectSuccess = (data) => ({
    type: DELETE_SUBJECT,
    payload: data
});

export const deleteSubjectFail = (data) => ({
    type: DELETE_SUBJECT_FAIL,
    payload: data
});