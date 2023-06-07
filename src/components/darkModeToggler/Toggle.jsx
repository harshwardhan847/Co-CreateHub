import React from "react";
import "./toggle.css";
import useDarkSide from "../../hooks/useDarkSide";
import { useState } from "react";
const Toggle = () => {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };
  return (
    <>
      <label className="text-[3px]">
        <input
          onChange={toggleDarkMode}
          class="toggle-checkbox"
          type="checkbox"
          defaultChecked
        ></input>
        <div class="toggle-slot">
          <div class="sun-icon-wrapper">
            <div
              class="iconify sun-icon"
              data-icon="feather-sun"
              data-inline="false"
            ></div>
          </div>
          <div class="toggle-button"></div>
          <div class="moon-icon-wrapper">
            <div
              class="iconify moon-icon"
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
