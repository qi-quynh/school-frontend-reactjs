import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "../login/login.css";
import { forgetPassword } from "../../services/auth-service";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(history);

  const [username, setUsername] = useState("");
  console.log(username);
  const [password, setPassword] = useState("");

  let { code } = useParams();
  console.log(code);

  const onClickSignIn = (event) => {
    event.preventDefault();
    const params = { username };
    dispatch(forgetPassword(params, history));
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
            <div className="wrap-input100"></div>
            <span className="login100-form-title">Quên mật khẩu</span>

            <div className="wrap-input100">
              <input
                className="input100"
                type="text"
                name="username"
                minLength={6}
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

            <div className="container-login100-form-btn">
              <button className="login100-form-btn" type="submit">
                Xác nhận
              </button>
            </div>
            <div className="text-center p-t-50">
              <Link to={"/"}>
                Quay về trang chủ
                <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ForgetPassword;
