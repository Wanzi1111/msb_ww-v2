import store from "@/store";
const dayjs = require("dayjs");

// 成员单位时，用于隐藏部分字段；秘书处时，不同操作按钮
const visible = store.state?.user?.department_demo != 2;

const fileType = [
  { label: "工作管理文件", value: "1" },
  { label: "工作总结文件", value: "2" },
  { label: "集团制度文件", value: "3" },
];

export const statusList = [
  { label: "未提交", value: 0 },
  { label: "已提交", value: 1 },
  { label: "已通过", value: 2 },
  { label: "未通过", value: 3 },
];

// 已提交状态的数据在具有审核权限的角色登录时显示未审核
export const statusList_examine = [
  { label: "未审核", value: 1 },
  { label: "已通过", value: 2 },
  { label: "未通过", value: 3 },
];

export const columns = [
  {
    align: "center",
    minWidth: 100,
    type: "selection",
    resizable: false,
  },
  {
    prop: "deptName",
    label: "机构名称",
    align: "center",
    minWidth: 100,
    resizable: false,
    visible: false,
  },
  {
    prop: "title",
    label: "文件标题",
    align: "center",
    minWidth: 100,
    resizable: false,
  },
  {
    prop: "typeName",
    label: "文件类型",
    align: "center",
    minWidth: 180,
    resizable: false,
  },
  {
    prop: "upTime",
    label: "上传时间",
    align: "center",
    minWidth: 130,
    resizable: false,
    render: (h, dat, row, index) => dayjs(dat).format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    prop: "status",
    label: "状态",
    align: "center",
    minWidth: 80,
    resizable: false,
    render: (h, dat, row, index) => {
      return statusList?.find((i) => i.value === dat)?.label || "-";
    },
  },
  {
    name: "action",
    prop: "action",
    width: 280,
    label: "操作",
    align: "center",
    action: true,
    margin: "large",
    fixed: "right",
  },
];

export const tableAction = ({ tableAction }) => {
  const temp = [{ label: "", value: "" }];
  return {
    action: (dat, row, index) => [
      {
        type: "button",
        label: "编辑",
        attr: {
          type: "text",
          style: {
            display: row.status !== 3 ? "block" : "none",
          },
        },
        click: () => tableAction(dat, row, index, "1"),
      },
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
        click: () => tableAction(dat, row, index, "2"),
      },
      {
        type: "button",
        label: "删除",
        attr: {
          type: "text",
          style: {
            display:
              !visible && (row.status === 0 || row.status === 2)
                ? "block"
                : "none",
          },
        },
        click: () => tableAction(dat, row, index, "3"),
      },
      {
        type: "button",
        label: "提交",
        attr: {
          type: "text",
          style: {
            display:
              !visible && (row.status === 0 || row.status === 2)
                ? "block"
                : "none",
          },
        },
        click: () => tableAction(dat, row, index, "4"),
      },
      {
        type: "button",
        label: "审核通过",
        attr: {
          type: "text",
          style: {
            display: visible && row.status === 1 ? "block" : "none",
          },
        },
        click: () => tableAction(dat, row, index, "5"),
      },
      {
        type: "button",
        label: "审核未通过",
        attr: {
          type: "text",
          style: {
            display: visible && row.status === 1 ? "block" : "none",
          },
        },
        click: () => tableAction(dat, row, index, "6"),
      },
    ],
  };
};

export const searchList = [
  {
    label: "机构名称:",
    prop: "deptName",
    type: "input",
    attr: {
      placeholder: "请输入",
      clearable: true,
    },
    visible: false,
  },
  {
    label: "文件标题:",
    prop: "title",
    type: "input",
    attr: {
      placeholder: "请输入",
      clearable: true,
    },
  },
  {
    label: "文件类型:",
    prop: "typeName",
    type: "select",
    options: fileType,
    attr: {
      placeholder: "请选择",
      clearable: true,
    },
  },
  {
    label: "状态:",
    prop: "status",
    type: "select",
    options: statusList,
    attr: {
      placeholder: "请选择",
      clearable: true,
    },
    visible: false,
  },
];

export const createForms = [
  {
    prop: "departmentId",
    label: "机构名称:",
    type: "input",
    width: 200,
    visible: false,
    attr: {
      placeholder: "请输入",
    },
    rules: [
      { required: true, trigger: "change" },
      { min: 1, max: 25, message: "最多输入25个字符", trigger: "change" },
    ],
  },
  {
    prop: "title",
    label: "文件标题:",
    type: "input",
    attr: {
      placeholder: "请输入",
      rows: 6,
    },
    rules: [
      { required: true, message: "请输入内容", trigger: "change" },
      { min: 1, max: 100, message: "最多输入100个字符", trigger: "change" },
    ],
  },
  {
    prop: "typeName",
    label: "文件类型:",
    type: "select",
    options: [],
    attr: {
      placeholder: "请输入",
    },
    rules: [{ required: true, trigger: "change" }],
  },
  {
    prop: "attaches",
    label: "文件附件:",
    type: "fileUpload", // 上传,
    defaultVal: [],
    attr: {
      limit: 10,
      isShowTip: false,
    },
    rules: [{ required: true, message: "文件不能为空" }],
  },
];
