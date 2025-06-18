import React from "react";
import "../css/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Mern Stack Website</h1>
      <p>Your one-stop solution for full-stack development projects.</p>

      <section className="features">
        <h2>Our Services</h2>
        <ul>
          <li>💻 Web Application Development</li>
          <li>📱 Mobile Responsive Design</li>
          <li>☁️ Cloud Integration with MongoDB Atlas</li>
          <li>🔒 Secure Authentication and Authorization</li>
          <li>⚡ Fast Backend APIs with Node.js and Express</li>
        </ul>
      </section>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          We are committed to delivering high-quality, scalable, and reliable
          web solutions that empower businesses to succeed in the digital era.
        </p>
      </section>
    </div>
  );
};

export default Home;
