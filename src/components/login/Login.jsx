import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activateAccount, formReset, login } from "../../services/auth-service";
import { useParams } from "react-router";
import "./login.css";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(history);
  const error = useSelector((state) => state.auth.error);
  console.log(error);

  const [username, setUsername] = useState("");
  console.log(username);
  const [password, setPassword] = useState("");

  let { code } = useParams();
  console.log(code);
  useEffect(() => {
    dispatch(formReset());
    if (code) {
      dispatch(activateAccount(code));
    }
  }, []);

  const onClickSignIn = (event) => {
    event.preventDefault();
    const userData = { username, password };
    console.log(userData);
    dispatch(login(userData, history));
  };
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src="images/img-01.png" alt="IMG" />
          </div>

          {/* {success ? <div className="alert alert-success col-6" role="alert">{success}</div> : null} */}
          <form
            onSubmit={onClickSignIn}
            className="login100-form validate-form"
          >
            <div className="wrap-input100">
              {error ? (
                <div className="error-message" role="alert">
                  {error}
                </div>
              ) : null}
            </div>
            <span className="login100-form-title">Đăng nhập tài khoản</span>

            <div className="wrap-input100">
              <input
                className="input100"
                type="text"
                name="username"
                minLength={1}
                maxLength={15}
                required="Vui lòng nhập tên đăng nhập"
                value={username}
                placeholder="Tên đăng nhập"
                onChange={(event) => setUsername(event.target.value)}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-user" aria-hidden="true"></i>
              </span>
            </div>
            <div className="wrap-input100 ">
              <input
                className="input100"
                minLength={6}
                maxLength={100}
                required="Vui lòng nhập password"
                type="password"
                name="password"
                value={password}
                placeholder="Mật khẩu"
                onChange={(event) => setPassword(event.target.value)}
              />
              <span classNam="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn" type="submit">
                Đăng nhập
              </button>
            </div>
            <div className="text-center p-t-50">
              <Link to={"/forgetPassword"}>
                Quên mật khẩu
                <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
