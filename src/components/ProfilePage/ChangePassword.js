import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, InputGroup, Card } from "react-bootstrap";
import { FaEye, FaEyeSlash, FaInfo, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  changePassword,
  clearAuthState,
  logout,
} from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../Loader/LoadingPage";
import { FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useTranslation } from "react-multi-lang";
import "./ChangePassword.scss";
const PasswordInput = ({
  placeholder,
  value,
  onChange,
  showPassword,
  onToggleVisibility,
  error,
}) => (
  <InputGroup>
    <Form.Control
      type={showPassword ? "text" : "password"}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="password-input"
      isInvalid={error?.length > 0}
      isValid={error?.length == 0}
    />
    {/* Password visibility toggle button */}
    <InputGroup.Text onClick={onToggleVisibility} className="eye-button">
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </InputGroup.Text>
    {/* Error message display */}
    <Form.Control.Feedback type="invalid">
      {error?.join(" | ")}
    </Form.Control.Feedback>
  </InputGroup>
  // <div className="password-input-wrapper">
  //   <Form.Control
  //     type={showPassword ? "text" : "password"}
  //     placeholder={placeholder}
  //     value={value}
  //     onChange={(e) => onChange(e.target.value)}
  //     className="password-input"
  //     isInvalid={!!error}
  //   />

  //   <Button
  //     variant="link"
  //     className="password-toggle-btn"
  //     onClick={onToggleVisibility}
  //   >
  //     {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
  //   </Button>

  // </div>
);

const ChangePassword = () => {
  const t = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success, message } = useSelector(
    (state) => state.auth
  );
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [formErrors, setFormErrors] = useState({});
  const [popupIcon, setPopupIcon] = useState(null);
  // Form state management
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handlePasswordInputChange = (field, value) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
    // validate live while typing
    if (field === "newPassword") {
      setFormErrors((prev) => ({
        ...prev,
        newPassword: validatePassword(value),
        confirmPassword:
          passwordData.confirmPassword && passwordData.confirmPassword !== value
            ? [t("profile.password.errors.passwordsDontMatch")]
            : [],
      }));
    } else if (field === "confirmPassword") {
      setFormErrors((prev) => ({
        ...prev,
        confirmPassword:
          value !== passwordData.newPassword
            ? [t("profile.password.errors.passwordsDontMatch")]
            : [],
      }));
    } else if (field === "oldPassword") {
      setFormErrors((prev) => ({
        ...prev,
        oldPassword: validatePassword(value),
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Form validation function
  const validateForm = () => {
    const errors = {};

    // Validate old password
    if (!passwordData?.oldPassword) {
      errors.oldPassword = t("profile.password.errors.oldPasswordRequired");
    }

    // Validate new password
    if (!passwordData?.newPassword) {
      errors.newPassword = t("profile.password.errors.newPasswordRequired");
    } else if (passwordData?.newPassword.length < 8) {
      errors.newPassword = t("profile.password.errors.passwordLength");
    }

    // Validate password confirmation
    else if (!passwordData?.confirmPassword) {
      errors.confirmPassword = t(
        "profile.password.errors.confirmPasswordRequired"
      );
    } else if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      errors.confirmPassword = t("profile.password.errors.passwordsDontMatch");
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  const validatePassword = (password) => {
    const errors = [];

    if (!password) {
      errors.push(t("profile.password.errors.PasswordIsRequired"));
    }
    if (password.length < 8) {
      errors.push(t("profile.password.errors.passwordLength"));
    }
    if (!/[A-Z]/.test(password)) {
      errors.push(t("profile.password.errors.passwordUpper"));
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push(t("profile.password.errors.passwordSpecial"));
    }

    return errors;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setFormErrors({});
    dispatch(clearAuthState());

    // Validate before submission
    // if (!validateForm()) {
    //   return;
    // }
    const newErrors = {
      oldPassword: validatePassword(passwordData.oldPassword),
      newPassword: validatePassword(passwordData.newPassword),
      confirmPassword:
        passwordData.confirmPassword !== passwordData.newPassword
          ? [t("profile.password.errors.passwordsDontMatch")]
          : [],
    };

    setFormErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      (fieldErrors) => fieldErrors.length > 0
    );

    // Check if user ID exists
    if (!userId) {
      // setPopupMessage(t("profile.password.errors.userIdNotFound"));
      // setPopupIcon(<FaTimesCircle className="error-icon" size={24} />);
      // setShowPopup(true);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("profile.password.errors.userIdNotFound"),
      });
      return;
    }

    // Dispatch password change action
    if (!hasErrors) {
      dispatch(
        changePassword({
          userId,
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
          confirmNewPassword: passwordData.confirmPassword,
        })
      ).then((result) => {
        if (result.payload !== null && result.payload?.isSuccessed == true) {
          //dispatch(logout());
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          // You might want to redirect or refresh the page here
          window.location.href = "/";
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: result.payload?.message,
          });
        }
      });
    }
  };
  return (
    <>
      <Card className="password-card">
        <Card.Body>
          <Row>
            <Col md={4} xs={12}>
              <div className="header_title_left">
                <h2 className="fw-bold">{t("profile.password.title")}</h2>
              </div>
            </Col>
          </Row>
          {/* <h3>{t("profile.password.title")}</h3> */}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <PasswordInput
                    placeholder={t("profile.password.oldPassword")}
                    value={passwordData.oldPassword}
                    onChange={(value) =>
                      handlePasswordInputChange("oldPassword", value)
                    }
                    showPassword={showPasswords.old}
                    onToggleVisibility={() => togglePasswordVisibility("old")}
                    error={formErrors.oldPassword} // Show error state
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <PasswordInput
                    placeholder={t("profile.password.newPassword")}
                    value={passwordData.newPassword}
                    onChange={(value) =>
                      handlePasswordInputChange("newPassword", value)
                    }
                    showPassword={showPasswords.new}
                    onToggleVisibility={() => togglePasswordVisibility("new")}
                    error={formErrors.newPassword}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <PasswordInput
                    placeholder={t("profile.password.confirmPassword")}
                    value={passwordData.confirmPassword}
                    onChange={(value) =>
                      handlePasswordInputChange("confirmPassword", value)
                    }
                    showPassword={showPasswords.confirm}
                    onToggleVisibility={() =>
                      togglePasswordVisibility("confirm")
                    }
                    error={formErrors.confirmPassword}
                  />
                </Form.Group>
                {/* <p className="form_info">
              <FaInfoCircle />
              {t("profile.password.passwordRules")}
            </p> */}
                <div className="text-end">
                  <Button type="submit" className="blueBtn">
                    {t("profile.password.resetPassword")}
                  </Button>
                </div>
                {/* <Button className="primaryBtn" type="submit">
                  {t("profile.password.resetPassword")}
                </Button> */}
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      {loading && <LoadingPage />}
    </>
  );
};

export default ChangePassword;
