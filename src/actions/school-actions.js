import {
    FETCH_ALL_SCHOOL, 
    FETCH_ALL_SCHOOL_FAIL,
    GET_SCHOOL_BY_ID,
    GET_SCHOOL_BY_ID_FAIL,
    RESET_SCHOOL,
    RESET_SCHOOL_FAIL,
    ADD_SCHOOL,
    ADD_SCHOOL_FAIL,
    UPDATE_SCHOOL,
    UPDATE_SCHOOL_FAIL,
    DELETE_SCHOOL,
    DELETE_SCHOOL_FAIL
}

from "../action-types/school-action-types"
export const fetchSchoolSuccess = (data) => ({
    type: FETCH_ALL_SCHOOL,
    payload: data
});
export const fetchSchoolFail = (data) => ({
    type: FETCH_ALL_SCHOOL_FAIL,
    payload: data
});



export const getSchoolSuccess = (data) => ({
    type: GET_SCHOOL_BY_ID,
    payload: data
});

export const getSchoolFail = (data) => ({
    type: GET_SCHOOL_BY_ID_FAIL,
    payload: data
});

export const resetSchoolSuccess = () => ({
    type: RESET_SCHOOL
});

export const resetSchoolFail = () => ({
    type: RESET_SCHOOL_FAIL
});

export const addSchoolSuccess = (data) => ({
    type: ADD_SCHOOL,
    payload: data
});

export const addSchoolFail = (data) => ({
    type: ADD_SCHOOL_FAIL,
    payload: data
});

export const updateSchoolSuccess = (data) => ({
    type: UPDATE_SCHOOL,
    payload: data
});

export const updateSchoolFail = (data) => ({
    type: UPDATE_SCHOOL_FAIL,
    payload: data
});

export const deleteSchoolSuccess = (data) => ({
    type: DELETE_SCHOOL,
    payload: data
});

export const deleteSchoolFail = (data) => ({
    type: DELETE_SCHOOL_FAIL,
    payload: data
});