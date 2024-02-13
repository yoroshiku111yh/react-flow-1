import { Edge, Node} from "reactflow";
import { TypeFetchData } from "../fetchedDataInit";
import { updateDataObjectInArrayByKey } from "./updateDataArryByKey";

interface TypeInput {
  id: string;
  dataInput: TypeFetchData[];
  edges : Edge[],
  nodeSource : Node
}

export default function getDataUpdatedNode(props: TypeInput) {
  const { id, dataInput, edges, nodeSource } = props;
  const edgesBelongToThisId = edges.filter((edge) => edge.source === id);
  const dataUpdate = [...dataInput];
  let isUpdate = false;
  for (let i = 0; i < edgesBelongToThisId.length; i++) {
    const edge = edgesBelongToThisId[i];
    if (edge.sourceHandle === edge.targetHandle) {
      isUpdate = true;
      const indexTarget = dataUpdate.findIndex(
        (node) => node.id === edge.target
      );
      if (indexTarget !== -1) {
        const updatedData = updateDataObjectInArrayByKey(dataUpdate, {
          key: nodeSource?.data.key,
          value: nodeSource?.data.value,
          id: dataUpdate[indexTarget].id,
        });
        if (updatedData) {
          dataUpdate[updatedData.index] = updatedData.data;
        }
      }
    }
  }
  return isUpdate ? dataUpdate : [];
}
