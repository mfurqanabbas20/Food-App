import React, { useContext } from "react";
import "./LoginPopup.css";
import { useState } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {
  const { url,setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onLogin = async () => {
    let newUrl = url
    newUrl += '/api/users/login'
    const response = await axios.post(newUrl, data)
    if(response.data.success){
      console.log('Login ');
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token)
      setShowLogin(false)
    }
    else {
      alert(response.data.message)
    }
    
  }

  const onSignUp = async () => {
    let newUrl = url
    newUrl += '/api/users/register'
    const response = await axios.post(newUrl, data)
    if(response.data.success){
      console.log('Login ');
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token)
      setShowLogin(false)
    }
    else {
      alert(response.data.message)
    }
  }

  return (
    <div className="login-popup">
      <div className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              onChange={handleChange}
              name="name"
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}
          <input
            onChange={handleChange}
            name="email"
            value={data.email}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            onChange={handleChange}
            name="password"
            value={data.password}
            type="text"
            placeholder="Your Password"
            required
          />
        </div>
        <button
          onClick={currState === "Sign Up" ? () => onSignUp() : () => onLogin()}
        >
          {currState === "Sign Up" ? "Create Acccount" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to terms of use and privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new Account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an Account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;
