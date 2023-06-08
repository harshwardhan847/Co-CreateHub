import React, { useEffect, useRef } from "react";
import "./toggle.css";
import useDarkSide from "../../hooks/useDarkSide";
import { useState } from "react";
const Toggle = () => {
  // const [colorTheme, setTheme] = useDarkSide();
  // const [darkSide, setDarkSide] = useState(
  //   colorTheme === "light" ? true : false
  // );
  // const [theme, setTheme] = useState("dark");
  const [theme, setTheme] = useState(localStorage.getItem("theme")||"dark");
  const [isChecked, setIsChecked] = useState(true);
  useEffect(() => {
    // toggle.current?.checked==="light"?toggle.current?.checked=false:toggle.current?.checked=true
    const root = window.document.documentElement;
    if (theme === "light") {
      setIsChecked(true);
      root.classList.remove("dark");
      root.classList.add("light");
      localStorage.setItem("theme", theme);
    } else {
      setIsChecked(false)
      root.classList.remove("light");
      root.classList.add("dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);
  const toggleDarkMode = () => {
    // setTheme(colorTheme);
    // setDarkSide(checked);

    if (isChecked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <>
      <label className="text-[3px] cursor-pointer">
        <input
          onChange={toggleDarkMode}
          className="toggle-checkbox"
          type="checkbox"
          checked={!isChecked}
        ></input>
        <div className="toggle-slot">
          <div className="sun-icon-wrapper">
            <div
              className="iconify sun-icon"
              data-icon="feather-sun"
              data-inline="false"
            ></div>
          </div>
          <div className="toggle-button"></div>
          <div className="moon-icon-wrapper">
            <div
              className="iconify moon-icon"
              data-icon="feather-moon"
              data-inline="false"
            ></div>
          </div>
        </div>
      </label>
    </>
  );
};

export default Toggle;
