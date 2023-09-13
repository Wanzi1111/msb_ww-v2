export const createForms = [
  {
    prop: "departmentId",
    label: "机构名称:",
    type: "input",
    width: 200,
    attr: {
      placeholder: "请输入",
    },
    rules: [
      { required: true, trigger: "change" },
      { min: 1, max: 25, message: "最多输入25个字符", trigger: "change" },
    ],
  },
  {
    prop: "title",
    label: "文件标题:",
    type: "input",
    attr: {
      placeholder: "请输入",
      rows: 6,
    },
    rules: [
      { required: true, message: "请输入内容", trigger: "change" },
      { min: 1, max: 100, message: "最多输入100个字符", trigger: "change" },
    ],
  },
  {
    prop: "typeName",
    label: "文件类型:",
    type: "select",
    options: [],
    attr: {
      placeholder: "请输入",
    },
    rules: [{ required: true, trigger: "change" }],
  },
  {
    prop: "attaches",
    label: "文件附件:",
    type: "fileUpload", // 上传,
    defaultVal: [],
    attr: {
      limit: 10,
      isShowTip: false,
    },
    rules: [{ required: true, message: "文件不能为空" }],
    // colAttr: {
    //   span: 12,
    // },
  },
];
