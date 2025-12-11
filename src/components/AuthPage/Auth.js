import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import AuthForm from "./AuthForm";
import { useTranslation, getLanguage } from "react-multi-lang";
import LoadingPage from "../Loader/LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import "./Auth.scss";
function Auth({ isAuthRedirect, redirectPath }) {
  const t = useTranslation();
  const dispatch = useDispatch();
  const [type, setType] = useState("login");
  return (
    <Container>
      <section className="auth_section d-flex justify-content-between align-items-center">
        {/* <Container> */}
        {/* <Row>
          <Col md={6} xs={12}> */}
        <div className="auth_form">
          <AuthForm
            type={type}
            isAuthRedirect={isAuthRedirect}
            redirectPath={redirectPath}
          />
        </div>
        {/* </Col>
          <Col md={6} xs={12}> */}
        <div className="auth_info">
          {" "}
          <div className="form_title">
            <div>
              <h4 className="title">
                {" "}
                {type == "login"
                  ? t("Login.LoginTitle")
                  : t("Login.SignUpTitle")}
              </h4>
            </div>
            <div>
              {type == "login" ? (
                <p className="form_option">
                  {t("Login.DontHaveAccount")}
                  <button
                    className="form_option_btn"
                    onClick={() => {
                      setType("register");
                    }}
                  >
                    <a>{t("Login.CreateAccount")}</a>
                  </button>
                </p>
              ) : (
                <p className="form_option">
                  {t("Login.HaveAccount")}
                  <button
                    className="form_option_btn"
                    onClick={() => {
                      setType("login");
                    }}
                  >
                    <a>{t("Login.signIn")}</a>
                  </button>
                </p>
              )}
            </div>
          </div>
          <p className="SubTitle">{t("Login.LoginSubTitle")}</p>
        </div>
        {/* </Col>
        </Row> */}
        {/* </Container> */}
      </section>
    </Container>
  );
}

export default Auth;
