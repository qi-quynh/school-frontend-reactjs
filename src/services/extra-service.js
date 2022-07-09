import requestService from "./request-service";
import {
  fetchExtraSuccess,
  fetchExtraFail,
  getExtraSuccess,
  getExtraFail,
  resetExtraSuccess,
  resetExtraFail,
  addExtraSuccess,
  addExtraFail,
  updateExtraSuccess,
  updateExtraFail,
  deleteExtraSuccess,
  deleteExtraFail,
} from "../actions/extra-actions";

export const getAllExtra = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.get(url, true);
    if (data.status === "OK") {
      dispatch(fetchExtraSuccess(data.data));
      console.log(data);
    }

    //console.log(data);
  } catch (error) {
    dispatch(fetchExtraFail(error.message));
    console.log(error.message);
  }
};

export const getExtraById = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.get(url, true);
    console.log(data);

    if (data.status === "OK") {
      dispatch(getExtraSuccess(data.data[0]));
    }
  } catch (error) {
    dispatch(getExtraFail(error.message));
    console.log(error.message);
  }
};

export const resetExtra = () => async (dispatch) => {
  try {
    dispatch(resetExtraSuccess());
  } catch (error) {
    dispatch(resetExtraFail(error.message));
    console.log(error.message);
  }
};

export const addExtra = (url, params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.post(url, params, true);
    if (data.status === "OK") {
      dispatch(addExtraSuccess(data.data));
      history.goBack();
    }

    console.log(data);
  } catch (error) {
    dispatch(addExtraFail(error.message));
    console.log(error.message);
  }
};

export const updateExtra = (url, params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.put(url, params, true);
    console.log(data);
    if (data.status === "OK") {
      console.log("Ngoại khóa");
      dispatch(updateExtraSuccess(data.data));
      history.goBack();
    } else {
      dispatch(updateExtraFail(data.message));
    }
  } catch (error) {
    dispatch(updateExtraFail(error.message));
    console.log(error.message);
  }
};

export const deleteExtra = (url, id) => async (dispatch) => {
  try {
    const { data } = await requestService.delete(url, true);
    dispatch(deleteExtraSuccess(id));
  } catch (error) {
    dispatch(deleteExtraFail(error.message));
    console.log(error.message);
  }
};
