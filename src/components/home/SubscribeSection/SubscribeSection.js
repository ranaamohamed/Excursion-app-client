import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaEnvelopeOpenText } from "react-icons/fa";
import "./SubscribeSection.scss";

const SubscribeSection = () => {
  return (
    <section className="subscribe-section">
      <Container>
        <Row className="align-items-center">
          {/* Left Content */}
          <Col lg={6} className="content">
            <div className="icon">
              <FaEnvelopeOpenText size={40} />
            </div>
            <div>
              <h2>Your Travel Journey Starts Here</h2>
              <p>Sign up and we’ll send the best deals to you</p>
            </div>
          </Col>

          {/* Right Form */}
          <Col lg={6}>
            <Form className="subscribe-form">
              <Form.Control
                type="email"
                placeholder="Your Email"
                className="email-input"
              />
              <Button className="subscribe-btn">Subscribe</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SubscribeSection;
