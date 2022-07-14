import requestService from "./request-service";
import {
  fetchFamilySuccess,
  fetchFamilyFail,
  getFamilySuccess,
  getFamilyFail,
  resetFamilySuccess,
  resetFamilyFail,
  addFamilySuccess,
  addFamilyFail,
  updateFamilySuccess,
  updateFamilyFail,
  deleteFamilySuccess,
  deleteFamilyFail,
} from "../actions/family-actions";

export const getAllFamily = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.get(url, true);
    dispatch(fetchFamilySuccess(data.data));
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const getFamilyById = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.get(url, true);
    //console.log(data);

    if (data.status === "OK") {
      dispatch(getFamilySuccess(data.data[0]));
    } else {
      dispatch(getFamilyFail(data.message));
    }
  } catch (error) {
    dispatch(getFamilyFail(error.message));
    console.log(error.message);
  }
};

export const resetFamily = () => async (dispatch) => {
  try {
    dispatch(resetFamilySuccess());
  } catch (error) {
    dispatch(resetFamilyFail(error.message));
    console.log(error.message);
  }
};

export const addFamily = (params, history) => async (dispatch) => {
  try {
    const { data } = await requestService.post(`/family/manager`, params, true);

    console.log(data);

    if (data.status === "OK") {
      console.log("thành công");

      history.goBack();
    } else {
      console.log(data.message);
      dispatch(updateFamilyFail(data.message));
    }
  } catch (error) {
    dispatch(addFamilyFail(error.message));
    console.log(error.message);
  }
};

export const updateFamily = (params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.put(`/family`, params, true);
    console.log(data);

    history.goBack();
  } catch (error) {
    dispatch(updateFamilyFail(error.message));
    console.log(error.message);
  }
};

export const deleteFamily = (id) => async (dispatch) => {
  try {
    const { data } = await requestService.delete(`/family?id=${id}`, true);
    dispatch(deleteFamilySuccess(data));
  } catch (error) {
    dispatch(deleteFamilyFail(error.message));
    console.log(error.message);
  }
};
