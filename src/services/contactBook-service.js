import requestService from "./request-service";
import {
  fetchContactBookSuccess,
  fetchContactBookFail,
  getContactBookSuccess,
  getContactBookFail,
  resetContactBookSuccess,
  resetContactBookFail,
  addContactBookSuccess,
  addContactBookFail,
  updateContactBookSuccess,
  updateContactBookFail,
  deleteContactBookSuccess,
  deleteContactBookFail,
} from "../actions/contactBook-actions";

export const getAllContactBook = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.get(url, true);
    if (data.status === "OK") {
      dispatch(fetchContactBookSuccess(data.data));
    }

    console.log(data);
  } catch (error) {
    dispatch(fetchContactBookFail(error.message));
    console.log(error.message);
  }
};

export const getContactBookById = (url) => async (dispatch) => {
  try {
    console.log(url);
    const { data } = await requestService.get(url, true);
    dispatch(fetchContactBookSuccess(data.data));
    //console.log(data);
  } catch (error) {
    dispatch(fetchContactBookFail(error.message));
    console.log(error.message);
  }
};

export const getContactBookByStudentId = (id) => async (dispatch) => {
  try {
    const { data } = await requestService.get(
      `/contactBook?studentId=${id}`,
      true
    );
    dispatch(fetchContactBookSuccess(data.data));

    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const getContactBookBySchoolId = (id) => async (dispatch) => {
  try {
    const { data } = await requestService.get(
      `/contactBook?schoolId=${id}`,
      true
    );
    dispatch(fetchContactBookSuccess(data.data));
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};
export const getContactBookBySearch = (search) => async (dispatch) => {
  try {
    const { data } = await requestService.get(
      `/contactBook?studentId=${search}`,
      true
    );
    console.log(data);
    if (data.status === "OK") dispatch(fetchContactBookSuccess(data.data));
  } catch (error) {
    // dispatch(fetchStudentFail(error.message));
  }
};
export const resetContactBook = () => async (dispatch) => {
  try {
    dispatch(resetContactBookSuccess());
  } catch (error) {
    dispatch(resetContactBookFail(error.message));
    console.log(error.message);
  }
};

export const addContactBook = (url, params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.post(
      `${url}?classId=${params.classId}&semester=${params.semester}&schoolYear=${params.year}`,
      params,
      true
    );
    console.log(data);
    if (data.status === "OK") {
      console.log(data);

      dispatch(addContactBookSuccess(data));
      history.goBack();
    } else {
      console.log("thất bại");
      console.log(data.message);
      dispatch(addContactBookFail(data.message));
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const addContactBookByStudent =
  (url, params, history) => async (dispatch) => {
    console.log(params);
    try {
      const { data } = await requestService.post(url, params, true);
      console.log(data);
      if (data.status === "OK") {
        console.log(data);
        dispatch(addContactBookSuccess(data));
        history.goBack();
      } else {
        console.log(data.message);
        dispatch(addContactBookFail(data.message));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

export const updateContactBook = (url, params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.put(url, params, true);
    console.log(data);

    if (data.data !== null) {
      console.log("thành công");
      dispatch(updateContactBookSuccess(data.data));
      history.goBack();
    } else {
      console.log("thất bại");
      console.log(data.message);
      dispatch(updateContactBookFail(data.message));
    }
  } catch (error) {
    // dispatch(updateContactBookFail(error.message));
    console.log(error.message);
  }
};

export const deleteContactBook = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.delete(url, true);
    dispatch(deleteContactBookSuccess(data));
  } catch (error) {
    dispatch(deleteContactBookFail(error.message));
    console.log(error.message);
  }
};
