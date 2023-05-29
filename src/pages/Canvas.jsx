import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlinePicCenter,
  AiOutlineMore,
  AiOutlineClear,
  AiOutlineDownload,
} from "react-icons/ai";
import { TfiPencil, TfiEraser } from "react-icons/tfi";
import { MdUndo } from "react-icons/md";
// import { useSearchParams } from "react-router-dom";
import CanvasDraw from "react-canvas-draw";
import PencilDropdown from "../components/PencilDropdown";
import MoreDropdown from "../components/MoreDropdown";
// import { client, account, databases } from "../appwrite/appwriteConfig";
const Canvas = ({ settings, setSettings, canvasData, setProject, project }) => {
  console.log(canvasData);
  const canvasDraw = useRef();
  const [more, setMore] = useState(false);
  const [pencil, setpencil] = useState(false);
  const [eraser, seteraser] = useState(false);
  const [showCanvasBackgroundDropdown, setshowCanvasBackgroundDropdown] =
    useState(false);
  
  useEffect(() => {
    console.log(canvasData);
    if(canvasData){
      console.log(canvasData);
      canvasDraw?.current?.loadSaveData(canvasData, true);
    }
  }, []);
  useEffect(() => {
    setSettings(JSON?.parse(localStorage?.getItem("canvasSettings")));
  }, [setSettings]);
  function handleEraserClick() {
    if (eraser) {
      seteraser(false);
    } else {
      setpencil(false);
      setMore(false);
      seteraser(true);
      setshowCanvasBackgroundDropdown(false);
    }
    setSettings({
      ...settings,
      brushColor: settings?.canvasColor,
    });
  }
  async function downloadImage(imageSrc, nameOfDownload = "my-image.jpeg") {
    const response = await fetch(imageSrc);

    const blobImage = await response.blob();

    const href = URL.createObjectURL(blobImage);

    const anchorElement = document.createElement("a");
    anchorElement.href = href;
    anchorElement.download = nameOfDownload;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  }
  function handlePencilClick(e) {
    e.preventDefault();
    if (pencil) {
      setpencil(false);
      return;
    }
    setpencil(true);
    setMore(false);
    seteraser(false);
    setshowCanvasBackgroundDropdown(false);
  }
  function handleBackgroundClick(e) {
    e.preventDefault();
    if (showCanvasBackgroundDropdown) {
      setshowCanvasBackgroundDropdown(false);
    } else {
      setshowCanvasBackgroundDropdown(true);
      setMore(false);
      seteraser(false);
      setpencil(false);
    }
  }
  function handleDownloadClick(e) {
    const data = canvasDraw?.current
      ?.getDataURL("img/jpeg", "", settings?.canvasColor)
      .replace("image/jpeg", "image/octet-stream");
    let image = new Image();
    image.src = data;
    downloadImage(image.src);
  }
  function handleMoreClick(e) {
    if (more) {
      setMore(false);
    } else {
      setMore(true);
      seteraser(false);
      setpencil(false);
      setshowCanvasBackgroundDropdown(false);
    }
  }
  function onLeave() {
    seteraser(false);
    setpencil(false);
    setMore(false);
    setshowCanvasBackgroundDropdown(false);
  }

  return (
    <div className="w-full h-full relative bg-slate-600">
      <ul
        onMouseLeave={onLeave}
        className="absolute z-10 bg-white left-[50%] flex items-center gap-6 text-lg font-semibold p-4 rounded-3xl top-3 shadow-xl border translate-x-[-50%]"
      >
        <li>
          <TfiPencil
            className="inline font-black text-xl cursor-pointer"
            onClick={handlePencilClick}
          />
          <PencilDropdown
            show={pencil}
            setSettings={setSettings}
            settings={settings}
          />
        </li>
        <li>
          <TfiEraser
            className="inline font-black text-xl cursor-pointer"
            onClick={handleEraserClick}
          />
          <PencilDropdown
            show={eraser}
            setSettings={setSettings}
            settings={settings}
            eraser={true}
          />
        </li>
        <li>
          <AiOutlinePicCenter
            className="inline font-black text-xl cursor-pointer"
            onClick={handleBackgroundClick}
          />
          <PencilDropdown
            show={showCanvasBackgroundDropdown}
            setSettings={setSettings}
            settings={settings}
            canvasBackground={true}
          />
        </li>
        <li>
          <AiOutlineClear
            className="inline font-black text-xl cursor-pointer"
            onClick={() => canvasDraw?.current?.eraseAll()}
          />
        </li>
        <li>
          <AiOutlineDownload
            className="inline font-black text-xl cursor-pointer"
            onClick={handleDownloadClick}
          />
        </li>
        <li>
          <MdUndo
            className="inline font-black text-xl cursor-pointer"
            onClick={() => canvasDraw?.current?.undo()}
          />
        </li>
        <li>
          <AiOutlineMore
            className="inline font-black text-xl cursor-pointer"
            onClick={handleMoreClick}
          />

          <MoreDropdown
            more={more}
            settings={settings}
            setSettings={setSettings}
          />
        </li>
      </ul>

      <CanvasDraw
        ref={canvasDraw}
        onChange={() => {
          setProject({
            ...project,
            canvas: canvasDraw.current.getSaveData(),
          });
        }}
        loadTimeOffset={0}
        lazyRadius={Number(settings?.lazyRadius)}
        brushRadius={Number(settings?.brushSize)}
        brushColor={settings?.brushColor}
        // catenaryColor={"#0a0302"}
        gridColor={settings?.gridColor}
        hideGrid={settings?.showGrids}
        canvasWidth={window.innerWidth - 230}
        canvasHeight={window.innerHeight}
        disabled={false}
        imgSrc={""}
        saveData={canvasData}
        immediateLoading={true}
        hideInterface={settings?.hideInterface}
        gridSizeX={25}
        gridSizeY={25}
        gridLineWidth={0.5}
        clampLinesToDocument={false}
        // hideGridX={}
        // hideGridY={settings.showGrids}
        enablePanAndZoom={true}
        mouseZoomFactor={0.001}
        zoomExtents={{ min: 0.33, max: 3 }}
        backgroundColor={settings?.canvasColor}
      />
    </div>
  );
  // return (
  //   <div>
  //     <label htmlFor="name" className="mr-4">
  //       Name
  //     </label>
  //     <input
  //       type="text"
  //       onChange={(e) =>
  //         setCurrentData({ ...currentData, roomName: e.target.value })
  //       }
  //       name="name"
  //       className="text-black border"
  //     />
  //     <button
  //       className="border bg-slate-800 text-white p-2 rounded"
  //       onClick={updateName}
  //     >
  //       update
  //     </button>
  //     <h1>room name is {currentData?.roomName}</h1>
  //   </div>
  // );
};

export default Canvas;
