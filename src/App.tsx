import { useState } from "react";
import { v4 } from "uuid";
import ReactFlow, {
  addEdge,
  Connection,
  Controls,
  Edge,
  FitViewOptions,
  MiniMap,
  updateEdge,
  useEdgesState,
  useNodesState,
  Node,
} from "react-flow-renderer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  Diagram,
  useGetDiagramQuery,
  useSaveDiagramMutation,
} from "./features/diagramSlice/diagramSlice";
import { useEffect } from "react";

function App() {
  const fitViewOptions: FitViewOptions = {
    padding: 0.2,
  };

  const { data, error, isLoading, isSuccess } = useGetDiagramQuery();

  const [saveDiagram, result] = useSaveDiagramMutation();

  const [myNodes, setNodes, onNodesChange] = useNodesState(
    Array.isArray(data) && data.length ? data[0].diagram[0].nodes : []
  );
  const [myEdges, setEdges, onEdgesChange] = useEdgesState(
    Array.isArray(data) && data.length ? data[0].diagram[1].edges : []
  );

  useEffect(() => {
    if (isSuccess && Array.isArray(data) && data.length) {
      setNodes(data[0].diagram[0].nodes);
      setEdges(data[0].diagram[1].edges);
    }
  }, [setNodes, data]);

  const onEdgeUpdate = (oldEdge: Edge, newConnection: Connection) => {
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  };
  const onConnect = (params: Edge | Connection) => {
    return setEdges((els) => addEdge(params, els));
  };

  if (isLoading) {
    return <h1>Wait its loading</h1>;
  }

  async function handleSaveDiagram() {
    const newDiagram: Diagram = {
      id: data[0].id,
      diagram: [
        {
          nodes: myNodes,
        },
        {
          edges: myEdges,
        },
      ],
    };

    await saveDiagram(newDiagram).unwrap();
  }

  return (
    <div className="App">
      <ReactFlow
        nodes={myNodes}
        edges={myEdges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onEdgeUpdate={onEdgeUpdate}
        onConnect={onConnect}
        style={{ height: "500px" }}
        fitView
        fitViewOptions={fitViewOptions}
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
      <button onClick={handleSaveDiagram}>Сохранить</button>
    </div>
  );
}

export default App;
