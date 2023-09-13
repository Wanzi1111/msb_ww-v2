import { statusList } from "@/views/group/annualInformation/config";
import store from "@/store";

// 成员单位时，用于隐藏部分字段；秘书处时，不同操作按钮
const visible = store.state?.user?.department_demo != 2;

const school_columns = [
  {
    align: "center",
    minWidth: 100,
    type: "selection",
    resizable: false,
    selectable: (row) => row.status != 3,
  },
  {
    prop: "year",
    label: "年度",
    align: "center",
    minWidth: 100,
    resizable: false,
  },
  {
    prop: "companyName",
    label: "单位名称",
    align: "center",
    minWidth: 180,
    resizable: false,
    visible,
  },
  {
    prop: "enrollment",
    label: "招生人数（人）",
    align: "center",
    minWidth: 130,
    resizable: false,
    showOverflowTooltip: true,
  },
  {
    prop: "enrolment",
    label: "在校生数（人）",
    align: "center",
    minWidth: 130,
    resizable: false,
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
    prop: "ctime",
    label: "创建时间",
    align: "center",
    minWidth: 120,
    resizable: false,
  },
  {
    name: "action",
    prop: "action",
    width: 310,
    label: "操作",
    align: "center",
    action: true,
    margin: "large",
    fixed: "right",
  },
];

const tableAction = ({ tableAction }) => {
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
              row.status === 0 || row.status === 2 || row.status === 1
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

const enterprise_columns = [
  {
    align: "center",
    minWidth: 100,
    type: "selection",
    resizable: false,
    selectable: (row) => row.status != 3,
  },
  {
    prop: "year",
    label: "年度",
    align: "center",
    minWidth: 100,
    resizable: false,
  },
  {
    prop: "companyName",
    label: "单位名称",
    align: "center",
    minWidth: 180,
    resizable: false,
    visible,
  },
  {
    prop: "totalAssets",
    label: "企业资产总额（万元）",
    align: "center",
    minWidth: 160,
    resizable: false,
    showOverflowTooltip: true,
  },
  {
    prop: "totalAnnualOutputValue",
    label: "企业产值总额（万元）",
    align: "center",
    minWidth: 160,
    resizable: false,
  },
  {
    prop: "numberOfEmployees",
    label: "企业职工总数（人）",
    align: "center",
    minWidth: 140,
    resizable: false,
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

export { school_columns, tableAction, enterprise_columns };
