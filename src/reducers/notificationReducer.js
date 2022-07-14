import { findIndex, findIndexNotification } from "../utils/utils";

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
  DELETE_NOTIFICATION_FAIL,
  FETCH_ALL_NOTIFICATION_REQUEST,
  FETCH_ALL_NOTIFICATION_REQUEST_FAIL,
} from "../action-types/notification-action-types";
const initialState = {
  listNotification: [],
  listNotificationRequest: [],
  notification: {},
};
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_NOTIFICATION: {
      console.log(state);
      console.log(action.payload);
      return { ...state, listNotification: action.payload, error: "" };
    }
    case FETCH_ALL_NOTIFICATION_FAIL: {
      console.log(state);
      console.log(action.payload);
      return { ...state, listNotification: [], error: action.payload };
    }

    case FETCH_ALL_NOTIFICATION_REQUEST: {
      console.log(state);
      console.log(action.payload);
      return { ...state, listRequest: action.payload, error: "" };
    }
    case FETCH_ALL_NOTIFICATION_REQUEST_FAIL: {
      console.log(state);
      console.log(action.payload);
      return { ...state, listRequest: [], error: action.payload };
    }
    case ADD_NOTIFICATION: {
      const newList = [...state.listNotification];
      newList.push(action.payload);
      return { ...state, listNotification: newList };
    }
    case ADD_NOTIFICATION_FAIL: {
      return { ...state, error: action.payload };
    }
    case UPDATE_NOTIFICATION: {
      const index = findIndex(state.listNotification, action.payload.id);
      const newList = [...state.listNotification];
      newList[index] = action.payload;
      console.log(newList);

      return { ...state, listNotification: newList };
    }
    case UPDATE_NOTIFICATION_FAIL: {
      return { ...state, error: action.payload };
    }
    case DELETE_NOTIFICATION: {
      const index = findIndexNotification(
        state.listNotification,
        action.payload
      );
      const newList = [...state.listNotification];
      newList.splice(index, 1);
      console.log(newList);
      console.log(index);
      console.log(action.payload);
      return { ...state, listNotification: newList };
    }
    case DELETE_NOTIFICATION_FAIL: {
      return { ...state, error: action.payload };
    }
    case GET_NOTIFICATION_BY_ID: {
      console.log(state);
      return { ...state, notification: action.payload };
    }
    case GET_NOTIFICATION_BY_ID_FAIL: {
      return { ...state, error: action.payload };
    }
    case RESET_NOTIFICATION: {
      return { ...state, notification: null };
    }
    case RESET_NOTIFICATION_FAIL: {
      return { ...state, error: action.payload };
    }

    default:
      return state;
  }
};

export default notificationReducer;
