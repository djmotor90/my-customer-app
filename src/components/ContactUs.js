import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Navbar from '../navbar/LandingNavbar';
import Footer from '../footer/GlobalFooter';
import '../css/ContactUs.css';
import ReCAPTCHA from "react-google-recaptcha";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [messageStatus, setMessageStatus] = useState(null); // State to store the message status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!recaptchaValue) {
        alert('Please complete the reCAPTCHA challenge.');
        return;
      }

      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, recaptchaValue }),
      });

      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        setMessageStatus('success'); // Set the message status to 'success'
      } else {
        const data = await response.json();
        setMessageStatus('error'); // Set the message status to 'error'
        alert(`Failed to send message: ${data.error}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessageStatus('error'); // Set the message status to 'error' on any error
    }
  };

  return (
    <div>
      <Navbar />
      <Container className="contact-us-container">
        <Row className="justify-content-center">
          <Col lg={6}>
            <h2>Contact Us</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <ReCAPTCHA
                sitekey="6Le0emApAAAAAENcypq8LtthX7lZYwhTl7ESFUIi"
                onChange={(value) => setRecaptchaValue(value)}
              />

              <Button variant="primary" type="submit">
                Send
              </Button>

              {messageStatus === 'success' && (
                <div className="message-success">Message sent successfully!</div>
              )}

              {messageStatus === 'error' && (
                <div className="message-error">Failed to send message. Please try again later.</div>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default ContactUs;
