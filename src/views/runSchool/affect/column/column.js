import store from "@/store";
import { transformMap } from '@/utils';
import { statusList } from '@/utils/commonDicts';
import { mediaLevelList, exchangeTypeList } from '../config';

// 1、秘书 2、单位 3、机构
const visible = store.state?.user?.department_demo === 2;

const columns = (activeType) => [
  {
    align: "center",
    minWidth: 100,
    type: "selection",
    resizable: false,
  },
  {
    prop: "id",
    label: "序号",
    align: "center",
    minWidth: 80,
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
    prop: "title",
    label: "报道标题",
    align: "center",
    minWidth: 180,
    resizable: false,
    visible: activeType === '1',
  },
  {
    prop: "mediaLevel",
    label: "媒体级别",
    align: "center",
    minWidth: 180,
    resizable: false,
    visible: activeType === '1',
    render: (h, text) => h('el-tag', { props: { type: transformMap(mediaLevelList, 'tagType')[text] }}, transformMap(mediaLevelList)[text])
  },
  {
    prop: "mediaName",
    label: "发表媒体",
    align: "center",
    minWidth: 180,
    resizable: false,
    visible: activeType === '1',
  },
  {
    prop: "publishDate",
    label: "发表日期",
    align: "center",
    minWidth: 130,
    resizable: false,
    visible: activeType === '1',
  },
  {
    prop: "mediaName",
    label: "交流主题",
    align: "center",
    minWidth: 180,
    resizable: false,
    visible: activeType === '2',
  },
  {
    prop: "exchangeType",
    label: "交流类型",
    align: "center",
    minWidth: 180,
    resizable: false,
    visible: activeType === '2',
  },
  {
    prop: "exchangeDate",
    label: "交流日期",
    align: "center",
    minWidth: 130,
    resizable: false,
    visible: activeType === '2',
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
