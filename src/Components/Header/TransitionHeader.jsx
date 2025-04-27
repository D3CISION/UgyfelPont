import "./Header.css";
import Logo from "../../assets/icon.png";
import Login from "../../assets/login.svg";
import { Link } from "react-router-dom";
import { Link as LinkRoll } from "react-scroll";
import { useState } from "react";

// header a regisztráció, bejelentkezés és cég létrehozása oldalakra
function TransitionHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([false, false, false, false]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    const updatedItems = menuItems.map((_, index) => {
      setTimeout(() => {
        setMenuItems((prev) => {
          const newItems = [...prev];
          newItems[index] = !menuOpen;
          return newItems;
        });
      }, index * 20);
    });
  };
  return (
    <div className="Header">
      <div className="Header-L">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="Header-M">
        <div className="MenuItems">
          <div
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
          <Link
            id="terv"
            activeClass="active"
            to="/"
            className={menuItems[0] ? "open" : ""}
          >
            Tervezz!
          </Link>
        </div>
      </div>
      <div className="MenuItems">
        <Link
          to="/bejelentkezes"
          id="header-profil"
          className={menuItems[3] ? "open" : ""}
        >
          <div className="Header-R">
            <img src={Login} alt="" />
            <span>Login</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default TransitionHeader;
