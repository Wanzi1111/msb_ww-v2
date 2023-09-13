import { checkPermi } from "@/utils/permission";
const dayjs = require("dayjs");
import { tabObj } from "@/views/messageCenter/components/config";

const statusList = [
  { label: "已读", value: 1 },
  { label: "未读", value: 0 },
];

const columns = [
  {
    align: "center",
    minWidth: 100,
    type: "selection",
    resizable: false,
    selectable: (row) => row.readStatus != 1,
  },
  {
    prop: "title",
    label: "标题",
    align: "center",
    minWidth: 180,
    resizable: false,
  },
  {
    prop: "extInfo",
    label: "内容",
    align: "center",
    minWidth: 220,
    resizable: false,
    showOverflowTooltip: true,
    render: (h, dat, row, index) => {
      return dat?.content || "-";
    },
  },
  {
    prop: "type",
    label: "消息类型",
    align: "center",
    minWidth: 100,
    resizable: false,
    render: (h, dat, row, index) => tabObj[dat] || "-",
  },
  {
    prop: "readStatus",
    label: "状态",
    align: "center",
    minWidth: 80,
    resizable: false,
    render: (h, dat, row, index) =>
      statusList?.find((i) => i.value == dat)?.label || "-",
  },
  {
    prop: "extInfo",
    label: "发布人",
    align: "center",
    minWidth: 130,
    resizable: false,
    render: (h, dat, row, index) => {
      return dat?.publisher || "-";
    },
  },
  {
    prop: "pubTime",
    label: "发布时间",
    align: "center",
    minWidth: 160,
    resizable: false,
    render: (h, dat, row, index) => dayjs(dat).format("YYYY-MM-DD HH:mm:ss"),
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
        label: "查看",
        attr: {
          type: "text",
          // style: {
          //   display: checkPermi(["platform:workbench:query"])
          //     ? "block"
          //     : "none",
          // },
        },
        click: () => tableAction(dat, row, index, "1"),
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
    prop: "readStatus",
    type: "select",
    options: statusList,
    attr: {
      placeholder: "请选择状态",
      clearable: true,
    },
  },
  {
    label: "时间：",
    prop: "date",
    type: "datePicker",
    attr: {
      type: "daterange",
      placeholder: "请输入时间",
      clearable: true,
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
      valueFormat: "yyyy-MM-dd",
    },
  },
];

export { columns, tableAction, searchList };
