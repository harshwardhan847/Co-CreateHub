import React, { useEffect, useRef, useState } from "react";

import { useSearchParams } from "react-router-dom";
import CanvasDraw from "react-canvas-draw";
import { client, account, databases } from "../appwrite/appwriteConfig";
const Canvas = () => {
  const [params] = useSearchParams();
  const canvasDraw = useRef();
  const [currentData, setCurrentData] = useState({
    roomName: "",
    firstName: "",
    lastName: "",
    password: "",
    canvasData: "",
  });
  const documentId = params?.get("room");
  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.6465138ecda20c9f16fc.collections.64665b3ccc38f6b475fd.documents.${documentId}`,

      (response) => {
        console.log(response);
        const data = response?.payload;
        setCurrentData({
          roomName: data?.roomName,
          firstName: data?.firstName,
          lastName: data?.lastName,
          password: data?.password,
          canvasData: data?.canvasData,
        });
        canvasDraw?.current?.loadSaveData(data?.canvasData, true);
      }
    );

    return () => {
      unsubscribe();
    };
  });

  useEffect(() => {
    getRoom(documentId);
  }, [documentId]);

  async function getRoom(id) {
    const promise = databases.getDocument(
      "6465138ecda20c9f16fc",
      "64665b3ccc38f6b475fd",
      id
    );
    promise.then(
      function (response) {
        console.log(response);
        setCurrentData({
          roomName: response?.roomName,
          firstName: response?.firstName,
          lastName: response?.lastName,
          password: response?.password,
          canvasData: response?.canvasData,
        });
      },
      function (err) {
        console.log(err);
      }
    );
  }

  const updateRoom = async () => {
    const promise = databases.updateDocument(
      "6465138ecda20c9f16fc",
      "64665b3ccc38f6b475fd",
      documentId,
      {
        roomName: currentData?.roomName,
        firstName: currentData?.firstName,
        lastName: currentData?.lastName,
        password: currentData?.password,
        canvasData: canvasDraw?.current?.getSaveData(),
      }
    );
    promise.then(
      function (response) {
        console.log(response);
      },
      function (err) {
        console.log(err);
      }
    );
  };
  function handleCanvasChange() {
    // e.preventDefault();
    console.log(canvasDraw?.current?.getSaveData());
    setCurrentData({
      ...currentData,
      canvasData: canvasDraw?.current?.getSaveData(),
    });

    updateRoom();
  }
  return (
    <div className="w-full h-full bg-slate-600">
      <button onClick={() => canvasDraw?.current?.eraseAll()}>Erase</button>
      <CanvasDraw
        ref={canvasDraw}
        onChange={(e) => handleCanvasChange()}
        loadTimeOffset={0}
        lazyRadius={30}
        brushRadius={12}
        brushColor={"#444"}
        catenaryColor={"#0a0302"}
        gridColor={"rgba(150,150,150,0.17)"}
        hideGrid={false}
        canvasWidth={800}
        canvasHeight={800}
        disabled={false}
        imgSrc={""}
        saveData={`${currentData?.canvasData}`}
        immediateLoading={false}
        hideInterface={false}
        gridSizeX={25}
        gridSizeY={25}
        gridLineWidth={0.5}
        hideGridX={false}
        hideGridY={false}
        enablePanAndZoom={false}
        mouseZoomFactor={0.01}
        zoomExtents={{ min: 0.33, max: 3 }}
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
