import {
    FETCH_ALL_FEE, 
    FETCH_ALL_FEE_FAIL,
    GET_FEE_BY_ID,
    GET_FEE_BY_ID_FAIL,
    RESET_FEE,
    RESET_FEE_FAIL,
    ADD_FEE,
    ADD_FEE_FAIL,
    UPDATE_FEE,
    UPDATE_FEE_FAIL,
    DELETE_FEE,
    DELETE_FEE_FAIL
}

from "../action-types/fee-action-types"
export const fetchFeeSuccess = (data) => ({
    type: FETCH_ALL_FEE,
    payload: data
});
export const fetchFeeFail = (data) => ({
    type: FETCH_ALL_FEE_FAIL,
    payload: data
});



export const getFeeSuccess = (data) => ({
    type: GET_FEE_BY_ID,
    payload: data
});

export const getFeeFail = (data) => ({
    type: GET_FEE_BY_ID_FAIL,
    payload: data
});

export const resetFeeSuccess = () => ({
    type: RESET_FEE
});

export const resetFeeFail = () => ({
    type: RESET_FEE_FAIL
});

export const addFeeSuccess = (data) => ({
    type: ADD_FEE,
    payload: data
});

export const addFeeFail = (data) => ({
    type: ADD_FEE_FAIL,
    payload: data
});

export const updateFeeSuccess = (data) => ({
    type: UPDATE_FEE,
    payload: data
});

export const updateFeeFail = (data) => ({
    type: UPDATE_FEE_FAIL,
    payload: data
});

export const deleteFeeSuccess = (data) => ({
    type: DELETE_FEE,
    payload: data
});

export const deleteFeeFail = (data) => ({
    type: DELETE_FEE_FAIL,
    payload: data
});