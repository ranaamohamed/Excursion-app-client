import React, { useEffect } from "react";
import { Col, Container, Row, Accordion } from "react-bootstrap";
import { useTranslation, getLanguage } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import { GetDestination_Tree } from "../../redux/slices/destinationSlice";
import LoadingPage from "../Loader/LoadingPage";
import { Link } from "react-router-dom";
import "./AllDestination.scss";
function AllDestination() {
  const t = useTranslation();
  const dispatch = useDispatch();
  const { loading, error, success, DestinationTreeList } = useSelector(
    (state) => state.destinations
  );
  useEffect(() => {
    let formData = {
      country_code: "",
      lang_code: localStorage.getItem("lang") || getLanguage(),
      currency_code: "",
      leaf: false,
    };
    dispatch(GetDestination_Tree(formData));
    return () => {};
  }, [dispatch]);
  return (
    <section className="centerSection destination-section">
      <Container>
        {" "}
        <div class="header_title_center">
          <h2>{t("Destinations.DestinationTitle")}</h2>
        </div>
        <div className="destination_data">
          {DestinationTreeList && DestinationTreeList.length > 0 ? (
            <Row>
              {DestinationTreeList.map((dest, index) => (
                <Col md={6} xs={12}>
                  {" "}
                  <Accordion
                    key={index}
                    defaultActiveKey={dest.dest_name}
                    alwaysOpen
                  >
                    <Accordion.Item eventKey={dest.dest_name}>
                      <Accordion.Header>{dest.dest_name}</Accordion.Header>
                      <Accordion.Body>
                        <ul className="dest_list">
                          {dest?.children.length > 0 ? (
                            dest?.children.map((child, i) => (
                              <li key={i}>
                                <Link key={i}> {child.dest_name}</Link>
                              </li>
                            ))
                          ) : (
                            <p>{t("Trips.NoData")}</p>
                          )}
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
              ))}
            </Row>
          ) : (
            <p>{t("Trips.NoData")}</p>
          )}
        </div>
      </Container>
      {loading ? <LoadingPage /> : null}
    </section>
  );
}

export default AllDestination;
