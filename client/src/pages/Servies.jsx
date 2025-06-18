import React, { useEffect, useState } from "react";
//import { useAuth } from "../store/auth";
import "../css/Service.css";

const Servies = () => {
  //const { services } = useAuth();

  //console.log(services);

  const [serviceData, setServiceData] = useState([]);

  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/service", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("services from getServices : ", data.response);
        setServiceData(data.response);
      }
    } catch (error) {
      console.log("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getServices();
    console.log("serviceData : ", serviceData);
  }, []);

  return (
    <div className="services-container">
      <h1 className="services-title">Our Services</h1>

      <div className="services-grid">
        {serviceData &&
          serviceData.map((service, index) => (
            <div className="service-card" key={index}>
              <h2>{service.service}</h2>
              <p>
                <strong>Description:</strong> {service.description}
              </p>
              <p>
                <strong>Price:</strong> {service.price}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Servies;
