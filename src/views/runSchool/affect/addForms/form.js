import { mediaLevelList, exchangeTypeList } from '../config';

// 媒体宣传
export const mediaForm = (remoteMethod, that) => [
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
    prop: "title",
    label: "报道标题",
    type: "input",
    attr: {
      placeholder: "请输入报道标题",
      clearable: true,
    },
    rules: [
      {
        required: true,
        message: "请输入报道标题",
      },
    ],
  },
  {
    prop: "mediaLevel",
    label: "媒体级别",
    type: "select", // 输入框,
    options: mediaLevelList,
    rules: [
      {
        required: true,
        message: "请选择媒体级别",
      },
    ],
  },
  {
    prop: "mediaName",
    label: "发表媒体",
    type: "input",
    attr: {
      placeholder: "请输入发表媒体",
      clearable: true,
    },
    rules: [
      {
        required: true,
        message: "请输入发表媒体",
      },
    ],
  },
  {
    label: "发表日期",
    prop: "publishDate",
    type: "datePicker",
    attr: {
    //   type: "daterange",
      placeholder: "请输入发表日期",
      clearable: true,
    //   startPlaceholder: "开始时间",
    //   endPlaceholder: "结束时间",
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
    prop: "coverageLink",
    label: "报道链接",
    type: "input",
    attr: {
      placeholder: "请输入报道链接",
      clearable: true,
    },
  },
  {
    prop: "fileUrl",
    label: "文件上传",
    type: "fileUpload", // 上传,
    defaultVal: [],
    attr: {
      limit: 1,
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

// 经验交流
export const exchangeForm = (remoteMethod, that) => [
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
    prop: "unit",
    label: "填报单位",
    type: "input",
    attr: {
      placeholder: "请输入填报单位",
      clearable: true,
    },
    rules: [
      {
        required: true,
        message: "请输入填报单位",
      },
    ],
  },
  {
    prop: "mediaName",
    label: "交流主题",
    type: "input",
    attr: {
      placeholder: "请输入交流主题",
      clearable: true,
    },
    rules: [
      {
        required: true,
        message: "请输入交流主题",
      },
    ],
  },
  {
    label: "交流日期",
    prop: "exchangeDate",
    type: "datePicker",
    attr: {
    //   type: "daterange",
      placeholder: "请输入交流日期",
      clearable: true,
    //   startPlaceholder: "开始时间",
    //   endPlaceholder: "结束时间",
      valueFormat: "yyyy-MM-dd",
    },
    rules: [
      {
        required: true,
        message: "请选择交流日期",
      },
    ],
  },
  {
    prop: "exchangeAddress",
    label: "交流地点",
    type: "input",
    attr: {
      placeholder: "请输入交流地点",
      clearable: true,
    },
    // rules: [
    //   {
    //     required: true,
    //     message: "请输入交流地点",
    //   },
    // ],
  },
  {
    prop: "exchangeType",
    label: "交流类型",
    type: "select", // 输入框,
    options: exchangeTypeList,
    rules: [
      {
        required: true,
        message: "请选择交流类型",
      },
    ],
  },
  {
    prop: "materialUrl",
    label: "支撑材料",
    type: "fileUpload", // 上传,
    defaultVal: [],
    attr: {
      limit: 1,
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
