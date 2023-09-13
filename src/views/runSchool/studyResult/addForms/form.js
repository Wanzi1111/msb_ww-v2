import { mediaLevelList } from '../../affect/config';

// 研究成果
const studyFruitForm = (remoteMethod, that, type) => [
  {
    prop: "companyId",
    label: "单位名称",
    type: "select", // 输入框,
    options: [],
    attr: {
      placeholder: "请输入搜索单位名称并选择",
      filterable: true,
      remote: true,
      // remoteMethod: remoteMethod,
      remoteMethod: (query) => remoteMethod.call(that, query, "form"),
    },
    rules: [
      {
        required: true,
        message: "请输入搜索单位名称并选择",
        trigger: "change",
      },
    ],
  },
  {
    prop: "name",
    label: "成果名称",
    type: "input",
    attr: {
      placeholder: "请输入成果名称",
      clearable: true,
    },
    rules: [
      {
        required: true,
        message: "请输入成果名称",
      },
    ],
  },
  {
    prop: "vector",
    label: "发表载体",
    type: "input",
    visible: type === "1",
    attr: {
      placeholder: "请输入发表载体",
      clearable: true,
    },
    rules: [
      {
        required: true,
        message: "请输入发表载体",
      },
    ],
  },
  {
    label: "发表日期",
    prop: "publishDate",
    type: "datePicker",
    visible: type === "1",
    attr: {
      // type: "daterange",
      placeholder: "请输入发表日期",
      clearable: true,
      // startPlaceholder: "开始时间",
      // endPlaceholder: "结束时间",
      valueFormat: "yyyy-MM-dd",
    },
    rules: [
      {
        required: true,
        message: "请选择发表日期",
      },
    ],
  },
  {
    prop: "awardUnit",
    label: "颁奖单位",
    type: "input",
    visible: type === "2",
    attr: {
      placeholder: "请输入颁奖单位",
      clearable: true,
    },
    rules: [
      {
        required: true,
        message: "请输入颁奖单位",
      },
    ],
  },
  {
    label: "获奖时间",
    prop: "awardDate",
    type: "datePicker",
    visible: type === "2",
    attr: {
      // type: "daterange",
      placeholder: "请输入获奖时间",
      clearable: true,
      // startPlaceholder: "开始时间",
      // endPlaceholder: "结束时间",
      valueFormat: "yyyy-MM-dd",
    },
    rules: [
      {
        required: true,
        message: "请选择获奖时间",
      },
    ],
  },
  {
    prop: "level",
    label: "奖项级别",
    type: "select",
    visible: type === "2",
    attr: {
      placeholder: "请选择奖项级别",
      clearable: true,
    },
    rules: [
      {
        required: true,
        message: "请选择奖项级别",
      },
    ],
    options: mediaLevelList
  },
  {
    prop: "fileUrl",
    label: "文件上传",
    type: "fileUpload", // 上传,
    defaultVal: [],
    attr: {
      limit: 10,
      isShowTip: false,
    },
  },
  {
    prop: "remark",
    label: "备注",
    type: "textarea",
    attr: {
      placeholder: "请输入备注",
      rows: 6,
    },
  },
  {
    prop: "exchange",
    label: "国际交流合作",
    slot: "exchange",
  },
  {
    prop: "policy",
    label: "支持国家或区域政策",
    slot: "policy",
  },
];
// 就业创业
const startBusinessForm = (remoteMethod, that, type) => [
  {
    prop: "companyId",
    label: "单位名称",
    type: "select", // 输入框,
    options: [],
    attr: {
      placeholder: "请输入搜索单位名称并选择",
      filterable: true,
      remote: true,
      // remoteMethod: remoteMethod,
      remoteMethod: (query) => remoteMethod.call(that, query, "form"),
    },
    rules: [
      {
        required: true,
        message: "请输入搜索单位名称并选择",
        trigger: "change",
      },
    ],
  },
  {
    prop: "projectName",
    label: "项目名称",
    type: "input",
    attr: {
      placeholder: "请输入项目名称",
      clearable: true,
    },
    rules: [
      {
        required: true,
        message: "请输入项目名称",
      },
    ],
  },
  {
    prop: "leadCompany",
    label: "牵头学校",
    type: "input",
    attr: {
      placeholder: "请输入牵头学校",
      clearable: true,
    },
    rules: [
      {
        required: true,
        message: "请输入牵头学校",
      },
    ],
  },
  {
    prop: "fund",
    label: "资金投入（万元）",
    type: "input",
    visible: type === "1",
    attr: {
      placeholder: "请输入资金投入（万元）",
      clearable: true,
    },
    rules: [
      {
        required: true,
        message: "请输入资金投入（万元）",
      },
    ],
  },
  {
    prop: "cultivate",
    label: "培养学生数量（个）",
    type: "input",
    visible: type === "1",
    attr: {
      placeholder: "请输入培养学生数量（个）",
      clearable: true,
    },
    rules: [
      {
        required: true,
        message: "请输入培养学生数量（个）",
      },
    ],
  },
  {
    prop: "completeDate",
    label: "完成时间",
    type: "datePicker",
    attr: {
      // type: "daterange",
      placeholder: "请输入完成时间",
      clearable: true,
      // startPlaceholder: "开始时间",
      // endPlaceholder: "结束时间",
      valueFormat: "yyyy-MM-dd",
    },
    rules: [
      {
        required: true,
        message: "请选择完成时间",
      },
    ],
  },
  {
    prop: "projectInfo",
    label: "项目简介",
    type: "textarea", // 上传,
    attr: {
      placeholder: "请输入备注",
      rows: 4,
    },
  },
  {
    prop: "fileUrl",
    label: "佐证材料",
    type: "fileUpload", // 上传,
    defaultVal: [],
    attr: {
      limit: 10,
      isShowTip: false,
    },
  },
  {
    prop: "remark",
    label: "备注",
    type: "textarea",
    attr: {
      placeholder: "请输入备注",
      rows: 6,
    },
  },
  {
    prop: "exchange",
    label: "国际交流合作",
    slot: "exchange",
  },
  {
    prop: "policy",
    label: "支持国家或区域政策",
    slot: "policy",
  },
];
// 技能鉴定
const skillForm = (remoteMethod, that) => [
  {
    prop: "companyId",
    label: "单位名称",
    type: "select", // 输入框,
    options: [],
    attr: {
      placeholder: "请输入搜索单位名称并选择",
      filterable: true,
      remote: true,
      // remoteMethod: remoteMethod,
      remoteMethod: (query) => remoteMethod.call(that, query, "form"),
    },
    rules: [
      {
        required: true,
        message: "请输入搜索单位名称并选择",
        trigger: "change",
      },
    ],
  },
  {
    prop: "orgName",
    label: "机构名称",
    type: "input",
    attr: {
      placeholder: "请输入机构名称",
      clearable: true,
    },
    rules: [
      {
        required: true,
        message: "请输入机构名称",
      },
    ],
  },
  {
    prop: "leadCompany",
    label: "牵头学校",
    type: "input",
    attr: {
      placeholder: "请输入牵头学校",
      clearable: true,
    },
    rules: [
      {
        required: true,
        message: "请输入牵头学校",
      },
    ],
  },
  {
    prop: "cooperativeCompany",
    label: "其他合作单位",
    type: "textarea",
    attr: {
      placeholder: "请输入其他合作单位",
      rows: 6,
    },
  },
  {
    prop: "verifyProject",
    label: "主要鉴定项目",
    type: "textarea",
    attr: {
      placeholder: "请输入主要鉴定项目",
      rows: 6,
    },
  },
  {
    prop: "verifyNumBefore",
    label: "2022年及以前鉴定数量",
    type: "input",
    attr: {
      placeholder: "请输入2022年及以前鉴定数量",
      clearable: true,
    },
  },
  {
    prop: "verifyNum",
    label: "2022鉴定数量",
    type: "input",
    attr: {
      placeholder: "请输入2022鉴定数量",
      clearable: true,
    },
  },
  {
    prop: "exchange",
    label: "国际交流合作",
    slot: "exchange",
  },
  {
    prop: "policy",
    label: "支持国家或区域政策",
    slot: "policy",
  },
];

