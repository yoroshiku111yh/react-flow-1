import { Handle, NodeProps, Position } from "reactflow";
import { NodeTypeHoC } from "../../types/node.type";
import updateNodeHOC from "../../hocs/updateNodeHoc";

function ComponentNodeSelect(props: NodeTypeHoC<string>) {
  const { node, updateDataOutput, setNodeValue } = props;
  const { data } = node;
  const onChange = (value: string) => {
    setNodeValue(value);
    updateDataOutput();
  };
  return (
    <div className="rounded text-base text-gray-200 bg-[#363533] p-2 px-6">
      <b>Source : </b>
      <br />
      <div className="flex inline-flex gap-2 items-center justify-start">
        <h4>
          {" "}
          {data.label}
          <small> ({data.type})</small>
        </h4>
      </div>
      <select
        defaultValue={data.value}
        onChange={(evt) => onChange(evt.target.value)}
        className="bg-[#404141] text-white p-2 rounded text-base ml-2"
      >
        {data?.listSelect.map(
          (ease: { value: string; label: string }, index: number) => {
            return (
              <option key={index} value={ease.value}>
                {ease.label}
              </option>
            );
          }
        )}
      </select>
      <Handle
        className="custom-handle !bg-[#363533] -right-[10px]"
        type="source"
        position={Position.Right}
        id={data.key}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-1/2 h-1/2 rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </div>
      </Handle>
    </div>
  );
}

export default function NodeSelect(props: NodeProps) {
  const Comp = updateNodeHOC(ComponentNodeSelect);
  return <Comp {...props} />;
}
