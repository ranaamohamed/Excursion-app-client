import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  InputGroup,
} from "react-bootstrap";
import { LoginUser, RegisterUser } from "../../redux/slices/authSlice";
import { useTranslation, getLanguage } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import GoogleLoginButton from "./googleLoginButton";
import parse from "html-react-parser";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoadingPage from "../Loader/LoadingPage";
import PopUp from "../Shared/popup/PopUp";
function AuthForm({ type, isAuthRedirect, redirectPath }) {
  const t = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorsLst, seterrorsLst] = useState({});
  const [validated, setvalidated] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("error");
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false,
  });
  const [formData, setformData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    ConfirmPassword: "",
    Role: "User",
    sendOffers: false,
  });
  const { loading, success, message } = useSelector((state) => state.auth);
  const validate = () => {
    if (!/^\S+@\S+\.\S+$/.test(formData.email) || formData.email.trim() == "") {
      seterrorsLst({
        ...errorsLst,
        email: t("Login.EmailError"),
      });
      return false;
    }

    if (formData.password.trim() == "" || formData.password.length < 6) {
      seterrorsLst({
        ...errorsLst,
        password: t("Login.PasswordError"),
      });

      return false;
    }
    if (!/[A-Z]/.test(formData.password)) {
      seterrorsLst({
        ...errorsLst,
        password: t("Login.passwordUpper"),
      });
      return false;
    }
    if (!/[!@#$%^&*]/.test(formData.password)) {
      seterrorsLst({
        ...errorsLst,
        password: t("Login.passwordSpecial"),
      });
      return false;
    }
    if (type == "register") {
      if (formData.FirstName == null || formData.FirstName.trim() == "") {
        seterrorsLst({
          ...errorsLst,
          firstname: t("Login.fillField"),
        });
        return false;
      }

      if (formData.LastName == null || formData.LastName.trim() == "") {
        seterrorsLst({
          ...errorsLst,
          lastname: t("Login.fillField"),
        });
        return false;
      }
      if (formData.ConfirmPassword !== formData.password) {
        seterrorsLst({
          ...errorsLst,
          ConfirmPassword: t("Login.ConfirmPasswordError"),
        });
        return false;
      }
    }

    return true;
  };
  const signin = (event) => {
    // let { isAuthRedirect, redirectPath } = props;
    console.log("isAuthRedirect ", isAuthRedirect);
    event.preventDefault();
    // validation
    if (validate()) {
      let lang = localStorage.getItem("lang") || "en";
      if (type == "login") {
        let data = {
          payload: {
            email: formData.email,
            password: formData.password,
            lang: lang,
          },
          path: "/LoginUser",
        };
        // dispatch(LoginUser(data));
        dispatch(LoginUser(data)).then((result) => {
          if (result.payload && result.payload.isSuccessed) {
            //if user login successfully so navigate to  home
            setShowPopup(false);
            if (result.payload.emailConfirmed == true) {
              // ✅ Get last page (if exists)
              const redirectTo =
                localStorage.getItem("redirect_after_login") || "/";
              console.log("redirectTo ", redirectTo);
              // 🧹 Remove it once used
              localStorage.removeItem("redirect_after_login");
              navigate(redirectTo);
              // if (isAuthRedirect) {
              //   navigate(redirectPath);
              // } else {
              //   navigate("/");
              // }
            } else {
              navigate("/verifyEmail", { replace: true, state: { path: "/" } });
            }
          } else {
            setPopupMessage(result.payload.message);
            setShowPopup(true);
          }
        });
      } else {
        formData["lang"] = lang;
        let data = { payload: formData, path: "/RegisterUser" };
        dispatch(RegisterUser(data)).then((result) => {
          if (result.payload && result.payload?.isSuccessed) {
            //if user register successfully so navigate to  verify email first
            setShowPopup(false);
            // navigate("/verifyEmail", {
            //   replace: true,
            //   state: { path: "/" },
            // });
            if (result.payload?.emailConfirmed == true) {
              // ✅ Get last page (if exists)
              const redirectTo =
                localStorage.getItem("redirect_after_login") || "/";

              // 🧹 Remove it once used
              localStorage.removeItem("redirect_after_login");
              navigate(redirectTo);
              // if (isAuthRedirect) {
              //   navigate(redirectPath);
              // } else {
              //   navigate("/");
              // }
            } else {
              navigate("/verifyEmail", { replace: true, state: { path: "/" } });
            }
          } else {
            setPopupMessage(result.payload.message);
            setShowPopup(true);
          }
        });
      }
    }
  };
  const fillFormData = (e) => {
    setvalidated(false);
    seterrorsLst({});
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  return (
    <div>
      {" "}
      <Form onSubmit={signin} noValidate>
        {type == "register" && (
          <Row>
            <Col lg={6} md={12} sm={12} xs={12}>
              <FloatingLabel label={t("Login.firstname")}>
                <Form.Control
                  type="text"
                  placeholder={t("Login.firstname")}
                  className="formInput"
                  required
                  name="FirstName"
                  onChange={fillFormData}
                />
                {errorsLst.firstname && (
                  <Form.Text type="invalid" className="errorTxt">
                    {errorsLst.firstname}
                  </Form.Text>
                )}
              </FloatingLabel>
            </Col>
            <Col lg={6} md={12} sm={12} xs={12}>
              <FloatingLabel label={t("Login.lastname")}>
                <Form.Control
                  type="text"
                  placeholder={t("Login.lastname")}
                  className="formInput"
                  required
                  name="LastName"
                  onChange={fillFormData}
                />
                {errorsLst.lastname && (
                  <Form.Text type="invalid" className="errorTxt">
                    {errorsLst.lastname}
                  </Form.Text>
                )}
              </FloatingLabel>
            </Col>
          </Row>
        )}
        <Row>
          <Col xs={12}>
            {" "}
            <FloatingLabel label={t("Login.email")}>
              <Form.Control
                type="email"
                placeholder={t("Login.email")}
                required
                name="email"
                className="formInput"
                onChange={fillFormData}
              />
              {errorsLst.email && (
                <Form.Text type="invalid" className="errorTxt">
                  {errorsLst.email}
                </Form.Text>
              )}
            </FloatingLabel>
          </Col>
        </Row>
        {type == "register" ? (
          <Row>
            <Col lg={6} md={12} sm={12} xs={12}>
              <InputGroup>
                <Form.Control
                  required
                  name="password"
                  type={showPasswords.new ? "text" : "password"}
                  placeholder={t("Login.password")}
                  value={formData.password}
                  onChange={fillFormData}
                  className="formInput"
                  isInvalid={errorsLst?.password != null}
                  isValid={errorsLst?.password == null}
                />
                {/* Password visibility toggle button */}
                <InputGroup.Text
                  onClick={() => togglePasswordVisibility("new")}
                  className="eye-button"
                >
                  {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
                {/* Error message display */}
                <Form.Control.Feedback type="invalid">
                  {errorsLst.password}
                </Form.Control.Feedback>
              </InputGroup>
              {/* <FloatingLabel label={t("Login.password")}>
                <Form.Control
                  type="password"
                  placeholder={t("Login.password")}
                  required
                  name="password"
                  className="formInput"
                  minLength={6}
                  onChange={fillFormData}
                />
                {errorsLst.password && (
                  <Form.Text type="invalid" className="errorTxt">
                    {errorsLst.password}
                  </Form.Text>
                )}
              </FloatingLabel> */}
            </Col>
            <Col lg={6} md={12} sm={12} xs={12}>
              {/* <FloatingLabel label={t("Login.confirmPassword")}> */}
              {/* <Form.Control
                  required
                  type="password"
                  placeholder={t("Login.confirmPassword")}
                  name="ConfirmPassword"
                  className="formInput"
                  minLength={6}
                  onChange={fillFormData}
                /> */}
              <InputGroup>
                <Form.Control
                  required
                  type={showPasswords.confirm ? "text" : "password"}
                  placeholder={t("Login.confirmPassword")}
                  value={formData.ConfirmPassword}
                  onChange={fillFormData}
                  name="ConfirmPassword"
                  className="formInput"
                  isInvalid={errorsLst?.ConfirmPassword != null}
                  isValid={errorsLst?.ConfirmPassword == null}
                />
                {/* Password visibility toggle button */}
                <InputGroup.Text
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="eye-button"
                >
                  {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
                {/* Error message display */}
                <Form.Control.Feedback type="invalid">
                  {errorsLst.ConfirmPassword}
                </Form.Control.Feedback>
              </InputGroup>
              {/* {errorsLst.ConfirmPassword && (
                  <Form.Text className="errorTxt">
                    {errorsLst.ConfirmPassword}
                  </Form.Text>
                )} */}
              {/* </FloatingLabel> */}
            </Col>
          </Row>
        ) : (
          <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
              <FloatingLabel label={t("Login.password")}>
                <Form.Control
                  type="password"
                  placeholder={t("Login.password")}
                  required
                  name="password"
                  className="formInput"
                  minLength={6}
                  onChange={fillFormData}
                />
                {errorsLst.password && (
                  <Form.Text type="invalid" className="errorTxt">
                    {errorsLst.password}
                  </Form.Text>
                )}
              </FloatingLabel>
            </Col>
          </Row>
        )}
        <Button type="submit" className="frmBtn blueBtn FullWidthBtn">
          {type == "login" ? t("Login.signIn") : t("Login.CreateAccount")}
        </Button>
      </Form>
      <p className="formText">{parse(t("Login.PrivacyText"))}</p>
      {type == "register" && (
        <Form.Check
          type="checkbox"
          name="sendOffers"
          //onChange={fillFormData}
          checked={formData.sendOffers}
          onChange={(e) => {
            setformData({
              ...formData,
              sendOffers: e.target.checked,
            });
          }}
          label={<span>{parse(t("Login.LoginCheckBoxTitle"))}</span>}
        />
      )}
      <p className="formText">
        <strong>{t("Login.Or")}</strong>
      </p>
      <GoogleLoginButton
        login={type == "login" ? true : false}
        sendOffers={formData.sendOffers}
        // isAuthRedirect={props.isAuthRedirect}
        // redirectPath={props.redirectPath}
      />
      {loading && <LoadingPage />}
      {/* Error Popup */}
      {showPopup && (
        <PopUp
          show={showPopup}
          closeAlert={() => setShowPopup(false)}
          msg={popupMessage}
          type={popupType}
          showConfirmButton={true}
        />
      )}
    </div>
  );
}

export default AuthForm;
