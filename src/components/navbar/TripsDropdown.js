import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { useTranslation } from "react-multi-lang";
import { useNavigate } from "react-router-dom";
import { GetTripCategories } from "../../redux/slices/TripsSlice";
import { FiChevronRight } from "react-icons/fi";
function TripsDropdown() {
  const t = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { loading, TripsCats } = useSelector((state) => state.exertrips);
  useEffect(() => {
    dispatch(GetTripCategories());
    return () => {};
  }, [dispatch]);

  return (
    <Dropdown
      className="navbar-dropdown"
      show={show}
      drop={"end"}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Dropdown.Toggle id="dropdown-trips" as="div" className="trips_toggle">
        <div className="trips-toggle-content">{t("Navbar.Trips")}</div>
      </Dropdown.Toggle>

      {/* Dropdown menu aligned based on current text direction */}
      <Dropdown.Menu className="trips_drop_menu">
        {TripsCats?.map((cat, index) => (
          <Dropdown.Item
            key={index}
            className="user-item trip-item"
            onClick={() => {
              setShow(false);
              navigate("/trips", {
                replace: true,
                state: { trip_types: [cat.id] },
              });
            }}
          >
            <FiChevronRight />
            {cat.type_name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default TripsDropdown;
