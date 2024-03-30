import React, { useEffect, useRef } from "react";
import {
  Options,
  Edge,
  Node,
  DataSet,
  Network
} from "vis-network/standalone/esm/vis-network";

 const DijkstraGraphComponent=({dijkstraAlgoGraphData}) => {
  
  const dijkstraGraphRef = useRef(null);


  useEffect(() => {
    const nodes = (dijkstraAlgoGraphData.nodes);
    const edges = (dijkstraAlgoGraphData.edges);
    let network1;
    if (!network1) {
      network1 = new Network(
        dijkstraGraphRef.current,
        {
          nodes: nodes,
          edges: edges,
        },
        {
          //options
        }
      );
    }
  }, [dijkstraAlgoGraphData]);


  return (
    <>
        <div className="container w-[50rem] h-[40rem] border border-black bg-white">
          <div style={{ height: "100%", width: "100%" }} ref={dijkstraGraphRef} key="9"/>
        </div>
    </>
  );
};


export default DijkstraGraphComponent;