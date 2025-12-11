import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useTranslation } from "react-multi-lang";
function ContactForm() {
  const t = useTranslation();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // You can send data to API here
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Name */}
      <Form.Group className="mb-3">
        {/* <Form.Label>{t("Contact.FullName")}</Form.Label> */}
        <Form.Control
          type="text"
          name="full_name"
          placeholder={t("contact.FullName")}
          value={formData.full_name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* Email */}
      <Form.Group className="mb-3">
        {/* <Form.Label>Email</Form.Label> */}
        <Form.Control
          type="email"
          name="email"
          placeholder={t("contact.EnterEmail")}
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* Phone */}
      <Form.Group className="mb-3">
        {/* <Form.Label>Phone</Form.Label> */}
        <Form.Control
          type="text"
          name="phone"
          placeholder={t("contact.EnterPhone")}
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* subject */}
      <Form.Group className="mb-3">
        {/* <Form.Label>Phone</Form.Label> */}
        <Form.Control
          type="text"
          name="subject"
          placeholder={t("contact.EnterSubject")}
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* Message */}
      <Form.Group className="mb-3">
        {/* <Form.Label>Message</Form.Label> */}
        <Form.Control
          as="textarea"
          rows={4}
          name="message"
          placeholder={t("contact.EnterMessage")}
          value={formData.message}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button type="submit" className="blueBtn SmallWidthBtn roundedBtn">
        {t("contact.SendMessage")}
      </Button>
    </Form>
  );
}

export default ContactForm;
