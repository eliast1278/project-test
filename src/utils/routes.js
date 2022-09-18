import { lazy } from "react";
const Login = lazy(() => import("../pages/login"));
const Dashboard = lazy(() => import("../pages/dashboard"));
export const privateRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
];

export const publicRoutes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: Login,
  },
];
