import React from "react";
import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MoneyImage from "../assets/money.jpg";
import {
  GoogleLogin,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from "@react-oauth/google";

const clientId = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your Google client ID

const Register1 = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await axios.post("/api/users/register", values);
      message.success("Registration successful");
      navigate("/login");
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const onSuccess = async (credentialResponse) => {
    try {
      const profile = JSON.parse(
        atob(credentialResponse.credential.split(".")[1])
      );
      const { name, email, sub: googleId } = profile;
      await axios.post("/api/users/google-login", {
        name,
        email,
        password: googleId,
      });
      message.success("Registration successful");
      navigate("/login");
    } catch (error) {
      message.error("Something went wrong with Google signup");
    }
  };

  const onFailure = (response) => {
    message.error("Google signup failed");
  };

  useGoogleOneTapLogin({
    onSuccess,
    onError: onFailure,
  });

  return (
    <div
      style={{
        background: "#0a192f",
        display: "flex",
        borderRadius: "10px",
        flexDirection: "column",
        alignItems: "center",
        width: "500px",
        height: "90vh",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <img
          src={MoneyImage}
          alt="money_app"
          style={{ width: "200px", height: "auto" }}
        />
      </div>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <Form layout="vertical" onFinish={onFinish}>
          <h1 style={{ textAlign: "center", color: "#fff" }}>SIGNUP</h1>
          <hr />
          <Form.Item
            label={<span style={{ color: "#64ffda" }}>Name</span>}
            name="name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "#64ffda" }}>Email</span>}
            name="email"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "#64ffda" }}>Password</span>}
            name="password"
          >
            <Input type="password" />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link to="/login" style={{ color: "#64ffda" }}>
              Already registered? Click here to login
            </Link>
            <button
              type="submit"
              style={{
                backgroundColor: "#64ffda",
                color: "#020c1b",
                padding: "10px 20px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              SIGNUP
            </button>
          </div>
        </Form>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
        </div>
      </div>
    </div>
  );
};

export default Register1;
