import {
    FETCH_ALL_FAMILY, 
    FETCH_ALL_FAMILY_FAIL,
    GET_FAMILY_BY_ID,
    GET_FAMILY_BY_ID_FAIL,
    RESET_FAMILY,
    RESET_FAMILY_FAIL,
    ADD_FAMILY,
    ADD_FAMILY_FAIL,
    UPDATE_FAMILY,
    UPDATE_FAMILY_FAIL,
    DELETE_FAMILY,
    DELETE_FAMILY_FAIL
}

from "../action-types/family-action-types"
export const fetchFamilySuccess = (data) => ({
    type: FETCH_ALL_FAMILY,
    payload: data
});
export const fetchFamilyFail = (data) => ({
    type: FETCH_ALL_FAMILY_FAIL,
    payload: data
});



export const getFamilySuccess = (data) => ({
    type: GET_FAMILY_BY_ID,
    payload: data
});

export const getFamilyFail = (data) => ({
    type: GET_FAMILY_BY_ID_FAIL,
    payload: data
});

export const resetFamilySuccess = () => ({
    type: RESET_FAMILY
});

export const resetFamilyFail = () => ({
    type: RESET_FAMILY_FAIL
});

export const addFamilySuccess = (data) => ({
    type: ADD_FAMILY,
    payload: data
});

export const addFamilyFail = (data) => ({
    type: ADD_FAMILY_FAIL,
    payload: data
});

export const updateFamilySuccess = (data) => ({
    type: UPDATE_FAMILY,
    payload: data
});

export const updateFamilyFail = (data) => ({
    type: UPDATE_FAMILY_FAIL,
    payload: data
});

export const deleteFamilySuccess = (data) => ({
    type: DELETE_FAMILY,
    payload: data
});

export const deleteFamilyFail = (data) => ({
    type: DELETE_FAMILY_FAIL,
    payload: data
});