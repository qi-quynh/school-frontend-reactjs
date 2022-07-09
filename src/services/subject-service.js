import requestService from "./request-service";
import {
  fetchSubjectSuccess,
  fetchSubjectFail,
  getSubjectSuccess,
  getSubjectFail,
  resetSubjectSuccess,
  resetSubjectFail,
  addSubjectSuccess,
  addSubjectFail,
  updateSubjectSuccess,
  updateSubjectFail,
  deleteSubjectSuccess,
  deleteSubjectFail,
} from "../actions/subject-actions";

export const getAllSubject = () => async (dispatch) => {
  try {
    const { data } = await requestService.get(`/subject`, true);

    dispatch(fetchSubjectSuccess(data.data));
    console.log(data);
  } catch (error) {
    dispatch(fetchSubjectFail(error.message));
    console.log(error.message);
  }
};

export const getSubjectById = (id) => async (dispatch) => {
  try {
    const { data } = await requestService.get(`/subject?id=${id}`, true);
    dispatch(getSubjectSuccess(data.data[0]));
    //console.log(data);
  } catch (error) {
    dispatch(getSubjectFail(error.message));
    console.log(error.message);
  }
};

export const resetSubject = () => async (dispatch) => {
  try {
    dispatch(resetSubjectSuccess());
  } catch (error) {
    dispatch(resetSubjectFail(error.message));
    console.log(error.message);
  }
};

export const addSubject = (params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.post(`/subject`, params, true);
    if (data.status == "OK") {
      console.log("thành công");
      dispatch(addSubjectSuccess(data.data));
      history.push("/admin/class");
    } else {
      console.log("thất bại");
      console.log(data.message);
      dispatch(addSubjectFail(data.message));
    }
  } catch (error) {
    dispatch(addSubjectFail(error.message));
    console.log(error.message);
  }
};

export const updateSubject = (params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.put(`/subject`, params, true);
    if (data.status == "OK") {
      console.log("thành công");
      dispatch(updateSubjectSuccess(data.data));
      history.goBack();
    } else {
      dispatch(updateSubjectFail(data.message));
    }
    console.log(data);
  } catch (error) {
    //   dispatch(updateSubjectFail(error.message));
    console.log(error.message);
  }
};

export const deleteSubject = (id) => async (dispatch) => {
  try {
    const { data } = await requestService.delete(`/subject?id=${id}`, true);
    dispatch(deleteSubjectSuccess(data));
  } catch (error) {
    dispatch(deleteSubjectFail(error.message));
    console.log(error.message);
  }
};
