import requestService from "./request-service";
import {
  fetchMarkSuccess,
  fetchMarkFail,
  getMarkSuccess,
  resetMarkSuccess,
  resetMarkFail,
  addMarkSuccess,
  addMarkFail,
  updateMarkFail,
  deleteMarkSuccess,
  deleteMarkFail,
} from "../actions/mark-actions";
import {
  fetchMarkTeacherSuccess,
  fetchMarkTeacherFail,
} from "./../actions/mark-teacher-action";
export const getAllMark = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.get(url, true);
    if (data.status === "OK") {
      console.log("thành công");
      dispatch(fetchMarkSuccess(data.data));
    } else {
      dispatch(fetchMarkFail(data.message));
    }

    console.log(data);
  } catch (error) {
    dispatch(fetchMarkFail(error.message));
    console.log(error.message);
  }
};

export const getMarkById = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.get(url, true);
    dispatch(getMarkSuccess(data.data[0]));

    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMarkByContactBookId = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.get(url, true);
    dispatch(fetchMarkSuccess(data.data));
    console.log(data);
  } catch (error) {
    //dispatch(fetchMarkFail(error.message));
    console.log(error.message);
  }
};
export const getMarkByStudentId = (id) => async (dispatch) => {
  try {
    const { data } = await requestService.get(
      `/markStudent?studentId=${id}`,
      true
    );
    dispatch(fetchMarkSuccess(data.data));

    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const resetMark = () => async (dispatch) => {
  try {
    dispatch(resetMarkSuccess());
  } catch (error) {
    dispatch(resetMarkFail(error.message));
    console.log(error.message);
  }
};

export const addMark = (url, params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.post(url, params, true);
    console.log(data);
    if (data.status === "OK") {
      console.log("thành công");
      dispatch(addMarkSuccess(data));
      history.goBack();
    } else {
      console.log(data.message);
      dispatch(addMarkFail(data.message));
      console.log("thất bại");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const updateMark = (url, params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.put(url, params, true);
    console.log(data);

    if (data.status === "OK") {
      console.log("thành công");

      history.goBack();
    } else {
      console.log("thất bại");
      console.log(data.message);
      dispatch(updateMarkFail(data.message));
    }
  } catch (error) {
    // dispatch(updateMarkFail(error.message));
    console.log(error.message);
  }
};

export const deleteMark = (id) => async (dispatch) => {
  try {
    const { data } = await requestService.delete(`/markStudent?id=${id}`, true);
    dispatch(deleteMarkSuccess(data));
  } catch (error) {
    dispatch(deleteMarkFail(error.message));
    console.log(error.message);
  }
};
export const getClassByMarkTeacher = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.get(url, true);
    if (data.status === "OK") {
      console.log("thành công");
      dispatch(fetchMarkTeacherSuccess(data.data));
    }
    console.log("get class teaching");

    console.log(data);
  } catch (error) {
    dispatch(fetchMarkTeacherFail(error.message));
    console.log(error.message);
  }
};
