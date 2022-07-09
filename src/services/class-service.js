import requestService from "./request-service";
import {
  fetchClassSuccess,
  fetchClassFail,
  getClassSuccess,
  getClassFail,
  resetClassSuccess,
  resetClassFail,
  addClassSuccess,
  addClassFail,
  updateClassSuccess,
  updateClassFail,
  deleteClassSuccess,
  deleteClassFail,
} from "../actions/class-actions";

export const getAllClass = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.get(url, true);
    if (data.status === "OK") {
      dispatch(fetchClassSuccess(data.data));
      console.log(data);
    }
  } catch (error) {
    dispatch(fetchClassFail(error.message));
    console.log(error.message);
  }
};

export const getClassById = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.get(url, true);
    dispatch(getClassSuccess(data.data[0]));

    console.log(data);
  } catch (error) {
    dispatch(getClassFail(error.message));
    console.log(error.message);
  }
};

export const getClassBySchoolId = (id) => async (dispatch) => {
  try {
    const { data } = await requestService.get(`/class?schoolId=${id}`, true);
    dispatch(fetchClassSuccess(data.data));
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const getClassBySearch = (search) => async (dispatch) => {
  try {
    const { data } = await requestService.get(`/class?id=${search}`, true);
    console.log(data);
    if (data.status === "OK") dispatch(fetchClassSuccess(data.data));
  } catch (error) {
    // dispatch(fetchStudentFail(error.message));
  }
};

export const resetClass = () => async (dispatch) => {
  try {
    dispatch(resetClassSuccess());
  } catch (error) {
    dispatch(resetClassFail(error.message));
    console.log(error.message);
  }
};

export const addClass = (url, params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.post(url, params, true);
    console.log(data);
    if (data.status === "OK") {
      //console.log("thành công");
      dispatch(addClassSuccess(data));
      history.goBack();
    } else {
      //console.log("thất bại");
      console.log(data.message);
      dispatch(addClassFail(data.message));
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const updateClass = (url, params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.put(url, params, true);
    console.log(data);

    if (data.status === "OK") {
      console.log("thành công");
      dispatch(updateClassSuccess(data));
      history.goBack();
    } else {
      console.log("thất bại");
      console.log(data.message);
      dispatch(updateClassFail(data.message));
    }
  } catch (error) {
    // dispatch(updateClassFail(error.message));
    console.log(error.message);
  }
};

export const resetTeacherOfClass = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.put(
      `/class/resetTeacher`,
      null,
      true
    );
    console.log(data);

    if (data.status === "OK") {
      console.log("thành công");
      dispatch(fetchClassSuccess(data.data));
    } else {
      console.log("thất bại");
    }
  } catch (error) {
    // dispatch(updateClassFail(error.message));
    console.log(error.message);
  }
};

export const deleteClass = (url, id) => async (dispatch) => {
  try {
    const { data } = await requestService.delete(url, true);
    dispatch(deleteClassSuccess(id));
  } catch (error) {
    dispatch(deleteClassFail(error.message));
    console.log(error.message);
  }
};
