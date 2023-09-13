import { checkPermi } from "@/utils/permission";
import { validMoney } from "@/utils/validate";

const moneyValidator = (rule, value, callback) => {
  if (value && validMoney(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的格式，最多保留2位小数"));
  }
};

const sourceList = [
  { label: "已读", value: "1" },
  { label: "未读", value: "0" },
  { label: "未读", value: "0" },
  { label: "未读", value: "0" },
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
    prop: "code",
    label: "项目名称",
    align: "center",
    minWidth: 100,
    resizable: false,
  },
  {
    prop: "name",
    label: "用途分类",
    align: "center",
    minWidth: 200,
    resizable: false,
    showOverflowTooltip: true,
  },
  {
    prop: "userName",
    label: "支出金额（万元）",
    align: "center",
    minWidth: 130,
    resizable: false,
  },
  {
    prop: "userName",
    label: "支出日期",
    align: "center",
    minWidth: 120,
    resizable: false,
  },
  {
    prop: "userName",
    label: "创建人",
    align: "center",
    minWidth: 100,
    resizable: false,
  },
  {
    prop: "ctime",
    label: "创建时间",
    align: "center",
    minWidth: 120,
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
          // style: {
          //   display: checkPermi(["platform:workbench:query"])
          //     ? "block"
          //     : "none",
          // },
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
          // style: {
          //   display: checkPermi(["platform:workbench:query"])
          //     ? "block"
          //     : "none",
          // },
        },
        click: () => tableAction(dat, row, index, "3"),
      },
    ],
  };
};

const searchList = [
  {
    label: "项目名称:",
    prop: "name",
    type: "input",
    attr: {
      placeholder: "请输入项目名称",
      clearable: true,
    },
  },
  {
    label: "用途分类:",
    prop: "status",
    type: "select",
    options: sourceList,
    attr: {
      placeholder: "请选择用途分类",
      clearable: true,
    },
  },
  {
    label: "支出日期:",
    prop: "status",
    type: "datePicker",
    options: sourceList,
    attr: {
      placeholder: "请选择支出日期",
      clearable: true,
    },
  },
];

const createForms = (remoteMethod) => [
  {
    prop: "d3",
    label: "项目名称：",
    type: "input",
    attr: {
      placeholder: "请输入项目名称",
    },
    rules: [
      { required: true, message: "请输入项目名称", trigger: "change" },
      { min: 1, max: 100, message: "最多输入100个字符", trigger: "change" },
    ],
  },
  {
    prop: "type",
    label: "单位名称：",
    type: "select",
    width: 200,
    options: [],
    attr: {
      placeholder: "请输入搜索单位名称并选择",
      filterable: true,
      remote: true,
      remoteMethod: remoteMethod,
    },
    // rules: [{ required: true, message: "请选择单位名称", trigger: "change" }],
  },
  {
    prop: "organizationId",
    label: "机构名称：",
    type: "select",
    options: [],
    attr: {
      placeholder: "请输入搜索机构名称并选择",
      filterable: true,
      remote: true,
      remoteMethod: remoteMethod,
    },
    // rules: [{ required: true, message: "请选择机构名称", trigger: "change" }],
  },
  {
    prop: "organizationId1",
    label: "用途分类：",
    type: "select",
    options: [],
    attr: {
      placeholder: "请选择用途分类",
      filterable: true,
    },
    rules: [{ required: true, message: "请选择用途分类", trigger: "change" }],
  },
  {
    prop: "d1",
    label: "支出日期：",
    type: "datePicker",
    attr: {
      placeholder: "请选择支出日期",
    },
    rules: [{ required: true, message: "请选择支出日期", trigger: "change" }],
  },
  {
    prop: "d2",
    label: "支出金额(万元)：",
    type: "input",
    attr: {
      placeholder: "请输入支出金额",
    },
    rules: [
      { required: true, message: "请输入支出金额", trigger: "change" },
      { validator: moneyValidator, trigger: "change" },
    ],
  },
  {
    prop: "d31",
    label: "上传附件：",
    slot: "upload",
    // rules: [{ required: true, message: "请上传附件", trigger: "change" }],
  },
  {
    prop: "name",
    label: "备注：",
    type: "textarea",
    attr: {
      placeholder: "请输入备注",
      rows: 6,
    },
    rules: [
      // { required: true, message: "请输入备注", trigger: "change" },
      { min: 1, max: 200, message: "最多输入200个字符", trigger: "change" },
    ],
  },
];

export { columns, tableAction, searchList, createForms };
