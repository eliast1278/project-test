import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Styles from "./index.module.css";
import { password_login } from "./services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation } from "wouter";
import * as yup from "yup";
function Index() {
  const [location, setLocation] = useLocation();
  function set_token(token) {
    localStorage.setItem("token", JSON.stringify(token));
  }
  const schema = yup
    .object({
      username: yup.string().required(),
      password: yup.string().required(),
    })
    .required();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const passwordLogin = (data) => {
    password_login(data).then((res) => {
      toast.success("successs");
      set_token(res.token);
      setLocation("/dashboard");
    });
  };
  return (
    <div className={Styles["c-mainContainer"]}>
      <div className="container d-flex justify-content-center ">
        <div className={`${Styles["c-registerInner"]} px-5 `}>
          <div>
            <h3>Login</h3>
          </div>
          <form onSubmit={handleSubmit((data) => passwordLogin(data))}>
            <div className="">
              <div className="form-group text-start mb-3">
                <label htmlFor="">UserName</label>
                <input
                  type="text"
                  className="form-control"
                  name=""
                  id=""
                  placeholder=""
                  {...register("username")}
                />
              </div>
            </div>
            <div className="">
              <div className="form-group text-start mb-3">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name=""
                  id=""
                  placeholder=""
                  {...register("password")}
                />
              </div>
            </div>
            <div className="w-100 text-start  ">
              <button type="submit" className="btn btn-primary mt-5">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Index;
