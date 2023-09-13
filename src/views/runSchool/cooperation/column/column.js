import store from "@/store";
import { transformMap } from '@/utils';
import { statusList } from '@/utils/commonDicts';

// 1、秘书 2、单位 3、机构
const visible = store.state?.user?.department_demo === 2;

const columns = (activeType)=>[
  {
    align: "center",
    minWidth: 100,
    type: "selection",
    resizable: false,
  },
  {
    prop: "companyId",
    label: "单位名称",
    align: "center",
    minWidth: 180,
    resizable: false,
    visible,
  },
  {
    prop: "className",
    label: "班级名称",
    align: "center",
    minWidth: 180,
    resizable: false,
  },
  {
    prop: "enterpriseName",
    label: "参与企业",
    align: "center",
    minWidth: 180,
    resizable: false,
  },
  {
    prop: "studentNum",
    label: "学生人数",
    align: "center",
    minWidth: 180,
    resizable: false,
  },
  {
    prop: "employment",
    label: "就业人数",
    align: "center",
    minWidth: 180,
    resizable: false,
  },
  {
    prop: "positionName",
    label: "就业岗位",
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
