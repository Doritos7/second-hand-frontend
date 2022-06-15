import React from "react";
import logo from "../../../assets/images/logo.png";
import iconLogin from "../../../assets/images/icon-login.png";
import iconSearch from "../../../assets/images/icon-search.png";
import iconMenu from "../../../assets/images/icon-menu.png";
import "./navbar.css";
function Navbar(props) {
  return (
    <nav className="navbar">
      <div className="leftNav">
        <div className="logo">
          <img src={logo} alt="SecondHand" />
        </div>
        <div className="menuBurger">
          <img src={iconMenu} alt="menu" />
        </div>
        <label className="searchField">
          <input placeholder="Cari di sini..." />
          <button>
            <img src={iconSearch} alt="search" />
          </button>
        </label>
      </div>
      <div className="rightNav">
        <button className="flex gap-2 bg-purple-400 hover:bg-purple-500 text-white py-3 px-6 rounded-xl">
          <img src={iconLogin} alt="->" /> Masuk
        </button>
      </div>
    </nav>
  );
}

export default Navbar;