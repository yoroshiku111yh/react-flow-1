import { Handle, NodeProps, Position } from "reactflow";
import { TypeDataValue } from "../../fetchedDataInit";

export default function NodeTargetElm(props: NodeProps) {
  const { data } = props;
  const listOption = [];
  for (const property in data.select) {
    const item: TypeDataValue = data.select[property];
    const elm = (
      <div key={listOption.length} className="relative">
        <h4>
          {item.label} : {item.value?.toString() || "null"}{" "}
          <small>({item.type})</small>
        </h4>
        <Handle
          className="custom-handle w-4 h-4 !bg-yellow-300 -left-[20px]"
          type="target"
          position={Position.Left}
          id={property}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-1/2 h-1/2"
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
    listOption.push(elm);
  }
  return (
    <div className="rounded text-base text-gray-600 bg-yellow-300 p-2 px-3">
      <div className="flex gap-1 items-center">
        <b>Element : </b>
        <h4> {data.label}</h4>
      </div>
      {listOption}
    </div>
  );
}
