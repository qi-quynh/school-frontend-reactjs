import {
    FETCH_ALL_EXTRA, 
    FETCH_ALL_EXTRA_FAIL,
    GET_EXTRA_BY_ID,
    GET_EXTRA_BY_ID_FAIL,
    RESET_EXTRA,
    RESET_EXTRA_FAIL,
    ADD_EXTRA,
    ADD_EXTRA_FAIL,
    UPDATE_EXTRA,
    UPDATE_EXTRA_FAIL,
    DELETE_EXTRA,
    DELETE_EXTRA_FAIL
}

from "../action-types/extra-action-types"
export const fetchExtraSuccess = (data) => ({
    type: FETCH_ALL_EXTRA,
    payload: data
});
export const fetchExtraFail = (data) => ({
    type: FETCH_ALL_EXTRA_FAIL,
    payload: data
});



export const getExtraSuccess = (data) => ({
    type: GET_EXTRA_BY_ID,
    payload: data
});

export const getExtraFail = (data) => ({
    type: GET_EXTRA_BY_ID_FAIL,
    payload: data
});

export const resetExtraSuccess = () => ({
    type: RESET_EXTRA
});

export const resetExtraFail = () => ({
    type: RESET_EXTRA_FAIL
});

export const addExtraSuccess = (data) => ({
    type: ADD_EXTRA,
    payload: data
});

export const addExtraFail = (data) => ({
    type: ADD_EXTRA_FAIL,
    payload: data
});

export const updateExtraSuccess = (data) => ({
    type: UPDATE_EXTRA,
    payload: data
});

export const updateExtraFail = (data) => ({
    type: UPDATE_EXTRA_FAIL,
    payload: data
});

export const deleteExtraSuccess = (data) => ({
    type: DELETE_EXTRA,
    payload: data
});

export const deleteExtraFail = (data) => ({
    type: DELETE_EXTRA_FAIL,
    payload: data
});