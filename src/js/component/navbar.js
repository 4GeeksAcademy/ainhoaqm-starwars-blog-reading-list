import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";

//icons
import { BsTrash3 } from "react-icons/bs";

//img
import logo from "../../img/logo.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const handleRemoveFavorite = (item) => {
    actions.removeFavorite(item);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link className="navbar-link" to="/">
          <h1 className="navbar-h1">
            <img className="navbar-img" src={logo} alt="Logo" />
          </h1>
        </Link>
      </div>
      <div className="navbar-right">
        <div className="btn-group me-5" onClick={closeDropdown}>
          <Link to="/favorites" className="btn btn-danger">  Favorites ({store.favorites.length}) </Link>
          <button onClick={toggleDropdown} type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false" >
            <span className="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul onClick={(e) => e.stopPropagation()} className={`dropdown-menu ${dropdownOpen ? "show" : ""}`} >
            {store.favorites.map((item, index) => (
              <li key={index}>
                <Link to={`/${item.category}/${item.uid}`} className="dropdown-item"> {item.name} </Link>
                <button onClick={() => handleRemoveFavorite(item)} className="btn btn-link" > <BsTrash3 /></button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
