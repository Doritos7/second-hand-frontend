import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import { authUser, setUserData } from "../../../services/actions/userAction";
import { parseJwt, saveLocalJWT } from "../../../services/utils/jwtHandler";
import "./login.css";
const Login = () => {
  const dispatch = useDispatch();
  const { values, errors, handleChange } = useForm();
  const { token, message, success, pending, error } = useSelector(
    (state) => state.user
  );
  const isAllValid = () => {
    if (Object.keys(values).length === 0) return false;
    return errors.email === null && errors.password === null;
  };
  const doLogin = (e) => {
    e.preventDefault();
    if (isAllValid()) dispatch(authUser(values));
  };
  useEffect(() => {
    if (success) {
      saveLocalJWT(token);
      const user = parseJwt(token);
      dispatch(setUserData(user));
    }
  }, [success]);
  return (
    <div className="Login">
      <div className="loginWrapper">
        <div className="background-image flex-1 flex items-center">
          <span className="ml-20 font-bold text-white text-4xl">
            Second<br></br>Hand.
          </span>
        </div>
        <div className="form-login flex-1 flex items-center justify-center">
          <form className="form-form-login" onSubmit={doLogin} method="post">
            <h1 className="text-2xl font-bold">Masuk</h1>
            {message && (
              <div
                className={
                  error ? "message bg-red-500" : "message bg-green-600"
                }
              >
                {message}
              </div>
            )}
            <label className="block font-regular mt-5 text-xs">Email</label>
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
            <label className="block mt-3 font-regular text-xs">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
            <button className="button button-primary bg-purple-400 text-white w-full py-3 rounded-xl mt-7">
              Masuk
            </button>
            <span className="flex justify-center mt-5">
              Belum punya akun?
              <Link to="/register" className="ml-2 font-bold text-purple-700">
                Daftar Disini
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
