import store from "@/store";
import { statusList } from '@/utils/commonDicts';
import { mediaLevelList, exchangeTypeList } from "../config";
const visible = store.state?.user?.department_demo === 1;

export default (activeType, remoteMethod, that) => [
  {
    label: "单位名称",
    prop: "companyId",
    type: "select",
    visible,
    attr: {
      placeholder: "请输入",
      clearable: true,
      filterable: true,
      remote: true,
      remoteMethod: (query) => remoteMethod.call(that, query, "searchs"),
    },
  },
  {
    prop: "title",
    label: "报道标题",
    type: "input",
    visible: activeType === "1",
    attr: {
      placeholder: "请输入基地名称",
      clearable: true,
    },
  },
  {
    prop: "mediaLevel",
    label: "媒体级别",
    type: "select", // 输入框,
    visible: activeType === "1",
    options: mediaLevelList,
  },
  {
    prop: "mediaName",
    label: "交流主题",
    type: "input",
    visible: activeType === "2",
    attr: {
      placeholder: "请输入交流主题",
      clearable: true,
    },
  },
  {
    prop: "exchangeType",
    label: "交流类型",
    type: "select", // 输入框,
    visible: activeType === "2",
    options: exchangeTypeList,
  },
  {
    prop: "status",
    label: "状态",
    type: "select",
    options: statusList,
    attr: {
      placeholder: "请选择",
      clearable: true,
    },
  },
];
