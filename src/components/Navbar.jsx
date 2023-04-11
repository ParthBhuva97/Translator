import React, { useEffect, useState } from "react";
import "../assets/css/navbar.css";

function Navbar() {
  const [theme, setTheme] = useState("light-theme");
  function handleThemeSwitch() {
    theme === "light-theme" ? setTheme("dark-theme") : setTheme("light-theme");
    console.log(theme);
  }

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <div>
      <nav className="navbar">
        <div className="logo">Translator</div>
        <div className="switch-container">
          <label class="switch">
            <input type="checkbox" onChange={(e)=>{handleThemeSwitch(e);}}/>
            <span class="slider round"></span>
          </label>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
