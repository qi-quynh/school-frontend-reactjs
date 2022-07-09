import requestService from "./request-service";
import {
  fetchSchoolSuccess,
  fetchSchoolFail,
  getSchoolSuccess,
  getSchoolFail,
  resetSchoolSuccess,
  resetSchoolFail,
  addSchoolSuccess,
  addSchoolFail,
  updateSchoolSuccess,
  updateSchoolFail,
  deleteSchoolSuccess,
  deleteSchoolFail,
} from "../actions/school-actions";

export const getAllSchool = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.get(url, true);
    if (data.status === "OK") {
      console.log("thành công");
      dispatch(fetchSchoolSuccess(data.data));
    }

    console.log(data);
  } catch (error) {
    dispatch(fetchSchoolFail(error.message));
    console.log(error.message);
  }
};

export const getSchoolById = (url, id) => async (dispatch) => {
  try {
    const { data } = await requestService.get(`${url}/${id}`, true);
    console.log(`${url}?id=${id}`);
    if (data !== null) dispatch(getSchoolSuccess(data.data[0]));
    console.log(data);
  } catch (error) {
    dispatch(getSchoolFail(error.message));
    console.log(error.message);
  }
};

export const resetSchool = () => async (dispatch) => {
  try {
    dispatch(resetSchoolSuccess());
  } catch (error) {
    dispatch(resetSchoolFail(error.message));
    console.log(error.message);
  }
};

export const addSchool = (url, params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.post(url, params, true);
    if (data.status === "OK") {
      //console.log("thành công");
      dispatch(addSchoolSuccess(data.data));
      history.goBack();
      //history.push("/manager/school");
    } else {
      // console.log("thất bại");
      // console.log(data.message);
      dispatch(addSchoolFail(data.message));
    }

    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateSchool = (url, params, history) => async (dispatch) => {
  console.log(url);
  console.log(params);
  try {
    const { data } = await requestService.put(url, params, true);
    if (data.data !== null) {
      console.log("thành công");
      dispatch(updateSchoolSuccess(data.data));
      history.goBack();
    } else {
      console.log("thất bại");
      console.log(data.message);
      dispatch(updateSchoolFail(data.message));
    }
    console.log(data);
    dispatch(updateSchoolSuccess(data.data));
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSchool = (id) => async (dispatch) => {
  try {
    const { data } = await requestService.delete(`/school?id=${id}`, true);
    dispatch(deleteSchoolSuccess(data));
  } catch (error) {
    dispatch(deleteSchoolFail(error.message));
    console.log(error.message);
  }
};
