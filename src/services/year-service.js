import requestService from "./request-service";
import {
  fetchYearSuccess,
  fetchYearFail,
  getYearSuccess,
  getYearFail,
  resetYearSuccess,
  resetYearFail,
  addYearSuccess,
  addYearFail,
  updateYearSuccess,
  updateYearFail,
  deleteYearSuccess,
  deleteYearFail,
} from "../actions/year-actions";

export const getAllYear = () => async (dispatch) => {
  try {
    const { data } = await requestService.get(`/year`, true);
    if (data.status === "OK") {
      dispatch(fetchYearSuccess(data.data));
    }

    // console.log(data);
  } catch (error) {
    dispatch(fetchYearFail(error.message));
    console.log(error.message);
  }
};

export const getYearById = (id) => async (dispatch) => {
  try {
    const { data } = await requestService.get(`/year?id=${id}`, true);
    dispatch(getYearSuccess(data.data[0]));
    console.log(data);
  } catch (error) {
    dispatch(getYearFail(error.message));
    console.log(error.message);
  }
};

export const resetYear = () => async (dispatch) => {
  try {
    dispatch(resetYearSuccess());
  } catch (error) {
    dispatch(resetYearFail(error.message));
    console.log(error.message);
  }
};

export const addYear = (params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.post(`/year`, params, true);
    console.log(data);
    if (data.status === "OK") {
      //dispatch(addYearSuccess(data.data));
      history.goBack();
    } else {
      dispatch(addYearFail(data.message));
    }

    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateYear = (params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.put(`/year`, params, true);
    console.log(data);
    if (data.status === "OK") {
      dispatch(updateYearSuccess(data.data));
      history.goBack();
    } else {
      dispatch(updateYearFail(data.message));
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteYear = (id) => async (dispatch) => {
  try {
    const { data } = await requestService.delete(`/year?id=${id}`, true);
    dispatch(deleteYearSuccess(data));
  } catch (error) {
    dispatch(deleteYearFail(error.message));
    console.log(error.message);
  }
};
