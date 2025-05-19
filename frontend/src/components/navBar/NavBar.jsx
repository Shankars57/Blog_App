import React, { useEffect } from "react";
import "./NavBar.css"; // Assuming you have some CSS for styling
import { Link , NavLink } from "react-router-dom";
const NavBar = ({ content, setContent }) => {
  useEffect(() => {
    function navBarSticky() {
      if (window.scrollY > 50) {
        document.querySelector(".navbar").classList.add("sticky");
      } else {
        document.querySelector(".navbar").classList.remove("sticky");
      }
    }

    window.addEventListener("scroll", navBarSticky);
    return () => {
      window.removeEventListener("scroll", navBarSticky);
    };
  }, []);
  return (
    <div className="navbar">
      <div className="title">My Blog App</div>

      <nav>
        <ul>
          <li>
            <NavLink to="/">Create</NavLink>
          </li>
          <li>
            <NavLink to="/drafts" style={{color:'#266'}}>Drafts</NavLink>
          </li>
          <li>
            <NavLink to="/published">Published</NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <button
          className="loginBtn"
          onClick={() => setContent((prev) => (prev = !prev))}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default NavBar;
