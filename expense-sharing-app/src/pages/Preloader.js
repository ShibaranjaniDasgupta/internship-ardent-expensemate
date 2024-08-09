import React from "react";
import "./Preloader.css";
import preloaderImage from "./F.gif";

const Preloader = () => (
  <div className="preloader-container">
    <img src={preloaderImage} alt="Loading..." className="preloader-image" />
  </div>
);

export default Preloader;
