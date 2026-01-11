import React, { useEffect, useState, useRef } from "react";
import { useTranslation, getLanguage } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import { GetPickupsForTrip } from "../../../redux/slices/TripsSlice";
import { Form, Dropdown, Spinner, Button } from "react-bootstrap";
import { FiMapPin } from "react-icons/fi";
import PickupLocation from "./PickupLocation";
function TripPickupList({ trip_id, onLocationSelect }) {
  const dispatch = useDispatch();
  const t = useTranslation();
  const wrapperRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const { loading, error, success, TripPickups } = useSelector(
    (state) => state.exertrips
  );
  useEffect(() => {
    const formData = {
      trip_id: trip_id,
      trip_type: 1,
      lang_code: localStorage.getItem("lang") || getLanguage(),
    };
    dispatch(GetPickupsForTrip(formData));
    return () => {};
  }, [trip_id]);
  // Filter options when search changes
  useEffect(() => {
    if (search.trim() === "") {
      setFiltered(TripPickups);
    } else {
      setFiltered(
        TripPickups.filter((opt) =>
          opt?.pickup_name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, TripPickups]);
  // Handle selection
  const handleSelect = (item) => {
    setSelected(item);
    //console.log("itemmm ", item);
    const lat = item.pickup_lat;
    const lng = item.pickup_long;
    const label = item.pickup_name;
    setSelectedLocation({ lat, lng, label });
    onLocationSelect({ lat, lng, label });
    setShow(false);
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  //console.log("selected", selectedLocation);
  return (
    <div className="search-select" ref={wrapperRef}>
      <Form.Label className="formLabel">{t("Booking.Pickup")}</Form.Label>
      <Form.Control
        type="text"
        placeholder={selectedLocation ? selectedLocation.label : "Search..."}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setShow(!show)}
      />

      {show && (
        <div className="results-dropdown">
          <Button
            className="FullWidthBtn blueBtn"
            onClick={() => setShowMap(true)}
          >
            {t("Booking.ChooseFromMap")}
          </Button>
          {loading && (
            <div className="dropdown-item text-center">
              <Spinner animation="border" size="sm" /> Loading...
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="dropdown-item text-muted">No results</div>
          )}

          {!loading &&
            filtered.map((item, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleSelect(item)}
              >
                <FiMapPin />
                {item.pickup_name}
              </div>
            ))}
        </div>
      )}
      <PickupLocation
        show={showMap}
        onHide={() => setShowMap(false)}
        setPickupData={(loc) => {
          setSelectedLocation(loc);
          onLocationSelect(loc);
        }}
      />
    </div>
  );
}

export default TripPickupList;
