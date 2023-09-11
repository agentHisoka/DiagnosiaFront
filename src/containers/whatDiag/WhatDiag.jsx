import React from "react";
import "./whatDiag.css";
import Feature from "../../components/feature/Feature";

const WhatDiag = () => (
  <div className="diag__whatdiag section__margin" id="wdiag">
    <div className="diag__whatdiag-feature">
      <Feature
        title="What is DIAGNOSIANA"
        text="Diagnosiana is an e-health platform that allows users to predict illnesses based on their symptoms inputs. Our platform aims to provide accurate diagnoses to reduce healthcare costs and help users make informed decisions about their health, eliminating the need for unnecessary travel and examinations, saving users time and money. With a user-friendly interface, our platform is accessible to anyone, anywhere"
      />
    </div>
    <div className="diag__whatdiag-heading">
      <h1 className="gradient__text">
        The possibilities are beyond your imagination
      </h1>
      <p>Explore the Library</p>
    </div>
    <div className="diag__whatdiag-container">
      <Feature
        title="Doctors"
        text="We so opinion friends me message as delight. Whole front do of plate heard oh ought."
      />
      <Feature
        title="Databases"
        text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b"
      />
      <Feature
        title="Services"
        text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b"
      />
    </div>
  </div>
);

export default WhatDiag;
