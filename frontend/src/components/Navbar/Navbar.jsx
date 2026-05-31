import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const {getTotalCartAmount, token, setToken} = useContext(StoreContext)


  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem("token")
    setToken('')
    navigate('/')
  }
  return (
    <div className="navbar">
    <Link to='/'>
      <h2 className="logo">Foodie</h2>
    </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() > 0 ? 'dot' : ''}></div>
        
        </div>
        {!token ?  <button onClick={() => setShowLogin(true)} className="">
          Sign In
        </button> : 
        <div className="navbar-profile">
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={() => logOut()}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
        </div>
         }
        
      </div>
    </div>
  );
};

export default Navbar;
