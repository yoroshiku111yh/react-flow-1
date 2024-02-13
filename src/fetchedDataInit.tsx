export interface keyable<T> {
  [key : string] : T
}

interface TypeDataValue {
  value : string | null | boolean | undefined | number;
  type : string,
  label : string,
}

export interface TypeFetchData {
    data : keyable<TypeDataValue>;
    id : string,
    name : string
}

export const fetchedData = [
    {
      data: {
        visible: {
          value: true,
          type: "boolean",
          label: "Visible",
        },
        ease: {
          value: "none",
          type: "ease",
          label: "Easing",
        },
      },
      name: "Circle",
      id: "1",
    },
    {
      data: {
        visible: {
          value: true,
          type: "boolean",
          label: "Visible",
        },
        ease: {
          value: "ease-in",
          type: "ease",
          label: "Easing",
        },
      },
      name: "Square",
      id: "2",
    },
  ];
  
  const targetNodeElm = {
    type: "nodeTargetElm",
    data: {
      label: "",
      select: {},
    },
    deletable: false,
    position: {
      x: 200,
      y: 100,
    },
    id: "",
  };
  
  const getNodeTargetElm = () => {
    const res = [];
    for (let i = 0; i < fetchedData.length; i++) {
      const item = fetchedData[i];
      const nodeTarget = {
        ...{},
        ...targetNodeElm,
        ...{
          position: {
            x: 200,
            y: 150 * (i + 1),
          },
        },
      };
      nodeTarget.id = item.id;
      nodeTarget.data = {
        ...{ label: item.name },
        ...{ select: item.data },
      };
      res.push(nodeTarget);
    }
    return res;
  };

  export const nodeTargetAfterFetchedData = getNodeTargetElm();