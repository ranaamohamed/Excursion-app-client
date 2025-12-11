import React from "react";
import { Button, Container } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
import { Link } from "react-router-dom";
function CommingSoon() {
  const t = useTranslation();
  return (
    <section className="centerSection" style={{ backgroundColor: "#fcfdff" }}>
      <Container>
        {" "}
        <div>
          <img
            src="./images/page_not_found.png"
            loading="lazy"
            alt="page_not_found.jpg"
            className="comming_img"
          />
        </div>
      </Container>
    </section>
  );
}

export default CommingSoon;
