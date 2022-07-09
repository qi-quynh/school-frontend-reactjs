import {
    FETCH_ALL_CLASS, 
    FETCH_ALL_CLASS_FAIL,
    GET_CLASS_BY_ID,
    GET_CLASS_BY_ID_FAIL,
    RESET_CLASS,
    RESET_CLASS_FAIL,
    ADD_CLASS,
    ADD_CLASS_FAIL,
    UPDATE_CLASS,
    UPDATE_CLASS_FAIL,
    DELETE_CLASS,
    DELETE_CLASS_FAIL
}

from "../action-types/class-action-types"
export const fetchClassSuccess = (data) => ({
    type: FETCH_ALL_CLASS,
    payload: data
});
export const fetchClassFail = (data) => ({
    type: FETCH_ALL_CLASS_FAIL,
    payload: data
});



export const getClassSuccess = (data) => ({
    type: GET_CLASS_BY_ID,
    payload: data
});

export const getClassFail = (data) => ({
    type: GET_CLASS_BY_ID_FAIL,
    payload: data
});

export const resetClassSuccess = () => ({
    type: RESET_CLASS
});

export const resetClassFail = () => ({
    type: RESET_CLASS_FAIL
});

export const addClassSuccess = (data) => ({
    type: ADD_CLASS,
    payload: data
});

export const addClassFail = (error) => ({
    type: ADD_CLASS_FAIL,
    payload: error
});

export const updateClassSuccess = (data) => ({
    type: UPDATE_CLASS,
    payload: data
});

export const updateClassFail = (data) => ({
    type: UPDATE_CLASS_FAIL,
    payload: data
});

export const deleteClassSuccess = (data) => ({
    type: DELETE_CLASS,
    payload: data
});

export const deleteClassFail = (data) => ({
    type: DELETE_CLASS_FAIL,
    payload: data
});