import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/Footer.css'; 

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg={4} md={6}>
            <h5>We make imposible posible</h5>
            
          </Col>
          <Col lg={4} md={6}>
            <h5>Contact Us</h5>
            <address>
              <p>Email: info@gurver.org</p>
              {/* <p>Phone: +1 (123) 456-7890</p> */}
            </address>
          </Col>
          <Col lg={4} md={12}>
            <h5>Follow Us</h5>
            <ul className="social-icons">
              {/* <li><a href="facebook.com"><i className="fa fa-facebook"></i></a></li> */}
              <li><a href="https://twitter.com/therealkglife"><i className="fa fa-twitter"></i></a></li>
              <li><a href="https://www.linkedin.com/in/kim-gurinov/"><i className="fa fa-linkedin"></i></a></li>
              {/* <li><a href="instagram.com"><i className="fa fa-instagram"></i></a></li> */}
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="footer-bottom">
        <Container>
          <Row>
            <Col md={6}>
              <p>&copy; {new Date().getFullYear()} GurVer. All rights reserved.</p>
            </Col>
            <Col md={6}>
              <ul className="footer-links">
                <li><a href="/privacy">Privacy Policy</a></li>
                {/* <li><a href="terms">Terms of Service</a></li> */}
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
