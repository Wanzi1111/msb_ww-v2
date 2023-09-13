import { checkPermi } from "@/utils/permission";

const statusList = [
  { label: "已发布", value: "1" },
  { label: "未发布", value: "0" },
];

const messageType = [
  { label: "集团消息", value: 1 },
  { label: "应用消息", value: 2 },
  { label: "系统消息", value: 3 },
];

const columns = [
  {
    label: "序号",
    align: "center",
    minWidth: 100,
    type: "index",
    resizable: false,
  },
  {
    prop: "title",
    label: "标题",
    align: "center",
    minWidth: 180,
    resizable: false,
  },
  {
    prop: "content",
    label: "内容",
    align: "center",
    minWidth: 200,
    resizable: false,
    showOverflowTooltip: true,
  },
  {
    prop: "ctime",
    label: "创建时间",
    align: "center",
    minWidth: 120,
    resizable: false,
  },
  {
    prop: "status",
    label: "状态",
    align: "center",
    minWidth: 80,
    resizable: false,
    render: (h, dat, row, index) =>
      statusList.find((i) => i.value == dat)?.label || "-",
  },
  {
    prop: "publisher",
    label: "创建人",
    align: "center",
    minWidth: 130,
    resizable: false,
  },
  {
    name: "action",
    prop: "action",
    width: 250,
    label: "操作",
    align: "center",
    action: true,
    margin: "large",
    fixed: "right",
  },
];

const tableAction = ({ tableAction }) => {
  return {
    action: (dat, row, index) => [
      {
        type: "button",
        label: "编辑",
        attr: {
          type: "text",
          style: {
            // 未发布时，可编辑
            display: row.status === 0 ? "block" : "none",
          },
        },
        click: () => tableAction(dat, row, index, "1"),
      },
      {
        type: "button",
        label: "查看",
        attr: {
          type: "text",
        },
        click: () => tableAction(dat, row, index, "2"),
      },
      {
        type: "button",
        label: "发布",
        attr: {
          type: "text",
          style: {
            // 未发布状态下，显示发布按钮
            display: row.status === 0 ? "block" : "none",
          },
        },
        click: () => tableAction(dat, row, index, "3"),
      },
    ],
  };
};

const searchList = [
  {
    label: "标题：",
    prop: "title",
    type: "input",
    attr: {
      placeholder: "请输入标题",
      clearable: true,
    },
  },
  {
    label: "状态：",
    prop: "status",
    type: "select",
    options: statusList,
    attr: {
      placeholder: "请选择状态",
      clearable: true,
    },
  },
];

const createForms = [
  {
    prop: "title",
    label: "标题：",
    type: "input",
    width: 200,
    attr: {
      placeholder: "请输入标题",
    },
    rules: [
      { required: true, message: "请输入标题", trigger: "change" },
      { min: 1, max: 25, message: "最多输入25个字符", trigger: "change" },
    ],
  },
  {
    prop: "type",
    label: "消息类型：",
    type: "select",
    options: messageType,
    attr: {
      placeholder: "请选择消息类型",
    },
    rules: [{ required: true, message: "请选择消息类型", trigger: "change" }],
  },
  {
    prop: "content",
    label: "内容：",
    type: "textarea",
    attr: {
      placeholder: "请输入内容",
      rows: 6,
    },
    rules: [
      { required: true, message: "请输入内容", trigger: "change" },
      { min: 1, max: 100, message: "最多输入100个字符", trigger: "change" },
    ],
  },
];

export { columns, tableAction, searchList, createForms };
