import store from "@/store";
import { transformMap } from '@/utils';
import { statusList } from '@/utils/commonDicts';

// 成员单位时，用于隐藏部分字段；秘书处时，不同操作按钮
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
    prop: "academyName",
    label: "产业学院名称",
    align: "center",
    minWidth: 180,
    resizable: false,
  },
  {
    prop: "ctime",
    label: "创建时间",
    align: "center",
    minWidth: 130,
    resizable: false,
    showOverflowTooltip: true,
  },
  {
    prop: "enterpriseName",
    label: "企业名称",
    align: "center",
    minWidth: 130,
    resizable: false,
  },
  {
    prop: "positionName",
    label: "岗位名称",
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
        },
        click: () => tableAction('edit', row, index, "1"),
      },
      {
        type: "button",
        label: "查看",
        attr: {
          type: "text",
        },
        click: () => tableAction('view', row, index, "2"),
      },
      {
        type: "button",
        label: "删除",
        attr: {
          type: "text",
        },
        click: () => tableAction('remove', row, index, "3"),
      },

      {
        type: "button",
        label: "审核通过",
        attr: {
          type: "text",
        },
        click: () => tableAction('pass', row, index, "4"),
      },
      {
        type: "button",
        label: "审核未通过",
        attr: {
          type: "text",
        },
        click: () => tableAction('notPass', row, index, "5"),
      },
      {
        type: "button",
        label: "提交",
        attr: {
          type: "text",
        },
        click: () => tableAction('submit', row, index, "6"),
      },
    ],
  };
};

export { columns, tableAction };
