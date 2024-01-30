import React from 'react';
import LandingNavbar from '../navbar/LandingNavbar';
import LandingInserter from '../inserters/LandingInserter';
import GlobalFooter from '../footer/GlobalFooter';
import '../css/LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <LandingNavbar /> 
      
      <div className="landing-content"> 
      <LandingInserter />
      </div>
      
      
      <GlobalFooter/>
    </div>
  );
}

export default LandingPage;
