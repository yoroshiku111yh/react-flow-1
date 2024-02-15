import { NodeProps, useReactFlow } from "reactflow";
import getDataUpdatedNode from "../function/getDataUpdatedNode";
import { useContext } from "react";
import { UseContext } from "../App";

export default function updateNodeHOC(Component: React.ComponentType<any>) {
  return (props: NodeProps) => {
    const { dataOutput, updateDataOutput } = useContext(UseContext);
    const { id } = props;
    const { setNodes, getEdges, getNode } = useReactFlow();
    const handleUpdateDataOutput = () => {
      const edges = getEdges();
      const nodeSource = getNode(id);
      if (nodeSource) {
        const dataUpdated = getDataUpdatedNode({
          id: id,
          nodeSource: nodeSource,
          edges: edges,
          dataInput: dataOutput,
        });

        if (dataUpdated.length > 0) {
          updateDataOutput(dataUpdated);
        }
      }
    };
    const setNodesValue = (value: boolean) => {
      setNodes((nds) =>
        nds.map((nd) => {
          if (nd.id === id) {
            nd.data = {
              ...nd.data,
              value: value,
            };
          }
          return nd;
        })
      );
    };
    return <Component updateDataOutput={handleUpdateDataOutput} setNodeValue={setNodesValue} node={props} />;
  };
}
