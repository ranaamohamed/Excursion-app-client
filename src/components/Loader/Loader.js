import React from "react";
import { Spinner } from "react-bootstrap";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader-container">
      <Spinner animation="border" variant="secondary" />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
