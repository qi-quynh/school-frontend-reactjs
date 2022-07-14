import requestService from "./request-service";
import {
  fetchTeacherSuccess,
  fetchTeacherFail,
  getTeacherSuccess,
  getTeacherFail,
  resetTeacherSuccess,
  resetTeacherFail,
  addTeacherSuccess,
  addTeacherFail,
  updateTeacherSuccess,
  updateTeacherFail,
  deleteTeacherSuccess,
  deleteTeacherFail,
} from "../actions/teacher-actions";

export const getAllTeacher = (url) => async (dispatch) => {
  console.log(url);
  try {
    const { data } = await requestService.get(url, true);
    if (data.status === "OK") {
      dispatch(fetchTeacherSuccess(data.data));
    }
    else{
      dispatch(fetchTeacherFail("Không có thông tin"));
    }

    // console.log(data);
    // console.log(data.data);
  } catch (error) {
    dispatch(fetchTeacherFail(error.message));
    console.log(error.message);
  }
};

export const getTeacherById = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.get(url, true);
    console.log(data);
    if (data.status === "OK") {
      dispatch(getTeacherSuccess(data.data[0]));
    }
  } catch (error) {
    dispatch(getTeacherFail(error.message));
    console.log(error.message);
  }
};
export const getTeacherBySchoolId = (url, id) => async (dispatch) => {
  try {
    const { data } = await requestService.get(`${url}?schoolId=${id}`, true);
    dispatch(fetchTeacherSuccess(data.data));
    console.log(data);
  } catch (error) {
    dispatch(getTeacherFail(error.message));
    console.log(error.message);
  }
};

export const getTeacherBySearch = (url, search) => async (dispatch) => {
  try {
    const { data } = await requestService.get(`${url}?id=${search}`, true);
    console.log(data);
    if (data.status === "OK") dispatch(fetchTeacherSuccess(data.data));
  } catch (error) {
    // dispatch(fetchStudentFail(error.message));
  }
};

export const resetTeacher = () => async (dispatch) => {
  try {
    dispatch(resetTeacherSuccess());
  } catch (error) {
    dispatch(resetTeacherFail(error.message));
    console.log(error.message);
  }
};

export const addTeacher = (url, params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.post(url, params, true);

    console.log(data);

    if (data.status === "OK") {
      console.log("thành công");
      dispatch(addTeacherSuccess(data));
      history.goBack();
    } else {
      console.log("thất bại");
      console.log(data.message);
      dispatch(addTeacherFail(data.message));
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTeacher = (url, params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.put(url, params, true);
    console.log(data);
    dispatch(updateTeacherSuccess(data));
    if (data.status === "OK") {
      console.log("thành công");
      dispatch(updateTeacherSuccess(data));
      history.goBack();
    } else {
      console.log("thất bại");
      console.log(data.message);
      dispatch(updateTeacherFail(data.message));
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTeacher = (id) => async (dispatch) => {
  try {
    const { data } = await requestService.delete(`/teacher?id=${id}`, true);

    dispatch(deleteTeacherSuccess(data));
  } catch (error) {
    dispatch(deleteTeacherFail(error.message));
    console.log(error.message);
  }
};
