import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.request.use(
  function (config) {
    const baseUrl = "https://dummyjson.com/auth";
    const token = JSON.parse(localStorage.getItem("token"));
    if (config.headers.needAuth === true) {
      delete config.headers.needAuth;
      config.headers["Authorization"] = "Bearer " + token;
      config.url = baseUrl + config.url;
    } else if (config.headers.isLogin === true) {
      delete config.headers.isLogin;
      config.url = "https://dummyjson.com/auth" + config.url;
    } else if (config.headers.isRegister === true) {
      delete config.headers.isRegister;
      config.url = "https://dummyjson.com/auth" + config.url;
    } else {
      if (config.headers.changeUrl) {
        config.url = +baseUrl + config.url;
        delete config.headers.changeUrl;
      } else {
        config.url = "https://dummyjson.com/auth" + config.url;
      }
      // config.url = _default.api_base_url["2323"] + config.url;
    }
    return config;
  },
  function (error) {
    toast.error("ناموفق");
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    let result = "";
    //handle excel download reports
    if (
      res.config.responseType === "blob" &&
      res.headers["content-type"] === "application/vnd.ms-excel"
    ) {
      return res.data;
    }
    if (res.config.url.toLocaleUpperCase().includes("LOGIN")) {
      result = res.data;
    } else {
      // if (res.status === 500) {
      // 	Notification({
      // 		type: 'info',
      // 		title: res.errors,
      // 		Description: '',
      // 	})
      // } else {
      // 	if (res.status !== 200) {
      // 		Notification({
      // 			type: 'error',
      // 			title: res.debugMessage || res.errors,
      // 			Description: '',
      // 		})

      // 	}
      // }
      result = res.data;
    }
    return result;
  },
  (error) => {
    // setStore({mainLoading: false});
    if (error.message === "Network Error") {
      toast.error("لطفا اتصال اینترنت خود را بررسی کنید!");
    } else {
      if (error.response.status === 403) {
        // clear localStorage
        // localStorage.removeItem(_default.authTokenName);
        // window.location.href = _default.main_sign_url;
        // Notification({
        //   type: "success",
        //   Title: "با موفقیت انجام شد ",
        // });
        // setStore({auth: false});
      } else if (error.response.status === 500) {
        // clear localStorage
        toast.error(error.response.data.message || "عملیات ناموفق");
        // setStore({auth: false});
      } else if (error.response.status === 400) {
        // clear localStorage
        toast.error(error.response.data.message || "عملیات ناموفق");
        // setStore({auth: false});
      } else if (error.response.status === 401) {
        // clear localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("access-token");
        window.location.replace("/login");
        // setStore({auth: false});
      }
      // const expectedError =
      //   error.response &&
      //   error.response.status === 200 &&
      //   error.response.status === 400;
      // if (!expectedError) {
      //   console.log("err", error.status);
      //   if (error.response.status === 400) {
      //     const errorDataBody = JSON.parse(
      //       error.response.data.error_description
      //     );
      //     if (!errorDataBody.isSuccess) {
      //       errorDataBody.exceptions.map((row) => {
      //         Notification({
      //           type: "error",
      //           Title: row.exception.persianDescription,
      //           Description: "",
      //         });
      //       });
      //     }
      //   } else if (error.response.status === 401) {
      //     // clear localStorage
      //     localStorage.removeItem(_default.tokenName);
      //     // setStore({auth: false});
      //   } else if (error.response.status === 406) {
      //     Notification({
      //       type: "error",
      //       Title: error.response.data.debugMessage,
      //       Description: "",
      //     });
      //   } else if (error.response.status === 403) {
      //     Notification({
      //       type: "error",
      //       Title: error.response.data.debugMessage,
      //       Description: "",
      //     });
      //   } else {
      //     Notification({
      //       type: "error",
      //       Title: error.response.data.debugMessage,
      //       Description: "",
      //     });
      //   }
      // }
      // console.log(error.response);
      // if (error.response.status === 400) {
      //   Notification({
      //     type: "error",
      //     Title: error.response.data.errors[0],
      //     Description: "",
      //   });
      // }
    }

    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
