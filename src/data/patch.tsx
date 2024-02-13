

export const listEasing = [
  {
    label : "none",
    value : "none"
  },
  {
    label : 'Bezier',
    value : "cubic-bezier(0.5, 0.2, 0.3, 1.0))"
  },
  {
    label : "Linear",
    value : "linear"
  },
  {
    label : "Ease-in",
    value : "ease-in"
  },
  {
    label : "Ease-out",
    value : "ease-out"
  },
  {
    label : "Ease-in-out",
    value : "ease-in-out"
  },
]

const patch = [
  {
    headline : "visible",
    data : {
        label : "Visible",
        type : "boolean",
        value : true,
        key : "visible"
    },
    type: "nodeToggle",
    id: "1",
  },
  {
    headline : "Easing",
    data : {
        label : "Easing",
        type : "ease",
        value : "ease-in",
        key : "ease",
        listSelect : listEasing
    },
    id : "2",
    type : "nodeSelect"
  }
];


export default patch;
