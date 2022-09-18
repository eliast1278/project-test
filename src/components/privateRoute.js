import React, { Suspense, useState } from "react";
import { Redirect, Route } from "wouter";
import Styles from "./index.module.css";

function privateRoute(props) {
  const get_token = () => {
    let token = localStorage.getItem("token");
    return JSON.parse(token);
  };
  const hasToken = get_token();
  return (
    <>
      {hasToken ? (
        <div>
          <Suspense>
            <Route path={props.path} component={props.component} />
          </Suspense>
        </div>
      ) : (
        <Redirect to={"/login"} />
      )}
    </>
  );
}

export default privateRoute;
