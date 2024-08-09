import React from "react";
import "./About.css";
import expenseImage from "../assets/download.jpeg";

const About = () => {
  return (
    <div className="about-box">
      <img
        src={expenseImage}
        alt="Expense sharing illustration"
        className="about-image"
      />
      <div className="about-text">
        <h1>About</h1>
        <p>
          Welcome to our Expense Sharing App, your ultimate solution for
          managing and simplifying shared expenses. Whether you're planning a
          group trip, splitting household bills, or sharing costs among friends,
          our app provides a seamless experience to ensure that everyone pays
          their fair share without any hassle.
        </p>
        <p>
          Our app allows you to add expenses easily, create and manage groups,
          and settle debts efficiently. Experience the ease and convenience of
          modern expense sharing today!
        </p>
      </div>
    </div>
  );
};

export default About;
