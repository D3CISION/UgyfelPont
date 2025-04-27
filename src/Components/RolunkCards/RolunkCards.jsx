import React from "react";
import { rolunkData } from "../../data/rolunkData.jsx";
import "./RolunkCards.css";

export default function RolunkCards() {
  return (
    <div className="cards-cont">
      <div className="cards-header">
        <span className="">Miért válaszd az ÜgyfélPontot?</span>
      </div>
      <div className="card-category">
        {rolunkData.map((rolunk, index) => (
          <div className="category" key={index}>
            {rolunk.image}
            <span>{rolunk.heading}</span>
            <span>{rolunk.details}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
