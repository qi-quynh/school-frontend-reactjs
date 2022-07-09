import {
    FETCH_ALL_MARK, 
    FETCH_ALL_MARK_FAIL,
    GET_MARK_BY_ID,
    GET_MARK_BY_ID_FAIL,
    RESET_MARK,
    RESET_MARK_FAIL,
    ADD_MARK,
    ADD_MARK_FAIL,
    UPDATE_MARK,
    UPDATE_MARK_FAIL,
    DELETE_MARK,
    DELETE_MARK_FAIL
}

from "../action-types/mark-action-types"
export const fetchMarkSuccess = (data) => ({
    type: FETCH_ALL_MARK,
    payload: data
});
export const fetchMarkFail = (data) => ({
    type: FETCH_ALL_MARK_FAIL,
    payload: data
});



export const getMarkSuccess = (data) => ({
    type: GET_MARK_BY_ID,
    payload: data
});

export const getMarkFail = (data) => ({
    type: GET_MARK_BY_ID_FAIL,
    payload: data
});

export const resetMarkSuccess = () => ({
    type: RESET_MARK
});

export const resetMarkFail = () => ({
    type: RESET_MARK_FAIL
});

export const addMarkSuccess = (data) => ({
    type: ADD_MARK,
    payload: data
});


export const addMarkFail = (error) => ({
    type: ADD_MARK_FAIL,
    payload: error
});

export const updateMarkSuccess = (data) => ({
    type: UPDATE_MARK,
    payload: data
});

export const updateMarkFail = (data) => ({
    type: UPDATE_MARK_FAIL,
    payload: data
});

export const deleteMarkSuccess = (data) => ({
    type: DELETE_MARK,
    payload: data
});

export const deleteMarkFail = (data) => ({
    type: DELETE_MARK_FAIL,
    payload: data
});