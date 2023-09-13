import store from "@/store";

// 已提交状态的数据在秘书处显示未审核
// const label = store.state?.user?.department_demo != 2 ? "未审核" : "已提交";
const statusList = [
  { label: "未提交", value: 0 },
  {
    label: "已提交",
    value: 1,
  },
  { label: "未通过", value: 2 },
  { label: "已通过", value: 3 },
  // { label: "未审核", value: 11 },
];
console.log(statusList, "statusList");

// 已提交状态的数据在具有审核权限的角色登录时显示未审核
if (store.state?.user?.department_demo != 2) {
  statusList.shift();
  statusList[0].label = "未审核";
}

const searchList = (remoteMethod, that) => [
  {
    label: "单位名称:",
    prop: "companyId",
    type: "select",
    visible: store.state?.user?.department_demo != 2,
    attr: {
      placeholder: "请输入",
      clearable: true,
      filterable: true,
      remote: true,
      remoteMethod: (query) => remoteMethod.call(that, query, "searchs"),
    },
  },
  {
    label: "年度:",
    prop: "year",
    type: "datePicker",
    attr: {
      placeholder: "请选择",
      clearable: true,
      type: "year",
      valueFormat: "yyyy",
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
  },
];

export { searchList, statusList };
