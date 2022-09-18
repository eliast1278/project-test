import React, { Suspense } from "react";
import { Route } from "wouter";

function publicRoute(props) {
  return (
    <div>
      <Suspense>
        <Route path={props.path} component={props.component} />
      </Suspense>
    </div>
  );
}

export default publicRoute;
