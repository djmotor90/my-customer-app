import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import LandingNavbar from '../navbar/LandingNavbar';
import GlobalFooter from '../footer/GlobalFooter';
import '../css/AboutPage.css';

function AboutPage() {
  return (
    <div  mb-5>
      <LandingNavbar />
      <div>
        <Container className="about-page">
          <Row className="about-row">
            <Col className='aboutus' lg={6}>
              <h2 className='aboutus-h2'>About ClickUp Portal</h2>
              <p>ClickUp Portal is a self-made project created by Kim Gurinov to provide an enhanced ClickUp experience for users who love the platform but may be missing certain features, particularly in the customer portal domain.</p>
              {/* <p>
                ClickUp Portal is your one-stop solution for project management and collaboration. We provide tools and features that help teams streamline their work, increase productivity, and achieve their goals.
              </p> */}
              <p>Our mission is to simplify project management and empower teams to work more efficiently. Whether you're a small startup or a large enterprise, ClickUp Portal has the tools you need to succeed.</p>
              <p className='aboutus-disclamer'>My ClickUp Portal operates independently and is not affiliated with, endorsed, or sponsored by ClickUp or any of its subsidiaries.</p>
            </Col>
            <Col lg={6} className='aboutus-image'>
              <Image src="https://objectstorage.us-ashburn-1.oraclecloud.com/p/Bd887Jq46nB68kfxJqiqgAX6U0rehZWH8Mwp4GLAiMR7181NSaAtSzN3l-rDGEP7/n/idjegt7oebz2/b/CPCP/o/djmotor_IT_people_coding_applications_to_help_other_people_futu_0a09ab7e-65be-4b3c-8761-4d355702e585.webp" alt="ClickUp Portal" fluid rounded />
            </Col>
          </Row>
        </Container>
      </div>
      <GlobalFooter />
    </div>
  );
}


export default AboutPage;
