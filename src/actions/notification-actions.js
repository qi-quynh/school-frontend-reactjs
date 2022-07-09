import {
    FETCH_ALL_NOTIFICATION, 
    FETCH_ALL_NOTIFICATION_FAIL,
    GET_NOTIFICATION_BY_ID,
    GET_NOTIFICATION_BY_ID_FAIL,
    RESET_NOTIFICATION,
    RESET_NOTIFICATION_FAIL,
    ADD_NOTIFICATION,
    ADD_NOTIFICATION_FAIL,
    UPDATE_NOTIFICATION,
    UPDATE_NOTIFICATION_FAIL,
    DELETE_NOTIFICATION,
    DELETE_NOTIFICATION_FAIL
}

from "../action-types/notification-action-types"
export const fetchNotificationSuccess = (data) => ({
    type: FETCH_ALL_NOTIFICATION,
    payload: data
});
export const fetchNotificationFail = (data) => ({
    type: FETCH_ALL_NOTIFICATION_FAIL,
    payload: data
});



export const getNotificationSuccess = (data) => ({
    type: GET_NOTIFICATION_BY_ID,
    payload: data
});

export const getNotificationFail = (data) => ({
    type: GET_NOTIFICATION_BY_ID_FAIL,
    payload: data
});

export const resetNotificationSuccess = () => ({
    type: RESET_NOTIFICATION
});

export const resetNotificationFail = () => ({
    type: RESET_NOTIFICATION_FAIL
});

export const addNotificationSuccess = (data) => ({
    type: ADD_NOTIFICATION,
    payload: data
});

export const addNotificationFail = (data) => ({
    type: ADD_NOTIFICATION_FAIL,
    payload: data
});

export const updateNotificationSuccess = (data) => ({
    type: UPDATE_NOTIFICATION,
    payload: data
});

export const updateNotificationFail = (data) => ({
    type: UPDATE_NOTIFICATION_FAIL,
    payload: data
});

export const deleteNotificationSuccess = (data) => ({
    type: DELETE_NOTIFICATION,
    payload: data
});

export const deleteNotificationFail = (data) => ({
    type: DELETE_NOTIFICATION_FAIL,
    payload: data
});