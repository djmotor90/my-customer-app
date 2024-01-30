import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../css/LandingPage.css';

function LandingInserter() {
  return (
    <Container fluid>
      {/* First Row */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/500x300" alt="Card Image" />
            <Card.Body>
              <Card.Title>Company Overview</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Donec auctor mi vel odio facilisis, non malesuada nisi facilisis.
                In vel tortor eu turpis bibendum varius. Sed bibendum efficitur justo, at mattis quam ultricies et. Fusce fermentum id mi a suscipit.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/500x300" alt="Card Image" />
            <Card.Body>
              <Card.Title>Our Services</Card.Title>
              <Card.Text>
                Sed gravida, velit a rhoncus luctus, dolor nunc bibendum libero, non consequat purus erat non justo. 
                Phasellus eu dapibus nulla. Praesent scelerisque dolor ac elit euismod, a tincidunt lorem accumsan. 
                Suspendisse potenti. Nam in bibendum purus.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Second Row */}
      <Row className="mb-4">
        <Col>
          {/* Video Embed */}
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              src="https://www.youtube.com/embed/your-video-id"
              title="Video Title"
              allowFullScreen
            ></iframe>
          </div>
        </Col>
      </Row>

      {/* Third Row */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/500x300" alt="Card Image" />
            <Card.Body>
              <Card.Title>Our Team</Card.Title>
              <Card.Text>
                Meet our talented team of professionals who are dedicated to delivering outstanding results for our clients.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/500x300" alt="Card Image" />
            <Card.Body>
              <Card.Title>Testimonials</Card.Title>
              <Card.Text>
                Read what our satisfied customers have to say about our services and their experiences with us.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Fourth Row */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/500x300" alt="Card Image" />
            <Card.Body>
              <Card.Title>Blog</Card.Title>
              <Card.Text>
                Explore our blog for the latest industry insights, tips, and updates from our experts.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/500x300" alt="Card Image" />
            <Card.Body>
              <Card.Title>Contact Us</Card.Title>
              <Card.Text>
                Have questions or need assistance? Contact our friendly support team.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    
    </Container>
  );
}

export default LandingInserter;
