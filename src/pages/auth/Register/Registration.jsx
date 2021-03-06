import React from "react";
import { Link } from "react-router-dom";
import "./register.css";
import useForm from "../../../hooks/useForm";
import ButtonPrimary from "../../../components/button/buttonPrimary/ButtonPrimary";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createUser } from "../../../services/actions/userAction";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingFull from "../../../components/loading/lodingFull/LoadingFull";
import { toast } from "react-toastify";
import apiStatus from "../../../services/utils/apiStatus";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { Helmet } from "react-helmet-async";

const Register = () => {
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, status } = useSelector((state) => state.user);
  const { values, errors, handleChange } = useForm();
  const [showPass, setShowPass] = useState(false);
  // actions
  const doRegister = (e) => {
    e.persist();
    e.preventDefault();
    if (isAllValid()) dispatch(createUser(values));
    else toast.warn("Data belum lengkap");
  };
  const isAllValid = () => {
    if (Object.keys(errors).length === 0) return false;
    return (
      errors.name === null && errors.password === null && errors.email === null
    );
  };
  useEffect(() => {
    if (status === apiStatus.success)
      navigate("/login", {
        state: {
          email: values.email,
          message: "Registrasi berhasil, silahkan login",
        },
      });
  }, [status]);
  return (
    <>
      <Helmet>
        <title>Seconhand. Daftar</title>
      </Helmet>
      <div className="Register">
        <div className="registerWraper">
          <div className="background-image flex-1 flex items-center">
            <span className="ml-20 font-bold text-white text-4xl">
              Second<br></br>Hand.
            </span>
          </div>
          <div className="form-register">
            <form
              className="form-form-register"
              onSubmit={doRegister}
              method="post"
            >
              <h1 className="text-2xl font-bold">Daftar</h1>
              {message && (
                <div
                  className={
                    status === apiStatus.error
                      ? "message bg-red-500"
                      : "message bg-green-600"
                  }
                >
                  {message}
                </div>
              )}
              <label>Nama</label>
              <input
                type="text"
                name="name"
                placeholder="Nama Lengkap"
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.name && <span className="error">{errors.name}</span>}
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
              <label>Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
                <div
                  className="absolute right-3 top-5"
                  onClick={() => setShowPass((prev) => !prev)}
                >
                  <FontAwesomeIcon icon={showPass ? faEye : faEyeSlash} />
                </div>
              </div>
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
              <ButtonPrimary className="w-full mt-5">Daftar</ButtonPrimary>
              <span className="flex justify-center mt-5">
                Sudah punya akun?
                <Link to="/login" className="ml-2 font-bold text-purple-700">
                  Masuk Disini
                </Link>
              </span>
            </form>
          </div>
        </div>
        {status === apiStatus.pending && <LoadingFull />}
      </div>
    </>
  );
};

export default Register;
