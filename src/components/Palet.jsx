import React from "react";

const Palet = ({
  color,
  settings,
  setSettings,
  colorVal,
  canvasBackground,
}) => {
  function clickHandler(event) {
    if (canvasBackground) {
      setSettings({
        ...settings,
        canvasColor: colorVal,
      });
     return 
    }
    setSettings({
      ...settings,
      brushColor: colorVal,
    });
  }
  return (
    <div
      className={`w-8 h-8 ${color} rounded-full cursor-pointer`}
      onClick={clickHandler}
    ></div>
  );
};

export default Palet;
