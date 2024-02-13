interface NodeData {
  label: string;
  id: string;
}
interface TypePopupListNode {
  listData: NodeData[];
  offset: {
    x: number;
    y: number;
  };
  eventClick : (id : string) => void;
}

export default function PopupListNode(props: TypePopupListNode) {
    const listItem = props.listData.map((item, index) => {
        return(
            <div onClick={() => { props.eventClick(item.id) }} className="text-gray-400 text-base leading-snug mb-2 cursor-pointer" key={index}>{item.label}</div>
        )
    })
  return (
    <div
      style={{
        transform: `translate(${props.offset.x}px, ${props.offset.y}px)`,
      }}
      className=" shadow-sm p-4 z-50 rounded absolute top-0 left-0 origin-top-right bg-gray-800 w-[200px] min-h-16"
    >
        <h4 className="text-lg font-bold text-gray-400 pb-2">Patch:</h4>
        <hr className="pb-2"></hr>
        {listItem}
    </div>
  );
}
