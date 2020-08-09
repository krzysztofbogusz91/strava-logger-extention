import React from "react";
import './About.scss';
import NavBar from '../Navbar/NavBar';

export const About = (props: any) => {
  return (
     <div>
      <NavBar></NavBar>
      <div className="container-box">
        About works
      </div>
    </div>
  );
}

export default About;

