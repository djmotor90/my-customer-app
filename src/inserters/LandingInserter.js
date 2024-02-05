import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/LandingInserter.css';

// Example data for cardsInfo


function LandingInserter() {

  return (
    <Container fluid className="p-0">
    {/* Hero Section */}
    <Row className="hero-section justify-content-center align-items-center">
      <Col md={12} className="text-center">
        <h1 className="hero-title">Welcome to ClickUP Portal</h1>
        <p className="hero-subtitle">I am your partner in innovative software solutions.</p>
        <p className='aboutus-disclamer'>My ClickUp Portal operates independently and is not affiliated with, endorsed, or sponsored by ClickUp or any of its subsidiaries.</p>
     
      </Col>
    </Row>

    {/* Image and Text Alternating Sections */}
    <Row className="image-text-section">
      <Col md={6} >
        <img src="https://objectstorage.us-ashburn-1.oraclecloud.com/p/dfkwJaVQ8m-A3W5VlNU9KOFqxM0jbSBKvCgX4-GBuW4FNCicboVp4-2zrwl4WEae/n/idjegt7oebz2/b/CPCP/o/djmotor_Company_Overview_software_company_c8bda2e5-5472-4626-8b98-298d4671c005.webp" alt="Description" className="img-fluid" />
      </Col>
      <Col md={6} className="d-flex align-items-rigth justify-content-center">
        <div className="text-content1">
          <h2 className='text-content-h2'>🚀 Who Am I? Well, buckle up! 🌟</h2>
        <p>Hello, digital wanderer! You've just teleported into the cosmic playground of a tech enthusiast, a wizard if you will, who thrives on stitching the fabric of the digital cosmos together. Who am I? I'm the person who looks at a motherboard and sees a canvas, who sees code as poetry, and who firmly believes that technology is the closest thing we have to magic in this universe.</p>
        <p>I'm not just a programmer; I'm a dream weaver, crafting digital dreams into tangible realities. My playground? The vast expanse of the digital universe. My toys? Lines of code, gleaming circuits, and the endless potential of integration. I live by the creed that "impossible" is just a challenge waiting to be debugged.</p>
        <p>From the humming servers housed in chilly rooms to the sleek smartphones nestled in your palm, I love it all. My passion? To create, to innovate, and to seamlessly integrate systems that weren't even on speaking terms before I introduced them. I'm the digital matchmaker, making connections that redefine what's possible.</p>
        <p>My mantra? "Make impossible possible." It's not just a catchy slogan; it's the core of my being. When they said you couldn't get that API to have a conversation with that legacy system, I asked, "Why not?" And then, I made them best friends. When the world sees a technological dead-end, I see a secret door waiting to be unlocked.</p>
        <p>So, who am I? I'm your friendly neighborhood tech enthusiast, a creator at heart, and a problem-solver by destiny. I'm the one who stays awake at night pondering over algorithms and dreams of a world where technology knows no bounds. I make the digital magic happen, and I make the impossible, well, possible.</p>
        <p>Welcome to my world, where creativity meets technology, and where the next big innovation is just an idea away. Let's make some magic happen together! 🌈💻✨</p>
    
        </div>
      </Col>
    </Row>

    <Row className="image-text-section flex-md-row-reverse">
      <Col md={6} >
        <img src="https://objectstorage.us-ashburn-1.oraclecloud.com/p/m4W1FuVIEMt9mrKE5cRFNYZs-bR1Hbj9c0Qbt2BstRIadQfY0riqlolKEEevytfB/n/idjegt7oebz2/b/CPCP/o/Untitled%20design.png" alt="Description" className="img-fluid" />
      </Col>
      <Col md={6} className="d-flex align-items-rigth justify-content-center">
  <div className="text-content1">
  <h2 className='text-content-h2'>🛠️ My Expertise? Let's Dive In! 🌊</h2>
        <p>In a sea of technology, I'm the captain navigating through waves of coding challenges, steering projects to the shores of success. My compass? A diverse skill set from front-end magic to back-end wizardry, and everything in-between. Integration is my forte - I make disparate systems hold hands and sing Kumbaya. Think of me as a tech chef, mixing ingredients to cook up solutions that are not just effective but delightful. So, what's on the menu? Innovation, efficiency, and a sprinkle of fun!</p>
  </div>
</Col>
    </Row>

      
    </Container>
  );
}

export default LandingInserter;
