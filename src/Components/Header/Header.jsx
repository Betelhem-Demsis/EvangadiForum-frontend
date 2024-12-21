import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Hooks/AuthContext";
import img1 from "../../assets/10001.png";
import "./Header.css";

function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="header">
      <div className="outer-div">
        <div className="inner-div">
          <Link to="/">
            {" "}
            <img src={img1} alt="logo" />
          </Link>
        </div>
        <div className="anchor-tags">
          <Link to="/">Home</Link>
          <Link to="#">How it Works</Link>
          <button className="Sign-in-button" onClick={handleAuthButtonClick}>
            {isLoggedIn ? "LOG OUT" : "SIGN IN"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Header;
