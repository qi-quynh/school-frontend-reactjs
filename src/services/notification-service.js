import requestService from "./request-service";
import {
  fetchNotificationSuccess,
  fetchNotificationFail,
  getNotificationSuccess,
  getNotificationFail,
  resetNotificationSuccess,
  resetNotificationFail,
  addNotificationSuccess,
  addNotificationFail,
  updateNotificationSuccess,
  updateNotificationFail,
  deleteNotificationSuccess,
  deleteNotificationFail,
} from "../actions/notification-actions";

export const getAllNotification = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.get(url, true);
    if (data.status === "OK") {
      console.log("thành công");
      dispatch(fetchNotificationSuccess(data.data));
    }

    console.log(data);
  } catch (error) {
    dispatch(fetchNotificationFail(error.message));
    console.log(error.message);
  }
};

export const getNotificationById = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.get(url, true);
    dispatch(getNotificationSuccess(data.data[0]));
    console.log(data);
  } catch (error) {
    dispatch(getNotificationFail(error.message));
    console.log(error.message);
  }
};

export const resetNotification = () => async (dispatch) => {
  try {
    dispatch(resetNotificationSuccess());
  } catch (error) {
    dispatch(resetNotificationFail(error.message));
    console.log(error.message);
  }
};

export const addNotification = (url, params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.post(url, params, true);

    console.log(data);
    if (data.status === "OK") {
      console.log("thành công");
      dispatch(addNotificationSuccess(data.data));
      history.goBack();
    } else {
      console.log("thất bại");
      console.log(data.message);
      dispatch(addNotificationFail(data.message));
    }
  } catch (error) {
    dispatch(addNotificationFail(error.message));
    console.log(error.message);
  }
};

export const updateNotification =
  (url, params, history) => async (dispatch) => {
    console.log(params);
    try {
      const { data } = await requestService.put(url, params, true);
      console.log(data);
      //dispatch(updateNotificationSuccess(data.data));
      if (data.status === "OK") {
        console.log("thành công");
        //dispatch(updateNotificationSuccess(data.data));
        if (history != null) {
          history.goBack();
        }
      } else {
        console.log("thất bại");
        console.log(data.message);
        dispatch(updateNotificationFail(data.message));
      }
    } catch (error) {
      dispatch(updateNotificationFail(error.message));
      console.log(error.message);
    }
  };

export const deleteNotification = (url, id) => async (dispatch) => {
  try {
    const { data } = await requestService.delete(url, true);
    if (data.status === "OK") {
      dispatch(deleteNotificationSuccess(id));
      console.log(id);
    }
  } catch (error) {
    dispatch(deleteNotificationFail(error.message));
    console.log(error.message);
  }
};
