import React, { useEffect, useRef } from "react";
import {
  Options,
  Edge,
  Node,
  DataSet,
  Network
} from "vis-network/standalone/esm/vis-network";

 const OriginalGraphComponent=({originalGraphData}) => {

  
  const originalGraphRef = useRef(null);

  

  useEffect(() => {
    const nodes = (originalGraphData.nodes);
    const edges = (originalGraphData.edges);
    let network1;
    if (!network1) {
      network1 = new Network(
        originalGraphRef.current,
        {
          nodes: nodes,
          edges: edges,
        },
        {
          //options
        }
      );
      
    }
  }, [originalGraphData]);


  return (
    <>
        <div className="container w-[50rem] h-[40rem] border border-black bg-white">
          <div style={{ height: "100%", width: "100%" }} ref={originalGraphRef} key="1"/>
        </div>
    </>
  );
};


export default OriginalGraphComponent;