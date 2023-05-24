import React from "react";
import Palet from "./Palet";

const PencilDropdown = ({
  show,
  setSettings,
  settings,
  canvasBackground,
  eraser,
}) => {
  function complementryRGBColor(r, g, b) {
    if (Math.max(r, g, b) === Math.min(r, g, b)) {
      return [255 - r, 255 - g, 255 - b];
    } else {
      r = r / 255;
      g = g / 255;
      b = b / 255;
      var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      var h,
        s,
        l = (max + min) / 2;
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h = Math.round(h * 60 + 180) % 360;
      h /= 360;

      function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);

      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
  }

  function complementryHexColor(hex) {
    console.log(hex);
    if (hex[0] !== "#") {
      hex
        .substring(4, hex.length - 1)
        .replace(/ /g, "")
        .split(",");
      console.log(hex);
      let r = hex[0],
        g = hex[1],
        b = hex[2];
      [r, g, b] = complementryRGBColor(r, g, b);
      return (
        "#" +
        (r < 16 ? "0" + r.toString(16) : r.toString(16)) +
        (g < 16 ? "0" + g.toString(16) : g.toString(16)) +
        (b < 16 ? "0" + b.toString(16) : b.toString(16))
      );
    }
    let r =
      hex.length === 4
        ? parseInt(hex[1] + hex[1], 16)
        : parseInt(hex.slice(1, 3), 16);
    let g =
      hex.length === 4
        ? parseInt(hex[2] + hex[2], 16)
        : parseInt(hex.slice(3, 5), 16);
    let b =
      hex.length === 4
        ? parseInt(hex[3] + hex[3], 16)
        : parseInt(hex.slice(5), 16);

    [r, g, b] = complementryRGBColor(r, g, b);
    return (
      "#" +
      (r < 16 ? "0" + r.toString(16) : r.toString(16)) +
      (g < 16 ? "0" + g.toString(16) : g.toString(16)) +
      (b < 16 ? "0" + b.toString(16) : b.toString(16))
    );
  }

  function handleColorInput(e) {
    if (canvasBackground) {
      setSettings({
        ...settings,
        canvasColor: e?.target?.value,
        gridColor: complementryHexColor(e?.target?.value)
      });
      return;
    }
    setSettings({
      ...settings,
      brushColor: e.target.value,
    });
  }
  return (
    <div
      className={`absolute ${
        show ? "" : "hidden"
      } border-b-[15px] border-b-slate-800 w-0 h-0 border-r-[transparent] border-r-[15px] border-l-[transparent] border-l-[15px]`}
    >
      <div className="bg-slate-800 w-fit p-2 relative bottom-[-15px] left-[-30px] text-white rounded-lg flex flex-col gap-4">
        {!eraser && (
          <div className="flex gap-2">
            <Palet
              color={"bg-red-500"}
              colorVal="rgb(239 68 68)"
              settings={settings}
              setSettings={setSettings}
              canvasBackground={canvasBackground}
            />
            <Palet
              color={"bg-green-500"}
              colorVal="rgb(34 197 94)"
              settings={settings}
              setSettings={setSettings}
              canvasBackground={canvasBackground}
            />
            <Palet
              color={"bg-yellow-500"}
              colorVal="rgb(234 179 8)"
              settings={settings}
              setSettings={setSettings}
              canvasBackground={canvasBackground}
            />
            <Palet
              color={"bg-orange-500"}
              colorVal="rgb(249 115 22)"
              settings={settings}
              setSettings={setSettings}
              canvasBackground={canvasBackground}
            />
            <Palet
              color={"bg-black"}
              colorVal="rgb(0 0 0)"
              settings={settings}
              setSettings={setSettings}
              canvasBackground={canvasBackground}
            />
            <input
              type="color"
              className={`w-8 h-8 rounded-full bg-transparent appearance-none border-none outline-none relative cursor-pointer `}
              onChange={handleColorInput}
            />
          </div>
        )}
        {!canvasBackground && (
          <input
            type="range"
            name="Brush Size"
            id=""
            min={1}
            value={settings.brushSize}
            max={100}
            className={`${eraser ? "" : "w-full"}`}
            onChange={(e) =>
              setSettings({ ...settings, brushSize: e.target.value })
            }
          />
        )}
      </div>
    </div>
  );
};

export default PencilDropdown;
