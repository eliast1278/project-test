import PrivateRoute from "./components/privateRoute";
import PublicRoute from "./components/publicRoute";
import { Switch } from "wouter";
import "react-toastify/dist/ReactToastify.css";
import { privateRoutes, publicRoutes } from "./utils/routes";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="App">
      <Switch>
        {privateRoutes.map((route, index) => {
          return (
            <PrivateRoute
              key={index}
              path={route.path}
              component={route.component}
            />
          );
        })}
        {publicRoutes.map((route, index) => {
          return (
            <PublicRoute
              key={index}
              path={route.path}
              component={route.component}
            />
          );
        })}
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App;
