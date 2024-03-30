import React, { useEffect, useRef } from "react";
import ProjectController from "../controller/ProjectController";
import OriginalGraphComponent from "./OriginalGraphComponent";
import DijkstraGraphComponent from "./DijkstraGraphComponent";
// import ParticleJsBackGround from "../particleJS/ParticleJsBackGround";

const TEXT = {
  FIND_BUTTON: "Find Shortest Path",
  NEW_GRAPH_BUTTON: "Generate New Graph",
  STARTING_CITY_LABEL: "Enter Starting City Id:",
};

const ProjectView = () => {
  const {
    originalGraphData,
    dijkstraAlgoGraphData,
    onFind,
    setDijkstraAlgoGraphData,
    setOriginalGraphData,
    text,
    displayData,
    onReset,
  } = ProjectController();

  return (
    <div className="">
      <div className="text-italic text-5xl flex justify-center mt-[2rem] text-white">
        SHORTEST PATH GRAPH VISUALIZER
      </div>
      <div className="text-italic text-2xl flex justify-center mt-[1rem] text-white">
        Using Dijkstra's Algorithm
      </div>

      <div className="flex justify-center mt-5 gap-6">

        <div className="">
          <div className="mt-[2rem] mb-[1rem] text-white">
            <div> Blue route-> AirWays</div>
            <div> orange route-> Roadways</div>
          </div>
          <OriginalGraphComponent originalGraphData={originalGraphData} />
        </div>

        <div className="mt-[6rem]" >
        <DijkstraGraphComponent dijkstraAlgoGraphData={dijkstraAlgoGraphData} />
        </div>

      </div>

      <div className="flex justify-center ml-[4rem] mt-5 gap-1  mb-[5rem]">
        <div className="border border-black p-2 w-[30rem] bg-white">
          {displayData}
        </div>

        <div className="mt-[3rem]">
          <div className="flex ml-[9rem] h-[6rem] gap-[5rem]">
            <div>
              <div className="text-white">{TEXT.STARTING_CITY_LABEL}</div>
              <input
                value={text.fromText}
                onChange={(event) => {
                  text.setFromText(event.target.value);
                  text.setTotDistance(0);
                }}
                className="p-2  rounded-md h-[3rem] text-lg border border-black"
              />
            </div>

            <div>
              <div className="text-white">Enter Destination City Id:</div>
              <input
                value={text.toText}
                onChange={(event) => {
                  text.setToText(event.target.value);
                  text.setTotDistance(0);
                }}
                className="p-2  rounded-md  h-[3rem] text-lg border border-black"
              />
            </div>

            <div>
              <div className="text-white">Total Distance:</div>
              <input
                value={text.totDistance}
                disabled
                className="p-2 bg-white rounded-md  h-[3rem] text-lg border border-black"
              />
            </div>
          </div>

          <div className="flex ml-[9rem] mt-4  gap-6">
            <button
              onClick={() => {
                onFind(
                  setDijkstraAlgoGraphData,
                  originalGraphData,
                  text.fromText,
                  text.toText,
                  text.setTotDistance
                );
              }}
              className="bg-blue-500 p-2 h-[3rem]  rounded-md hover:bg-blue-700 text-white text-lg"
            >
              {TEXT.FIND_BUTTON}
            </button>
            <button
              onClick={() => {
                onReset(setOriginalGraphData);
              }}
              className="bg-blue-500 p-2 h-[3rem] ml-[7rem] rounded-md hover:bg-blue-700 text-white text-lg"
            >
              {TEXT.NEW_GRAPH_BUTTON}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // return(
  //   <>
  //   <ParticleJsBackGround />
  //   </>
  // )
};

export default ProjectView;