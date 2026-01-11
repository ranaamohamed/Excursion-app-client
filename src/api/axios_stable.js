// src/api/axios.js
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { navigate } from "../helper/navigate";
import Swal from "sweetalert2";
import { getLanguage } from "react-multi-lang";
const BASE_URL = process.env.REACT_APP_API_URL;

// create instance
const api = axios.create({
  baseURL: BASE_URL,
});

function getToken() {
  const token = localStorage.getItem("token");
  if (!token || token === "undefined" || token === "null") return null;
  return token;
}

function getLang() {
  const lang = localStorage.getItem("lang") || getLanguage();
  if (!lang || lang === "undefined" || lang === "null") return null;
  return lang;
}
let showingLoginAlert = false; // prevent showing multiple alerts
// 🟢 Request Interceptor — safely attach token if exists
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    // if (token) {
    console.log("config.skipAuth ", config.skipAuth);

    console.log("token ", token);

    if (config.skipAuth) {
      config.headers["Content-Type"] = "application/json";
    }
    // ✅ Only attach token if `config.skipAuth` is NOT true
    if (!config.skipAuth && token) {
      console.log("request 1 ");
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }
    // 🚫 If request requires auth but token is missing, show alert
    if (!config.skipAuth && !token && !showingLoginAlert) {
      console.log("request 2 ");
      showingLoginAlert = true;
      localStorage.setItem("redirect_after_login", window.location.pathname);
      // 🧠 Show popup for user to log in first
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must log in to continue.",
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#015FC9",
        allowOutsideClick: false,
      }).then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        //window.location.href = "/auth";
        showingLoginAlert = false;
        setTimeout(() => {
          window.location.href = "/auth";
        }, 100);
      });
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Add response interceptor
// let showingLoginAlert = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("🚨 AXIOS INTERCEPTOR CAUGHT ERROR:", error);

    if (!error.response) {
      console.error("Network error or server not reachable");
      return Promise.reject(error);
    }

    // 🔒 Handle unauthorized
    if (error.response?.status === 401 && !showingLoginAlert) {
      showingLoginAlert = true;

      // Run alert & redirect in background (no await!)
      (async () => {
        localStorage.setItem("redirect_after_login", window.location.pathname);

        await Swal.fire({
          icon: "info",
          title: "Session Expired",
          text: "Your login session has expired. Please log in again.",
          confirmButtonText: "Login Now",
          confirmButtonColor: "#015FC9",
          allowOutsideClick: false,
        });

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/auth";
        showingLoginAlert = false;
      })();

      // 🔥 Immediately reject for Redux (non-blocking)
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     console.log("🚨 AXIOS INTERCEPTOR CAUGHT ERROR:", error);
//     //console.log("showingLoginAlert", showingLoginAlert);

//     // api.interceptors.response.use(
//     //   (response) => response,
//     //   async (error) => {
//     // console.log("response errro ", error);
//     if (!error.response) {
//       console.log("fire error response");
//       console.error("Network error or server not reachable");
//       return Promise.reject(error);
//     }

//     if (error.response?.status === 401 && !showingLoginAlert) {
//       console.log("fire login redirect");
//       showingLoginAlert = true;
//       localStorage.setItem("redirect_after_login", window.location.pathname);
//       const rejection = Promise.reject(error);
//       await Swal.fire({
//         icon: "info",
//         title: "Session Expired",
//         text: "Your login session has expired. Please log in again.",
//         confirmButtonText: "Login Now",
//         allowOutsideClick: false,
//       });

//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       // navigate("/auth");
//       // window.location.href = "/auth";
//       // showingLoginAlert = false;
//       // return Promise.reject(error);
//       // ✅ Reject first (so Redux catch triggers)
//       // const rejection = Promise.reject(error);

//       // ✅ Create rejection promise FIRST

//       // ✅ Delay redirect until after Redux catch executes
//       setTimeout(() => {
//         window.location.href = "/auth";
//         showingLoginAlert = false;
//       }, 300); // small delay lets Redux handle rejection

//       return rejection;
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
