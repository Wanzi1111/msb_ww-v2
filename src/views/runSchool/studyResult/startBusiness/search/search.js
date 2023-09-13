import store from "@/store";
import { statusList } from "@/utils/commonDicts";
const visible = store.state?.user?.department_demo === 1;

export default (remoteMethod, that) => [
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
    prop: "orgName",
    label: "机构名称",
    type: "input",
    attr: {
      placeholder: "请输入企业名称",
      clearable: true,
    },
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
