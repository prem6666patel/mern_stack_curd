import React from "react";
import "../css/About.css";
import { useAuth } from "../store/auth";

const About = () => {
  const { userData } = useAuth();

  return (
    <div className="about-container">
      <h1>About Us</h1>

      <p>welcome , {userData ? userData.username : ` to our website `}</p>

      <p>
        We are a team of passionate developers specializing in the MERN stack
        (MongoDB, Express.js, React.js, Node.js).
      </p>

      <section className="our-story">
        <h2>Our Story</h2>
        <p>
          Founded in 2024, our mission has been to create robust and modern web
          applications for startups, small businesses, and enterprises.
        </p>
      </section>

      <section className="values">
        <h2>Our Core Values</h2>
        <ul>
          <li>Customer First Approach</li>
          <li>Commitment to Quality</li>
          <li>Continuous Learning</li>
          <li>Innovation and Creativity</li>
        </ul>
      </section>

      <section className="technologies">
        <h2>Technologies We Love</h2>
        <p>
          React, Node.js, Express, MongoDB, Next.js, Redux, Tailwind CSS, GitHub
          Actions, Docker, and more!
        </p>
      </section>
    </div>
  );
};

export default About;
