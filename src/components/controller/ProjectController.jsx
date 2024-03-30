import React, { useEffect, useState } from "react";
const _ = require("lodash");

function createData() {
  const cities = [
    "Bangalore",
    "Delhi",
    "Mumbai",
    "Gujarat",
    "Chandigarh",
    "Goa",
    "Kanpur",
    "Jammu",
    "Hyderabad",
    "Lucknow",
    "Chennai",
    "Meghalaya",
    "Patna",
    "Kochi",
    "Ahemedbad",
    "Agra",
    "Varanasi",
    "Jodhpur",
    "Jhansi",
    "Mathura",
  ];

  const V = Math.floor(Math.random() * cities.length) + 3;
  //const V = 20;

  let vertices = [];
  for (let i = 0; i < V; i++) {
    if(i===0) vertices.push({ id: i, label: "Mascow" });
    else vertices.push({ id: i, label: cities[i - 1] });
  }

  let edges = [];
  for (let i = 1; i < V; i++) {
    for (let j = 1; j <= 1; j++) {
      let neigh = Math.floor(Math.random() * i);

      edges.push({
        from: i,
        to: neigh,
        color: "orange",
        label: String(Math.floor(Math.random() * 70) + 30),
      });
    }
  }

  if(vertices.length>4)
  for (let i = 4; i < V; i++) {
    for (let j = 1; j <= 1; j++) {
      let neigh = Math.floor(Math.random() * i);

      edges.push({
        from: i,
        to: neigh,
        color: "blue",
        label: String(Math.floor(Math.random() * 70) + 30),
      });
    }
  }

  const data = {
    nodes: vertices,
    edges: edges,
  };

  return data;
}

function createShortestPath(src, edgeCopy, nodes) {
  const V = nodes.length + 2;

  let adj = new Array(V).fill().map(() => []);

  for (let i = 0; i < edgeCopy.length; i++) {
    let source = edgeCopy[i].from;
    let dest = edgeCopy[i].to;
    let weight = parseInt(edgeCopy[i].label);

    adj[source].push([dest, weight]);
    adj[dest].push([source, weight]);
  }

  let vis = Array(V).fill(0);
  let dist = [];

  for (let i = 0; i < V; i++) {
    dist.push([100000, -1]);
  }

  dist[src][0] = 0;

  for (let i = 0; i < V - 1; i++) {
    let mn = -1;
    for (let j = 0; j < V; j++) {
      if (vis[j] === 0) {
        if (mn === -1 || dist[j][0] < dist[mn][0]) mn = j;
      }
    }

    vis[mn] = 1;
    for (let j = 0; j < adj[mn].length; j++) {
      let x = adj[mn][j];
      if (vis[x[0]] === 0 && dist[x[0]][0] > dist[mn][0] + x[1]) {
        dist[x[0]][0] = dist[mn][0] + x[1];
        dist[x[0]][1] = mn;
      }
    }
  }

  return dist;
}

function connectGraph(dist, node1, node2, nodes, originalGraphData) {
  let start = node2;
  let de = dist[node2][1];

  let edge = [];

  while (de !== -1) {
    let wei = dist[start][0] - dist[de][0];

    const color = originalGraphData.edges.find(item => item.from === start && item.to === de)?.color || 'orange';
  
    edge.push({
      from: start,
      to: de,
      color: color,
      label: wei.toString(),
    });

    start = de;
    de = dist[start][1];
  }
  const data = {
    nodes: nodes,
    edges: edge,
  };
  
  return data;
}

const onFind = (setDijkstraAlgoGraphData,originalGraphData,src,to,setTotDistance) => {
  
  if(src<0 || src>=originalGraphData.nodes.length || to<0 || to>=originalGraphData.nodes.length || src==="" || to==="" || src===null || to===null )
  {
    alert("Please enter a valid start and destination ID");
    return;
  }

  const distanceArray = createShortestPath(
    src,
    _.cloneDeep(originalGraphData.edges),
    _.cloneDeep(originalGraphData.nodes)
  );

  setTotDistance(distanceArray[to][0]);

  const resultGraph = connectGraph(
    distanceArray,
    src,
    to,
    _.cloneDeep(originalGraphData.nodes),
    originalGraphData,
  );

  setDijkstraAlgoGraphData({ ..._.cloneDeep(resultGraph) });

};

const onReset = (setOriginalGraphData)=>{
  setOriginalGraphData(createData());
};

const ProjectController = () => {
  const [originalGraphData, setOriginalGraphData] = useState(createData());
  const [dijkstraAlgoGraphData, setDijkstraAlgoGraphData] = useState([]);
  const [fromText,setFromText] = useState("");
  const [toText,setToText] = useState("");
  const [totDistance,setTotDistance] = useState(0);

  const [displayData,setDisplayData] =useState([]);

  useEffect(() => {
    setDisplayData(
      originalGraphData.nodes.map(item => (
        <div key={item.id} className="flex gap-2">
            <div>{item.id}</div> : <div>{item.label}</div>
          </div>
      ))
    );
  }, [originalGraphData]);
  

  return {
    originalGraphData,
    dijkstraAlgoGraphData,
    onFind,
    setDijkstraAlgoGraphData,
    setOriginalGraphData,
    text:{
      fromText,
      setFromText,
      toText,
      setToText,
      totDistance,
      setTotDistance,
    },
    displayData,
    onReset,
  };
};


export default ProjectController;
