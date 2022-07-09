import requestService from "./request-service";
import {
  fetchCourseSuccess,
  fetchCourseFail,
  getCourseSuccess,
  getCourseFail,
  resetCourseSuccess,
  resetCourseFail,
  addCourseSuccess,
  addCourseFail,
  updateCourseSuccess,
  updateCourseFail,
  deleteCourseSuccess,
  deleteCourseFail,
} from "../actions/course-actions";

export const getAllCourse = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.get(url, true);
    if (data.status === "OK") {
      dispatch(fetchCourseSuccess(data.data));
      console.log(data);
    }

    console.log(data);
  } catch (error) {
    dispatch(fetchCourseFail(error.message));
    console.log(error.message);
  }
};

export const getCourseById = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.get(url, true);
    dispatch(getCourseSuccess(data.data[0]));
    //console.log(data);
  } catch (error) {
    dispatch(getCourseFail(error.message));
    console.log(error.message);
  }
};

export const resetCourse = () => async (dispatch) => {
  try {
    dispatch(resetCourseSuccess());
  } catch (error) {
    dispatch(resetCourseFail(error.message));
    console.log(error.message);
  }
};

export const addCourse = (url, params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.post(url, params, true);
    if (data.status === "OK") {
      console.log("thành công");
      //dispatch(addCourseSuccess(data.data));
      history.goBack();
    } else {
      console.log("thất bại");
      console.log(data.message);
      dispatch(addCourseFail(data.message));
    }
  } catch (error) {
    dispatch(addCourseFail(error.message));
    console.log(error.message);
  }
};

export const updateCourse = (url, params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.put(url, params, true);
    if (data.status === "OK") {
      console.log("thành công");
      dispatch(updateCourseSuccess(data.data));
      history.goBack();
    } else {
      console.log("thất bại");
      console.log(data.message);
      dispatch(updateCourseFail(data.message));
    }
    console.log(data);
  } catch (error) {
    //   dispatch(updateSubjectFail(error.message));
    console.log(error.message);
  }
};

export const deleteCourse = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.delete(url, true);
    dispatch(deleteCourseSuccess(data));
  } catch (error) {
    dispatch(deleteCourseFail(error.message));
    console.log(error.message);
  }
};
