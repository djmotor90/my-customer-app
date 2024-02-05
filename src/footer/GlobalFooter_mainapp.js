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
