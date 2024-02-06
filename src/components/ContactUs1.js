import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LandingNavbar from '../navbar/LandingNavbar';
import GlobalFooter from '../footer/GlobalFooter';
import '../css/AboutUsPage.css'; // Ensure you have appropriate CSS for this page

function AboutUsPage() {
  return (
    <div className="about-us-page">
      <LandingNavbar />
      <Container>
        <Row>
          <Col className="about-us-iframe-container">
            
            
            {/* Embedding the ClickUp form */}
            <iframe 
              src="https://forms.clickup.com/2260133/f/24z55-6974/KY0J6JROK15VK2DOBJ" >
            </iframe>
          </Col>
          
        </Row>
      </Container>
      <GlobalFooter />
    </div>
  );
}

export default AboutUsPage;
