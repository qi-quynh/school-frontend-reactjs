import requestService from "./request-service";
import {
  fetchFeeSuccess,
  fetchFeeFail,
  getFeeSuccess,
  getFeeFail,
  resetFeeSuccess,
  resetFeeFail,
  addFeeSuccess,
  addFeeFail,
  updateFeeSuccess,
  updateFeeFail,
  deleteFeeSuccess,
  deleteFeeFail,
} from "../actions/fee-actions";

export const getAllFee = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.get(url, true);
    if (data.status === "OK") dispatch(fetchFeeSuccess(data.data));

    console.log(data);
  } catch (error) {
    dispatch(fetchFeeFail(error.message));
    console.log(error.message);
  }
};

export const getFeeById = (url) => async (dispatch) => {
  console.log(url);
  try {
    const { data } = await requestService.get(url, true);
    if (data.status === "OK") dispatch(getFeeSuccess(data.data[0]));
    console.log(data);
  } catch (error) {
    dispatch(getFeeFail(error.message));
    console.log(error.message);
  }
};

export const resetFee = () => async (dispatch) => {
  try {
    dispatch(resetFeeSuccess());
  } catch (error) {
    dispatch(resetFeeFail(error.message));
    console.log(error.message);
  }
};

export const getFeeBySearch = (search) => async (dispatch) => {
  try {
    const { data } = await requestService.get(`/fee?studentId=${search}`, true);
    console.log(data);
    if (data.status === "OK") dispatch(fetchFeeSuccess(data.data));
  } catch (error) {
    // dispatch(fetchStudentFail(error.message));
  }
};

export const addFee = (url, params, history) => async (dispatch) => {
  console.log(params);
  try {
    console.log("đang chò");
    const { data } = await requestService.post(url, params, true);
    if (data.status === "OK") {
      //console.log("thành công");
      // dispatch(addFeeSuccess(data));
      history.goBack();
    } else {
      // console.log("thất bại");
      // console.log(data.message);
      dispatch(addFeeFail(data.message));
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const updateFee = (url, params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.put(url, params, true);
    if (data.status === "OK") {
      console.log("thành công");
      dispatch(updateFeeSuccess(data));
      history.goBack();
    } else {
      console.log("thất bại");
      console.log(data.message);
      dispatch(updateFeeFail(data.message));
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteFee = (id) => async (dispatch) => {
  try {
    const { data } = await requestService.delete(`/fee?id=${id}`, true);
    dispatch(deleteFeeSuccess(data));
  } catch (error) {
    dispatch(deleteFeeFail(error.message));
    console.log(error.message);
  }
};
