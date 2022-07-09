import RequestService from "../services/request-service";

import {
  activateAccountFailure,
  activateAccountSuccess,
  forgotPasswordFailure,
  forgotPasswordSuccess,
  loginFailure,
  loginSuccess,
  logoutSuccess,
  registerFailure,
  registerSuccess,
  resetPasswordCodeFailure,
  resetPasswordCodeSuccess,
  resetPasswordFailure,
  resetPasswordSuccess,
  showLoader,
} from "../actions/auth-actions";

import { reset } from "../actions/admin-actions";

export const login = (userData, history) => async (dispatch) => {
  try {
    const response = await RequestService.post("/login", userData);
    console.log(response);
    if (response.data.status === "OK") {
      localStorage.setItem("username", response.data.data.username);
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("role", response.data.data.roleId);
      localStorage.setItem("roleName", response.data.data.roleName);
      localStorage.setItem("name", response.data.data.name);
      localStorage.setItem("schoolName", response.data.data.schoolName);
      localStorage.setItem("isLoggedIn", true);
      console.log(localStorage);

      dispatch(loginSuccess(response.data.data.roleId));

      if (response.data.data.roleId === "ADMIN") history.push("/admin");
      else if (response.data.data.roleId === "MANAGER")
        history.push("/manager");
      else if (response.data.data.roleId === "TEACHER")
        history.push("/teacher");
      else if (response.data.data.roleId === "STUDENT")
        history.push("/student");
      else if (response.data.data.roleId === "FAMILY") history.push("/family");
      else history.push("/");
    } else {
      dispatch(loginFailure(response.data.message));
    }
  } catch (error) {
    console.log(error);
    //dispatch(loginFailure(error.response.data));
  }
};

export const registration = (userRegistrationData) => async (dispatch) => {
  try {
    dispatch(showLoader());
    await RequestService.post("/registration", userRegistrationData);
    dispatch(registerSuccess());
  } catch (error) {
    dispatch(registerFailure(error.response.data));
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("roleName");
  localStorage.removeItem("name");
  localStorage.removeItem("schoolName");
  localStorage.setItem("isLoggedIn", false);
  console.log("authentication service");

  dispatch(logoutSuccess());
  //history.push("/")
};

export const forgetPassword = (params, history) => async (dispatch) => {
  try {
    const { data } = await RequestService.put(
      `/send-forgot-password`,
      params,
      true
    );
    history.push("/");
  } catch (error) {
    console.log(error.message);
  }
};
export const activateAccount = (code) => async (dispatch) => {
  try {
    const response = await RequestService.get("/registration/activate/" + code);
    dispatch(activateAccountSuccess(response.data));
  } catch (error) {
    dispatch(activateAccountFailure(error.response.data));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(showLoader());
    const response = await RequestService.post("/auth/forgot", email);
    dispatch(forgotPasswordSuccess(response.data));
  } catch (error) {
    dispatch(forgotPasswordFailure(error.response.data));
  }
};

export const fetchResetPasswordCode = (code) => async (dispatch) => {
  try {
    const response = await RequestService.get("/auth/reset/" + code);
    dispatch(resetPasswordCodeSuccess(response.data));
  } catch (error) {
    dispatch(resetPasswordCodeFailure(error.response.data));
  }
};

export const resetPassword = (data, history) => async (dispatch) => {
  try {
    const response = await RequestService.post("/auth/reset", data);
    dispatch(resetPasswordSuccess(response.data));
    history.push("/login");
  } catch (error) {
    dispatch(resetPasswordFailure(error.response.data));
  }
};

export const formReset = () => async (dispatch) => {
  dispatch(reset());
};
