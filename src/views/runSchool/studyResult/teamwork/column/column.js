import store from "@/store";
import { transformMap } from '@/utils';
import { statusList } from '@/utils/commonDicts';

// 1、秘书 2、单位 3、机构
const visible = store.state?.user?.department_demo === 1;

const columns = [
  {
    align: "center",
    minWidth: 100,
    type: "selection",
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
    prop: "enterpriseName",
    label: "企业名称",
    align: "center",
    minWidth: 180,
    resizable: false,
  },
  {
    prop: "trainee",
    label: "派驻人员培训人数（人）",
    align: "center",
    minWidth: 180,
    resizable: false,
  },
  {
    prop: "enterpriseName",
    label: "培养国外本土学生数量（人）",
    align: "center",
    minWidth: 180,
    resizable: false,
  },
  {
    prop: "year",
    label: "建成年份",
    align: "center",
    minWidth: 130,
    resizable: false,
  },
  {
    prop: "status",
    label: "状态",
    align: "center",
    minWidth: 120,
    resizable: false,
    render: (h, text) => h('el-tag', { props: { type: transformMap(statusList, 'tagType')[text] }}, transformMap(statusList)[text])
  },
  {
    name: "action",
    prop: "action",
    width: 350,
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
        click: () => tableAction('edit', row),
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
        click: () => tableAction('view', row),
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
        click: () => tableAction('del', row),
      },
      {
        type: "button",
        label: "提交",
        attr: {
          type: "text",
          // style: {
          //   display: checkPermi(["platform:workbench:query"])
          //     ? "block"
          //     : "none",
          // },
        },
        click: () => tableAction('submit', row),
      },
      {
        type: "button",
        label: "审核通过",
        attr: {
          type: "text",
          // style: {
          //   display: checkPermi(["platform:workbench:query"])
          //     ? "block"
          //     : "none",
          // },
        },
        click: () => tableAction('pass', row),
      },
      {
        type: "button",
        label: "审核未通过",
        attr: {
          type: "text",
          // style: {
          //   display: checkPermi(["platform:workbench:query"])
          //     ? "block"
          //     : "none",
          // },
        },
        click: () => tableAction('reject', row),
      },
    ],
  };
};


export { columns, tableAction };
