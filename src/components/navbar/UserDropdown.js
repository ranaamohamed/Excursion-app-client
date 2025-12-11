import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { CiGlobe } from "react-icons/ci";
import { useTranslation, setLanguage, getLanguage } from "react-multi-lang";
import { useNavigate } from "react-router-dom";
import { GetMyUser } from "../../helper/helperFN";
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import "./NavbarDropdown.scss";
function UserDropdown() {
  const t = useTranslation();
  const navigate = useNavigate();
  const [MyName, setMyName] = useState(GetMyUser);
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // navigate("/");
    window.location.href = "/";
  };
  return (
    <Dropdown className="navbar-dropdown">
      <Dropdown.Toggle id="dropdown-user">
        <div className="language-toggle-content">
          <FiUser className="icon" />
          {/* {MyName} */}
        </div>
      </Dropdown.Toggle>

      {/* Dropdown menu aligned based on current text direction */}
      <Dropdown.Menu>
        {MyName ? (
          <>
            <Dropdown.Item className="user-item">{MyName}</Dropdown.Item>
            <hr />
            <Dropdown.Item className="user-item">
              <FiUser className="dropdown-icon" /> {t("Navbar.MyProfile")}
            </Dropdown.Item>
            <hr />
            <Dropdown.Item onClick={logOut} className="user-item">
              <FiLogOut className="dropdown-icon" /> {t("Navbar.LogOut")}
            </Dropdown.Item>
          </>
        ) : (
          <Dropdown.Item
            className="user-item"
            onClick={() => navigate("/auth")}
          >
            {" "}
            <FiLogIn className="dropdown-icon" /> {t("Navbar.LoginOrSignUp")}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropdown;
