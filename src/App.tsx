import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  useReactFlow,
  Node,
  ReactFlowProvider,
} from "reactflow";
import "./App.css";
import "reactflow/dist/base.css";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import NodeTargetElm from "./components/customNodes/NodeTargetElm";
import PopupListNode from "./components/PopupListNode";
import patch from "./data/patch";
import NodeToggle from "./components/customNodes/NodeToggle";
import NodeSelect from "./components/customNodes/NodeSelect";
import {
  TypeFetchData,
  fetchedData,
  nodeTargetAfterFetchedData,
} from "./fetchedDataInit";
import { updateDataObjectInArrayByKey } from "./function/updateDataArryByKey";

interface TypeContext {
  dataOutput: TypeFetchData[];
  updateDataOutput: (newData: TypeFetchData[]) => void;
}

export const UseContext = createContext<TypeContext>({
  dataOutput: [],
  updateDataOutput: () => {},
});

const nodeTypes = {
  nodeTargetElm: NodeTargetElm,
  nodeToggle: NodeToggle,
  nodeSelect: NodeSelect,
};

interface TypePopupListNode {
  isShow: boolean;
  offset: {
    x: number;
    y: number;
  };
}
function Diagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    nodeTargetAfterFetchedData
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition, getNode } = useReactFlow();
  const [popup, setPopup] = useState<TypePopupListNode>({
    isShow: false,
    offset: { x: 0, y: 0 },
  });
  ////////////////////
  const { dataOutput, updateDataOutput } = useContext(UseContext);
  useEffect(() => {
    setNodes((nds) =>
      nds.map((nd) => {
        const dataFind = dataOutput.find((data) => data.id === nd.id);
        if (dataFind) {
          nd.data = {
            ...nd.data,
            select: {
              ...nd.data.select,
              ...dataFind.data,
            },
          };
        }
        return nd;
      })
    );
  }, [JSON.stringify(dataOutput)]);
  ////////////////////
  const onConnect = useCallback((params: Connection) => {
    const nodeSource = getNode(params.source || "");
    const nodeTarget = getNode(params.target || "");
    if (params.sourceHandle === params.targetHandle) {
      if (nodeTarget?.type === "nodeTargetElm") {
        const updatedData = updateDataObjectInArrayByKey(dataOutput, {
          key : nodeSource?.data.key,
          value : nodeSource?.data.value,
          id : nodeTarget.id
        });
        if(updatedData){
          updateDataOutput(Object.assign([],dataOutput,{[updatedData.index] : updatedData.data}));
        }
      }
    }
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const addNodePatch = (idPatch: string) => {
    const patchData = patch.find((item) => item.id === idPatch);
    const id = Math.floor(Math.random() * 100);
    const newNode: Node = {
      id: id.toString(),
      position: screenToFlowPosition({
        x: popup.offset.x,
        y: popup.offset.y,
      }),
      type: patchData?.type,
      data: patchData?.data,
    };
    setNodes((nds) => nds.concat(newNode));
    setPopup({ ...{}, ...popup, ...{ isShow: false } });
  };
  const doubleClick = (event: React.MouseEvent) => {
    if (event.detail === 2) {
      const target = event.target as Element;
      if (target.classList.contains("react-flow__pane")) {
        setPopup({
          ...{},
          ...popup,
          ...{ isShow: true, offset: { x: event.clientX, y: event.clientY } },
        });
      }
    } else {
      setPopup({ ...{}, ...popup, ...{ isShow: false } });
    }
  };
  const dataPopup = patch.map((item) => {
    return {
      label: item.headline,
      id: item.id,
    };
  });
  return (
    <>
      <ReactFlow
        onClick={doubleClick}
        style={{ background: "#43464a" }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        isValidConnection={(connection:Connection) => {
          return connection.sourceHandle === connection.targetHandle
        }}
        fitView
      >
        <MiniMap />
        <Background color="#ccc" gap={16} size={1} />
        <Controls />
      </ReactFlow>
      {popup.isShow && (
        <PopupListNode
          eventClick={addNodePatch}
          listData={dataPopup}
          offset={popup.offset}
        />
      )}
    </>
  );
}

export default function App() {
  const [data, setData] = useState<TypeFetchData[]>(fetchedData);
  return (
    <UseContext.Provider
      value={{
        dataOutput: data,
        updateDataOutput: (newData: TypeFetchData[]) => setData(newData),
      }}
    >
      <ReactFlowProvider>
        <Diagram />
      </ReactFlowProvider>
      <BlockAnimate  {...data}/>
    </UseContext.Provider>
  );
}

function BlockAnimate(props:TypeFetchData[]){
  
  return(
    <div className="absolute w-96 aspect-square bg-white top-4 right-4 border-red-400 border-2 overflow-hidden">
        <div style={{animation : `animate 2s alternate infinite 0.2s ${props[0].data.ease.value}`}} className={`w-[100px] aspect-square rounded-full bg-red-700 absolute bottom-4 left-10 ${props[0].data.visible.value || 'opacity-0'}`}></div>
        <div style={{animation : `animate 2s alternate infinite ${props[1].data.ease.value}`}} className={`animation-demo w-[100px] aspect-square bg-blue-700 absolute bottom-4 right-10 ${props[1].data.visible.value || 'opacity-0'}`}></div>
      </div>
  )
}