// 国际合作
const teamworkForm = (remoteMethod, that) => [
  {
    prop: "companyId",
    label: "单位名称",
    type: "select", // 输入框,
    options: [],
    attr: {
      placeholder: "请输入搜索单位名称并选择",
      filterable: true,
      remote: true,
      // remoteMethod: remoteMethod,
      remoteMethod: (query) => remoteMethod.call(that, query, "form"),
    },
    rules: [
      {
        required: true,
        message: "请输入搜索单位名称并选择",
        trigger: "change",
      },
    ],
  },
  {
    prop: "enterpriseName",
    label: "企业名称",
    type: "input",
    attr: {
      placeholder: "请输入企业名称",
      clearable: true,
    },
    rules: [
      {
        required: true,
        message: "请输入企业名称",
      },
    ],
  },
  {
    prop: "trainee",
    label: "派驻人员培训人数（人）",
    type: "input",
    attr: {
      placeholder: "请输入派驻人员培训人数（人）",
      clearable: true,
    },
    rules: [
      {
        required: true,
        message: "请输入派驻人员培训人数（人）",
      },
    ],
  },
  {
    prop: "studentNum",
    label: "培养国外本土学生数量（人）",
    type: "input",
    attr: {
      placeholder: "请输入培养国外本土学生数量（人）",
      clearable: true,
    },
    rules: [
      {
        required: true,
        message: "请输入培养国外本土学生数量（人）",
      },
    ],
  },
  {
    prop: "year",
    label: "建成年份",
    type: "datePicker", // 日期选择器,
    attr: {
      type: "year",
      valueFormat: "yyyy",
      placeholder: "请选择",
    },
    colAttr: {
      span: 24,
    },
    rules: [
      {
        required: true,
        message: "请选择建成年份",
        trigger: "change",
      },
    ],
  },
  {
    prop: "fileUrl",
    label: "文件上传",
    type: "fileUpload", // 上传,
    defaultVal: [],
    attr: {
      limit: 10,
      isShowTip: false,
    },
  },
  {
    prop: "remark",
    label: "备注",
    type: "textarea",
    attr: {
      placeholder: "请输入备注",
      rows: 6,
    },
  },
  {
    prop: "exchange",
    label: "国际交流合作",
    slot: "exchange",
  },
  {
    prop: "policy",
    label: "支持国家或区域政策",
    slot: "policy",
  },
];

export default {
  studyFruitForm,
  startBusinessForm,
  skillForm,
  teamworkForm,
};
