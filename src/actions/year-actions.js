import {
    FETCH_ALL_YEAR, 
    FETCH_ALL_YEAR_FAIL,
    GET_YEAR_BY_ID,
    GET_YEAR_BY_ID_FAIL,
    RESET_YEAR,
    RESET_YEAR_FAIL,
    ADD_YEAR,
    ADD_YEAR_FAIL,
    UPDATE_YEAR,
    UPDATE_YEAR_FAIL,
    DELETE_YEAR,
    DELETE_YEAR_FAIL
}

from "../action-types/year-action-types"
export const fetchYearSuccess = (data) => ({
    type: FETCH_ALL_YEAR,
    payload: data
});
export const fetchYearFail = (data) => ({
    type: FETCH_ALL_YEAR_FAIL,
    payload: data
});



export const getYearSuccess = (data) => ({
    type: GET_YEAR_BY_ID,
    payload: data
});

export const getYearFail = (data) => ({
    type: GET_YEAR_BY_ID_FAIL,
    payload: data
});

export const resetYearSuccess = () => ({
    type: RESET_YEAR
});

export const resetYearFail = () => ({
    type: RESET_YEAR_FAIL
});

export const addYearSuccess = (data) => ({
    type: ADD_YEAR,
    payload: data
});

export const addYearFail = (data) => ({
    type: ADD_YEAR_FAIL,
    payload: data
});

export const updateYearSuccess = (data) => ({
    type: UPDATE_YEAR,
    payload: data
});

export const updateYearFail = (data) => ({
    type: UPDATE_YEAR_FAIL,
    payload: data
});

export const deleteYearSuccess = (data) => ({
    type: DELETE_YEAR,
    payload: data
});

export const deleteYearFail = (data) => ({
    type: DELETE_YEAR_FAIL,
    payload: data
});