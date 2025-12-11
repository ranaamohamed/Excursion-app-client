import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/main.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { setDefaultTranslations, setDefaultLanguage } from "react-multi-lang";
import store from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import en from "./translations/en.json";
import de from "./translations/de.json";
import ScrollToTop from "./components/Shared/ScrollToTop";
import { BrowserRouter, Routes, Route } from "react-router-dom";
setDefaultTranslations({ en, de });
setDefaultLanguage("en");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
