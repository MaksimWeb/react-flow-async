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
} from 'react-flow-renderer';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getEdges, getNodes } from './features/diagramSlice/diagramSlice';
import { initialEdges } from './data/edges';
import { initialNodes } from './data/nodes';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch();
  const fitViewOptions: FitViewOptions = {
    padding: 0.2,
  };

  const { nodes, edges } = useAppSelector((state) => state.diagrams);

  const [myNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [myEdges, setEdges, onEdgesChange] = useEdgesState(edges);

  useEffect(() => {
    dispatch(getNodes());
    setNodes(nodes);
  }, [myNodes, setNodes]);

  useEffect(() => {
    dispatch(getEdges());
    setEdges(edges);
  }, [myEdges, setEdges]);

  const onEdgeUpdate = (oldEdge: Edge, newConnection: Connection) => {
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  };
  const onConnect = (params: Edge | Connection) => {
    return setEdges((els) => addEdge(params, els));
  };

  return (
    <div className='App'>
      <ReactFlow
        nodes={myNodes}
        edges={myEdges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onEdgeUpdate={onEdgeUpdate}
        onConnect={onConnect}
        style={{ height: '500px' }}
        fitView
        fitViewOptions={fitViewOptions}
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
      <button>Сохранить</button>
    </div>
  );
}

export default App;
