import {
    FETCH_ALL_CONTACT_BOOK, 
    FETCH_ALL_CONTACT_BOOK_FAIL,
    GET_CONTACT_BOOK_BY_ID,
    GET_CONTACT_BOOK_BY_ID_FAIL,
    RESET_CONTACT_BOOK,
    RESET_CONTACT_BOOK_FAIL,
    ADD_CONTACT_BOOK,
    ADD_CONTACT_BOOK_FAIL,
    UPDATE_CONTACT_BOOK,
    UPDATE_CONTACT_BOOK_FAIL,
    DELETE_CONTACT_BOOK,
    DELETE_CONTACT_BOOK_FAIL
}

from "../action-types/contactBook-action-types"
export const fetchContactBookSuccess = (data) => ({
    type: FETCH_ALL_CONTACT_BOOK,
    payload: data
});
export const fetchContactBookFail = (data) => ({
    type: FETCH_ALL_CONTACT_BOOK_FAIL,
    payload: data
});



export const getContactBookSuccess = (data) => ({
    type: GET_CONTACT_BOOK_BY_ID,
    payload: data
});

export const getContactBookFail = (data) => ({
    type: GET_CONTACT_BOOK_BY_ID_FAIL,
    payload: data
});

export const resetContactBookSuccess = () => ({
    type: RESET_CONTACT_BOOK
});

export const resetContactBookFail = () => ({
    type: RESET_CONTACT_BOOK_FAIL
});

export const addContactBookSuccess = (data) => ({
    type: ADD_CONTACT_BOOK,
    payload: data
});

export const addContactBookFail = (error) => ({
    type: ADD_CONTACT_BOOK_FAIL,
    payload: error
});

export const updateContactBookSuccess = (data) => ({
    type: UPDATE_CONTACT_BOOK,
    payload: data
});

export const updateContactBookFail = (data) => ({
    type: UPDATE_CONTACT_BOOK_FAIL,
    payload: data
});

export const deleteContactBookSuccess = (data) => ({
    type: DELETE_CONTACT_BOOK,
    payload: data
});

export const deleteContactBookFail = (data) => ({
    type: DELETE_CONTACT_BOOK_FAIL,
    payload: data
});