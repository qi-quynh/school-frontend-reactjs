import {
    FETCH_ALL_GRADE, 
    FETCH_ALL_GRADE_FAIL,
    GET_GRADE_BY_ID,
    GET_GRADE_BY_ID_FAIL,
    RESET_GRADE,
    RESET_GRADE_FAIL,
    ADD_GRADE,
    ADD_GRADE_FAIL,
    UPDATE_GRADE,
    UPDATE_GRADE_FAIL,
    DELETE_GRADE,
    DELETE_GRADE_FAIL
}

from "../action-types/grade-action-types"
export const fetchGradeSuccess = (data) => ({
    type: FETCH_ALL_GRADE,
    payload: data
});
export const fetchGradeFail = (data) => ({
    type: FETCH_ALL_GRADE_FAIL,
    payload: data
});



export const getGradeSuccess = (data) => ({
    type: GET_GRADE_BY_ID,
    payload: data
});

export const getGradeFail = (data) => ({
    type: GET_GRADE_BY_ID_FAIL,
    payload: data
});

export const resetGradeSuccess = () => ({
    type: RESET_GRADE
});

export const resetGradeFail = () => ({
    type: RESET_GRADE_FAIL
});

export const addGradeSuccess = (data) => ({
    type: ADD_GRADE,
    payload: data
});

export const addGradeFail = (data) => ({
    type: ADD_GRADE_FAIL,
    payload: data
});

export const updateGradeSuccess = (data) => ({
    type: UPDATE_GRADE,
    payload: data
});

export const updateGradeFail = (data) => ({
    type: UPDATE_GRADE_FAIL,
    payload: data
});

export const deleteGradeSuccess = (data) => ({
    type: DELETE_GRADE,
    payload: data
});

export const deleteGradeFail = (data) => ({
    type: DELETE_GRADE_FAIL,
    payload: data
});