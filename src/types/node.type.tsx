import { NodeProps } from "reactflow";

export interface NodeTypeHoC<T> {
    node : NodeProps,
    updateDataOutput : () => void;
    setNodeValue : (value:T) => void
}