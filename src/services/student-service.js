import requestService from "./request-service";
import {
  fetchStudentSuccess,
  fetchStudentFail,
  getStudentSuccess,
  getStudentFail,
  resetStudentSuccess,
  resetStudentFail,
  addStudentSuccess,
  addStudentFail,
  updateStudentSuccess,
  updateStudentFail,
  deleteStudentSuccess,
  deleteStudentFail,
} from "../actions/student-actions";

export const getAllStudent = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.get(url, true);
    if (data.status === "OK") {
      console.log("thành công");
      dispatch(fetchStudentSuccess(data.data));
      console.log(data);
    } else {
      dispatch(fetchStudentFail("Không có dữ liệu"));
    }
  } catch (error) {
    dispatch(fetchStudentFail(error.message));
    console.log(error.message);
  }
};

export const getStudentById = (url) => async (dispatch) => {
  try {
    const { data } = await requestService.get(url, true);
    if (data.status === "OK") {
      dispatch(getStudentSuccess(data.data[0]));
    }
  } catch (error) {
    dispatch(getStudentFail(error.message));
    console.log(error.message);
  }
};

export const getStudentByClassId = (id) => async (dispatch) => {
  try {
    const { data } = await requestService.get(`/student?classId=${id}`, true);
    console.log(data);
    if (data.status === "OK") dispatch(fetchStudentSuccess(data.data));
  } catch (error) {
    // dispatch(fetchStudentFail(error.message));
  }
};

export const getStudentBySearch = (search) => async (dispatch) => {
  try {
    const { data } = await requestService.get(`/student?id=${search}`, true);
    console.log(data);
    if (data.status === "OK") dispatch(fetchStudentSuccess(data.data));
  } catch (error) {
    // dispatch(fetchStudentFail(error.message));
  }
};

export const transferClass = (url, params, history) => async (dispatch) => {
  try {
    const { data } = await requestService.put(
      `${url}/transfer-class?oldClass=${params.oldClass}&newClass=${params.newClass}`,
      params,
      true
    );
    if (data.status === "OK") {
      console.log("thành công");
      dispatch(fetchStudentSuccess(data.data));
      history.goBack();
    }
  } catch (error) {
    console.log(error);
  }
};

export const getStudentByTeacherId = (id) => async (dispatch) => {
  try {
    const { data } = await requestService.get(`/student?teacherId=${id}`, true);
    //console.log(data);

    dispatch(fetchStudentSuccess(data.data));
  } catch (error) {
    // dispatch(fetchStudentFail(error.message));
  }
};

export const resetStudent = () => async (dispatch) => {
  try {
    dispatch(resetStudentSuccess());
  } catch (error) {
    dispatch(resetStudentFail(error.message));
    console.log(error.message);
  }
};

export const addStudent = (url, params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.post(url, params, true);

    if (data.status === "OK") {
      dispatch(addStudentSuccess(data.data));
      console.log(data);
      history.goBack();
    } else {
      dispatch(addStudentFail(data.message));
      console.log(data.message);
    }
  } catch (error) {
    //dispatch(addStudentFail(error.message));
    console.log(error.message);
  }
};

export const updateStudent = (url, params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.put(url, params, true);
    console.log(data);
    if (data.status === "OK") {
      dispatch(updateStudentSuccess(data.data));
      history.goBack();
    } else {
      console.log("update học sinh thất bại");
      dispatch(updateStudentFail(data.message));
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const changePassword = (url, params, history) => async (dispatch) => {
  console.log(params);
  try {
    const { data } = await requestService.put(url, params, true);
    console.log(data);
    if (data.status === "OK") {
      dispatch(updateStudentSuccess(data));
      history.push("/student");
    } else {
      console.log("đổi mật khẩu không thành công");
      dispatch(updateStudentFail(data.message));
    }
  } catch (error) {
    console.log(error.message);
  }
};

// export const deleteStudent = (id) => async (dispatch) => {
//     try {
//       console.log(id);
//       const { data } = await requestService.delete(`/student?id=${id}`, true);

//       if(data.status ==="OK")
//       {
//         console.log("thành công");
//         dispatch(deleteStudentSuccess(data.data));
//       }
//       else
//       {
//         console.log("không thành công");
//         dispatch(deleteStudentFail(data.message));
//       }

//     } catch (error) {
//       dispatch(deleteStudentFail(error.message));
//       console.log(error.message);
//     }
// };
