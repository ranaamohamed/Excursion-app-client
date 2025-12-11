import React, { useState, useEffect } from "react";
import { useTranslation, getLanguage } from "react-multi-lang";
import LoadingPage from "../Loader/LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEuroSign, FaRegSquareCheck } from "react-icons/fa6";
import "react-range-slider-input/dist/style.css";
import { getExerTrips, GetTripCategories } from "../../redux/slices/TripsSlice";
import { GetDestinations } from "../../redux/slices/destinationSlice";
import "./trips.scss";
import {
  Container,
  Breadcrumb,
  Row,
  Col,
  Card,
  Button,
  Accordion,
  Form,
} from "react-bootstrap";
import RangeSlider from "react-range-slider-input";
import TripCard from "../Shared/TripCard/TripCard";

function TripList() {
  const t = useTranslation();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [value, setValue] = useState([10, 10000000]);
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [TripListData, setTripList] = useState([]);
  const [PlaceName, setPlaceName] = useState(t("Trips.All"));
  const [sortType, setSortType] = useState("alpha");
  const [sortOrder, setSortOrder] = useState("high");
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedDestinationIds, setSelectedDestinationIds] = useState(
    state?.destination_lst || []
  );
  const [sortedTrips, setSortedTrips] = useState([]);
  const [formData, setFormData] = useState({
    destination_id: 0,
    lang_code: localStorage.getItem("lang") || getLanguage(),
    show_in_top: false,
    show_in_slider: false,
    currency_code: localStorage.getItem("currency") || "eur",
    client_id: "",
    trip_type: 0,
    trip_types: selectedIds,
    destination_lst: selectedDestinationIds,
    min_price: minPrice,
    max_price: maxPrice,
  });
  const { loading, error, success, ExerTrips, TripsCats } = useSelector(
    (state) => state.exertrips
  );
  const { DestinationList } = useSelector((state) => state.destinations);
  useEffect(() => {
    // let formData = {
    //   destination_id: 0,
    //   lang_code: "en",
    //   show_in_top: false,
    //   show_in_slider: false,
    //   currency_code: "EUR",
    //   client_id: "",
    //   trip_type: 0,
    //   trip_types: null,
    //   min_price: minPrice,
    //   max_price: maxPrice,
    // };
    dispatch(getExerTrips(formData));
    dispatch(GetTripCategories());
    let DestinationReq = {
      country_code: "",
      lang_code: localStorage.getItem("lang") || getLanguage(),
      currency_code: "",
      leaf: true,
    };
    dispatch(GetDestinations(DestinationReq));
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    //setTripList(ExerTrips);
    formData["trip_types"] = selectedIds;
    formData["destination_lst"] = selectedDestinationIds;
    dispatch(getExerTrips(formData));
    return () => {};
  }, [selectedIds, minPrice, maxPrice, selectedDestinationIds]);

  // useEffect(() => {
  //   setSelectedDestinationIds(state?.destination_lst);
  //   return () => {};
  // }, [state]);

  const setPrice = (e) => {
    setValue(e);
    setMinPrice(e[0]);
    setMaxPrice(e[1]);
    setFormData({
      ...formData,
      min_price: e[0],
      max_price: e[1],
    });
    // formData["min_price"] = e[0];
    // formData["max_price"] = e[0];
    // dispatch(getExerTrips(formData));
  };

  // const sortedTrips = [...ExerTrips].sort((a, b) => {
  //   let result = 0;

  //   if (sortType === "price") {
  //     result = a.trip_min_price - b.trip_min_price;
  //   } else if (sortType === "star") {
  //     result = a.review_rate - b.review_rate;
  //   } else if (sortType === "alpha") {
  //     result = a.trip_name.localeCompare(b.trip_name);
  //   } else {
  //     result = [...ExerTrips];
  //   }

  //   return sortOrder === "low" ? result : -result;
  // });

  useEffect(() => {
    let sortedArr = [...ExerTrips];

    sortedArr.sort((a, b) => {
      let result = 0;

      if (sortType === "price") {
        result = a.trip_min_price - b.trip_min_price;
      } else if (sortType === "star") {
        result = a.review_rate - b.review_rate;
      } else if (sortType === "alpha") {
        result = a.trip_name.localeCompare(b.trip_name);
      }

      // 🔥 apply sort order:
      return sortOrder === "low" ? result : -result;
    });

    setSortedTrips(sortedArr);
  }, [sortType, sortOrder, ExerTrips]);

  const handleCatChange = (id) => {
    setSelectedIds(
      (prev) =>
        prev.includes(id)
          ? prev.filter((x) => x !== id) // remove if already selected
          : [...prev, id] // add if not selected
    );
  };
  const handleDestinationtChange = (id) => {
    setSelectedDestinationIds(
      (prev) =>
        prev.includes(id)
          ? prev.filter((x) => x !== id) // remove if already selected
          : [...prev, id] // add if not selected
    );
  };
  const clearFilter = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      min_price: 10,
      max_price: 10000000,
      selectedIds: [],
      selectedDestinationIds: [],
    });
    setSelectedIds([]);
    setSelectedDestinationIds([]);
    setMinPrice(10);
    setMaxPrice(10000000);
  };
  console.log("state ", sortedTrips);
  return (
    <section className="centerSection">
      {loading && <LoadingPage />}
      <Container>
        <div>
          <Breadcrumb>
            <Breadcrumb.Item href="/">{t("Navbar.Home")}</Breadcrumb.Item>
            <Breadcrumb.Item href="">{t("Trips.Trips")}</Breadcrumb.Item>
            <Breadcrumb.Item active>{PlaceName}</Breadcrumb.Item>
            {/* <Breadcrumb.Item active>{t("Trips.Trips")}</Breadcrumb.Item> */}
          </Breadcrumb>
        </div>
        <Row>
          <Col md={4} xs={12}>
            <div className="left_filter">
              <Button className="underline_btn" onClick={clearFilter}>
                {t("Trips.ClearFilter")}
              </Button>
              <Accordion key={"Destination"}>
                <Accordion.Item eventKey={"Destination"}>
                  <Accordion.Header>{t("Trips.Destination")}</Accordion.Header>
                  <Accordion.Body>
                    {/* <ul className="data_list trip_list"> */}
                    <Form>
                      {DestinationList.map((dest, index) => {
                        return (
                          <Form.Check
                            key={index}
                            type={"checkbox"}
                            id={`default-${index}`}
                            label={dest.dest_name}
                            className="cat_check_item"
                            checked={selectedDestinationIds?.includes(
                              dest.destination_id
                            )}
                            onChange={() =>
                              handleDestinationtChange(dest.destination_id)
                            }
                          />
                        );
                      })}
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion key={"price"}>
                <Accordion.Item eventKey={"price"}>
                  <Accordion.Header>{t("Trips.Price")}</Accordion.Header>
                  <Accordion.Body>
                    <RangeSlider
                      min={10}
                      max={1000}
                      step={5}
                      value={value}
                      onInput={setPrice}
                    />
                    <div className="d-flex justify-content-between w-100 align-items-center">
                      <span className="slider-val">
                        min: <strong>{minPrice}</strong>{" "}
                      </span>
                      <span className="slider-val">
                        max: <strong>{maxPrice}</strong>{" "}
                      </span>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion key={"Category"}>
                <Accordion.Item eventKey={"Category"}>
                  <Accordion.Header>{t("Trips.Category")}</Accordion.Header>
                  <Accordion.Body>
                    {/* <ul className="data_list trip_list"> */}
                    <Form>
                      {TripsCats.map((cat, index) => {
                        return (
                          <Form.Check
                            key={index}
                            type={"checkbox"}
                            id={`default-${index}`}
                            label={cat.type_name}
                            className="cat_check_item"
                            checked={selectedIds?.includes(cat.id)}
                            onChange={() => handleCatChange(cat.id)}
                          />

                          // <li key={index} className="cat_item">
                          //   {cat.type_name}
                          // </li>
                        );
                      })}
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Col>
          <Col md={8} xs={12}>
            <div className="filter-header">
              <strong>{t("Trips.SortBy")}:</strong>
              <ul>
                <li>
                  <select
                    onChange={(e) => {
                      setSortType("star");
                      setSortOrder(e.target.value);
                    }}
                  >
                    <option value="">{t("Trips.Stars")}</option>
                    <option value="low">[1-5] {t("Trips.Stars")}</option>
                    <option value="high">[5-1] {t("Trips.Stars")}</option>
                  </select>
                </li>
                <li>
                  <select
                    onChange={(e) => {
                      setSortType("price");
                      setSortOrder(e.target.value);
                    }}
                  >
                    <option value="">{t("Trips.Prices")}</option>
                    <option value="low">{t("Trips.lowtohighPrices")}</option>
                    <option value="high">{t("Trips.highttolowPrices")}</option>
                  </select>
                </li>
                <li>
                  <select
                    onChange={(e) => {
                      setSortType("alpha");
                      setSortOrder(e.target.value);
                    }}
                  >
                    <option value="high">{t("Trips.SortDescending")}</option>
                    <option value="low">{t("Trips.SortAscending")}</option>
                  </select>
                </li>
              </ul>
            </div>
            <div className="trips_lst">
              <Row>
                {sortedTrips && sortedTrips.length > 0 ? (
                  sortedTrips?.map((trip, index) => {
                    return (
                      <Col key={index} md={6} xs={12}>
                        {" "}
                        <TripCard trip={trip} />
                      </Col>
                    );
                  })
                ) : (
                  <div className="centerSection">
                    <p>{t("Trips.NoData")}</p>
                  </div>
                )}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default TripList;
