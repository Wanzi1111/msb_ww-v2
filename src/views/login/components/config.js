import {
  validMobile,
  validPassword,
  validMessageCode,
  validEmail,
} from "@/utils/validate";

const mobileValidator = (rule, value, callback) => {
  if (value && validMobile(value)) {
    callback();
  } else if (value) {
    callback(new Error("请输入正确格式的手机号"));
  } else {
    callback();
  }
};

const passwordValidator = (rule, value, callback) => {
  if (value && validPassword(value)) {
    callback();
  } else if (value) {
    callback(new Error("请输入6-16位，同时包含字母和数字"));
  } else {
    callback();
  }
};

const messageCodeValidator = (rule, value, callback) => {
  if (value && validMessageCode(value)) {
    callback();
  } else if (value) {
    callback(new Error("请6位短信验证码"));
  } else {
    callback();
  }
};

const emailValidator = (rule, value, callback) => {
  if (value && validEmail(value)) {
    callback();
  } else if (value) {
    callback(new Error("请输入正确的格式"));
  } else {
    callback();
  }
};

const UnittypeList = [
  { label: "中职学校", value: "1" },
  { label: "高职学校", value: "2" },
  { label: "本科学校", value: "3" },
  { label: "企业", value: "4" },
  { label: "政府部门", value: "5" },
  { label: "行业组织", value: "6" },
  { label: "科研机构", value: "7" },
  { label: "其他组织", value: "8" },
];

export const rules = {
  username: [
    { required: true, trigger: "blur", message: "请输入手机号" },
    // { validator: mobileValidator, trigger: "blur" },
  ],
  password: [
    { required: true, trigger: "blur", message: "请输入密码" },
    { validator: passwordValidator, trigger: "blur" },
  ],
  code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
  mobileCode: [
    { required: true, trigger: "blur", message: "请输入短信验证码" },
    { validator: messageCodeValidator, trigger: "blur" },
  ],
  password1: [
    { required: true, trigger: "blur", message: "请输入密码" },
    { validator: passwordValidator, trigger: "blur" },
  ],
  password2: [
    { required: true, trigger: "blur", message: "请再次输入密码" },
    { validator: passwordValidator, trigger: "blur" },
  ],
  name: [
    { required: true, trigger: "blur", message: "请输入你的姓名" },
    { min: 0, max: 50, message: "最多输入50个字符", trigger: "blur" },
  ],
  sex: [{ required: true, trigger: "change", message: "请选择你的性别" }],
  email: [
    { required: true, trigger: "blur", message: "请输入你的邮箱地址" },
    { validator: emailValidator, trigger: "blur" },
  ],
};

// 完善信息form表单
export const replenishFormList = (searchD1) => [
  {
    prop: "d1",
    label: "系统选择",
    type: "select",
    options: [],
    attr: {
      placeholder: "请输入要进入的系统名称，支持关键字",
      filterable: true,
      remote: true,
      remoteMethod: searchD1,
    },
    rules: [{ required: true, message: "请输入系统名称" }],
  },
  {
    prop: "d2",
    label: "单位名称",
    type: "autocomplete",
    options: [],
    attr: {
      placeholder: "请填写单位名称，例如：北京大学",
      filterable: true,
      remote: true,
      //   allowCreate: true,
    },
    rules: [
      { required: true, message: "请输入单位名称" },
      { min: 1, max: 50, message: "最多输入50个字符", trigger: "change" },
    ],
  },
  {
    prop: "d3",
    label: "单位部门",
    type: "input",
    attr: {
      placeholder: "请填写参与该项目的具体部门，例如：北京大学XX学院",
    },
    rules: [
      { required: true, message: "请输入单位部门" },
      { min: 1, max: 50, message: "最多输入50个字符", trigger: "change" },
    ],
  },
  {
    prop: "d4",
    label: "单位类型",
    type: "select",
    options: UnittypeList,
    defaultVal: 1,
    rules: [{ required: true, message: "请选择单位类型" }],
  },
  {
    prop: "d5",
    label: "是否成员单位",
    type: "select",
    attr: {
      placeholder: "请选择是否是成员单位",
    },
    options: [
      { label: "是", value: "1" },
      { label: "否", value: "0" },
    ],
    rules: [{ required: true, message: "请选择是否是成员单位" }],
  },
  {
    prop: "d6",
    label: "组织编码",
    type: "input",
    attr: {
      placeholder: "请输入企业、院校或其他组织编码",
    },
    rules: [
      { required: true, message: "请输入企业、院校或其他组织编码" },
      { min: 1, max: 50, message: "最多输入50个字符", trigger: "change" },
    ],
  },
  {
    label: "佐证材料",
    slot: "upload1",
    prop: "d7",
    rules: [{ required: true, message: "请上传佐证材料" }],
  },
  {
    label: "提交加盖公章的授权书",
    slot: "upload2",
    prop: "d8",
  },
];
