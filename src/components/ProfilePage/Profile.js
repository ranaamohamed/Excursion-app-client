import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import {
  saveProfile,
  fetchProfile,
  fetchProfileImage,
  uploadProfileImage,
} from "../../redux/slices/profileSlice";
import { MdOutlineCameraAlt } from "react-icons/md";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import DateTimePicker from "react-datetime-picker";
import LoadingPage from "../Loader/LoadingPage";
import { format } from "date-fns";
import "react-phone-input-2/lib/style.css";
import "./Profile.scss";
import ChangePassword from "./ChangePassword";

export default function Profile() {
  const t = useTranslation();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null); // Reference for hidden file input
  const [dateSel, onDateChange] = useState(new Date());
  // const currentLang =
  //   useSelector((state) => state.language.currentLang) || "en";
  const currentLang = localStorage.getItem("lang") || "de";
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({
    client_first_name: user?.firstName || "",
    client_last_name: user?.lastName || "",
    client_id: user?.id || "",
    client_name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
    client_email: user?.email || "",
    phone_number: user?.phoneNumber || null,
    address: null,
    nation: "",
    gender: "",
    profile_id: 0,
    lang: currentLang,
    pay_code: "",
    client_birthdayStr: null,
  });
  // Get state from Redux store
  const { profileData, profileImage, loading, error, success, message } =
    useSelector((state) => state.profile);
  // Fetch profile data  when component mounts
  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchProfileImage());
  }, [dispatch]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Initialize form data when profileData is loaded from Redux
  useEffect(() => {
    if (profileData && Object.keys(profileData).length > 0) {
      // Only update if data is different to prevent infinite loops
      if (JSON.stringify(profileData) !== JSON.stringify(form)) {
        setForm((prev) => ({
          ...prev,
          ...profileData,
          client_first_name:
            profileData?.client_first_name || user?.firstName || "",
          client_last_name: profileData?.client_last_name || user?.lastName,
          client_email: profileData?.client_email || user.email,
          phone_number: profileData?.phone_number || user.phoneNumber,
          client_name:
            profileData.client_name ||
            `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
          client_birthdayStr: profileData?.client_birthdayStr,
          dateSel: profileData?.client_birthdayStr,
          profile_id: profileData?.profile_id,
        }));
      }
    }
  }, [profileData]);
  const validate = () => {
    const newErrors = {};

    if (!form.client_name) newErrors.client_name = "Full name is required";
    if (!form.client_email) newErrors.client_email = "Email is required";
    else if (!/^[^\s@]+@gmail\.com$/.test(form.client_email))
      newErrors.client_email = "Please enter a valid Gmail address";

    if (!form.phone_number) newErrors.phone_number = t("profile.errorrs.Phone");
    if (!form.client_birthdayStr)
      newErrors.client_birthdayStr = t("profile.errorrs.DOP");
    if (!form.address) newErrors.address = t("profile.errorrs.address");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = validate();
    //const hasErrors = Object.keys(newErrors).length > 0;
    // const updatedFormData = {
    //   ...formData,
    //   // Ensure birthday components are properly formatted
    //   client_birthdayStr: `${
    //     birthdayComponents.year
    //   }-${birthdayComponents.month.padStart(
    //     2,
    //     "0"
    //   )}-${birthdayComponents.day.padStart(2, "0")}`,
    // };
    //form["client_birthdayStr"] = format(dateSel, "yyyy-MM-dd");
    if (hasErrors) {
      dispatch(saveProfile(form)).then((result) => {
        if (result.payload?.success == false) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: result?.payload?.errors,
          });
        } else {
          dispatch(fetchProfile());
        }
      });
    }
  };

  // Trigger file input click when camera icon is clicked
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  // Handle profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    //console.log("file ", file);
    if (!file) return;

    // Validate file type
    if (!file.type.match("image.*")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("profile.select_image_file"),
      });
      return;
    }

    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("profile.image_size_limit"),
      });
      return;
    }

    try {
      // Dispatch upload action and wait for completion
      await dispatch(uploadProfileImage(file)).unwrap();
      // Refresh the image from server after successful upload
      dispatch(fetchProfileImage());
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchProfileImage());
  }, [dispatch]);
  // Handle profile image upload

  return (
    <Container className="profile-container">
      <Card className="profile-card">
        <Card.Body>
          {/* Header */}
          <div className="profile-header">
            <div className="user-info">
              <div className="profile-picture">
                <div className="avatar-container">
                  <img
                    src={
                      profileImage?.url || // Newly uploaded images (local blob)
                      profileImage || // Fetched images (server URL)
                      "./images/profile.png" // Fallback
                    }
                    alt="Profile"
                    className="avatar-image"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop if default image fails
                      e.target.src = "./images/profile.png";
                    }}
                  />
                  {/* Hidden file input for image upload */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                  {/* Camera icon to trigger file input */}
                  <div className="camera">
                    <MdOutlineCameraAlt
                      className="camera-icon"
                      onClick={handleCameraClick}
                    />
                  </div>
                </div>
              </div>
              {/* <img
                src="https://via.placeholder.com/80"
                alt="avatar"
                className="avatar"
              /> */}
              <div>
                <h4>{form.client_name}</h4>
                <span className="email">{form.client_email}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{t("profile.firstName")}</Form.Label>
                  <Form.Control
                    type="text"
                    //placeholder={t("profile.firstName")}
                    value={form.client_first_name}
                    //onChange={handleChange}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{t("profile.lastName")}</Form.Label>
                  <Form.Control
                    type="text"
                    // placeholder={t("profile.lastName")}
                    value={form.client_last_name}
                    disabled
                    //onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t("profile.email")}</Form.Label>
                  <Form.Control
                    type="email"
                    name="client_email"
                    value={form.client_email}
                    //onChange={handleChange}

                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t("profile.dateOfBirth")}*</Form.Label>
                  <DateTimePicker
                    //onChange={onDateChange}\
                    onChange={(date) =>
                      setForm({
                        ...form,
                        client_birthdayStr: format(date, "yyyy-MM-dd"),
                      })
                    }
                    value={form.client_birthdayStr}
                    disableClock={true}
                    format="yyyy-MM-dd"
                    //required
                    //placeholder="Date"
                    dayPlaceholder="dd"
                    monthPlaceholder="mm"
                    yearPlaceholder="yyyy"
                    calendarIcon={null}
                    clearIcon={null}
                    inputProps={{ placeholder: "Choose a date" }}
                  />
                  {errors.client_birthdayStr && (
                    <div className="invalid-feedback d-block">
                      {errors.client_birthdayStr}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t("profile.phone")}*</Form.Label>
                  <PhoneInput
                    country={"eg"}
                    value={form.phone_number}
                    inputProps={{
                      name: "phone_number",
                      required: true,
                      // autoFocus: true,
                    }}
                    onChange={(phone) =>
                      setForm({ ...form, phone_number: phone })
                    }
                    inputClass={errors.phone_number ? "is-invalid" : ""}
                  />
                  {errors.phone_number && (
                    <div className="invalid-feedback d-block">
                      {errors.phone_number}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t("profile.gender")}</Form.Label>
                  <Form.Select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                  >
                    <option value="">{t("profile.genderPlaceH")}</option>
                    <option value="male">
                      {t("profile.genderOptions.male")}
                    </option>
                    <option value="female">
                      {t("profile.genderOptions.female")}
                    </option>
                    <option value="other">
                      {t("profile.genderOptions.other")}
                    </option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t("profile.nationality")}</Form.Label>
                  <Form.Control
                    name="nation"
                    placeholder={t("profile.nationalityPlaceH")}
                    value={form.nation}
                    onChange={handleChange}
                    // required
                  />
                  {/* <Form.Select
                    name="nation"
                    value={form.nation}
                    onChange={handleChange}
                  >
                    <option value="">{t("profile.nationalityPlaceH")}</option>
                    <option value="Egyptian">Egyptian</option>
                    <option value="American">American</option>
                    <option value="German">German</option>
                  </Form.Select> */}
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t("profile.address")}*</Form.Label>
                  <Form.Control
                    name="address"
                    placeholder={t("profile.AddressPlaceHolder")}
                    value={form.address}
                    onChange={handleChange}
                    // required
                  />
                  {errors.address && (
                    <div className="invalid-feedback d-block">
                      {errors.address}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end">
              <Button type="submit" className="blueBtn">
                {t("profile.save")}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <hr />
      <ChangePassword />
      {loading ? <LoadingPage /> : null}
    </Container>
  );
}
