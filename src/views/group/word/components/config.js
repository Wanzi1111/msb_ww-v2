import { moneyValidator } from "@/utils/formValidator";

export const createForms = [
  {
    prop: "groupName",
    label: "集团名称",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入集团名称",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        trigger: "change",
      },
    ],
    colAttr: {
      span: 12,
    },
  },
  {
    prop: "groupType",
    label: "集团类型",
    type: "select", // 选择器,
    attr: {
      // size: "small",
      placeholder: "请选择集团类型",
      multiple: false,
    },
    rules: [
      {
        // validator: seqValidator,
        required: true,
        message: "请选择集团类型",
        trigger: "change",
      },
    ],
    // defaultVal: 1,
    options: [
      { label: "行业型", value: "1" },
      { label: "区域型", value: "2" },
    ],
    colAttr: {
      span: 12,
    },
  },
  {
    prop: "qtdwName",
    label: "牵头单位名称",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入牵头单位名称",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        // validator: seqValidator,
        trigger: "change",
      },
    ],
    colAttr: {
      span: 12,
    },
  },
  {
    prop: "qtdwType",
    label: "牵头单位类型",
    type: "select", // 选择器,
    attr: {
      // size: "small",
      placeholder: "请选择牵头单位类型",
      multiple: false,
    },
    rules: [
      {
        // validator: seqValidator,
        required: true,
        message: "请选择牵头单位类型",
        trigger: "change",
      },
    ],
    // defaultVal: 1,
    options: [],
    colAttr: {
      span: 12,
    },
  },
  {
    prop: "cyfwDict",
    label: "成员范围",
    type: "select", // 选择器,
    attr: {
      // size: "small",
      placeholder: "请选择",
      multiple: false,
    },
    rules: [
      {
        // validator: seqValidator,
        required: true,
        message: "请选择",
        trigger: "change",
      },
    ],
    // defaultVal: 1,
    options: [
      { label: "国际", value: "1" },
      { label: "跨省", value: "2" },
      { label: "省内", value: "3" },
    ],
    colAttr: {
      span: 12,
    },
  },
  {
    prop: "fuwuhyDict",
    label: "服务行业面向",
    type: "cascader", // 选择器,
    // itemSlot:'fuwuhyDict',
    attr: {
      placeholder: "请选择",
      props: {
        multiple: true,
        value: "code",
        label: "name",
      },
      collapseTags: true,
      showAllLevels: true,
    },
    rules: [
      {
        // validator: seqValidator,
        required: true,
        trigger: "change",
      },
    ],
    // defaultVal: 1,

    colAttr: {
      span: 12,
    },
  },
  {
    prop: "cllx1Dict",
    label: "成立类型1",
    type: "select", // 选择器,
    attr: {
      placeholder: "请选择",
      multiple: false,
    },
    rules: [
      {
        // validator: seqValidator,
        required: true,
        message: "请选择",
        trigger: "change",
      },
    ],
    options: [
      {
        label: "批准、备案（多方协议）",
        value: 1,
      },
      {
        label: "注册法人",
        value: 2,
      },
    ],
    colAttr: {
      span: 12,
    },
  },
  {
    prop: "cllx2OneDict",
    label: "成立类型2",
    type: "select", // 选择器,
    visible: false,
    attr: {
      placeholder: "请选择",
      multiple: false,
    },
    rules: [
      {
        required: true,
        trigger: "change",
      },
    ],
    options: [
      {
        label: "批准",
        value: 1,
      },
      {
        label: "备案",
        value: 2,
      },
      {
        label: "多方协议",
        value: 3,
      },
      {
        label: "其他",
        value: 4,
      },
      {
        label: "注册成立",
        value: 5,
      },
    ],
    colAttr: {
      span: 12,
    },
  },
  {
    prop: "pzBaName",
    label: "批准/备案部门名称",
    type: "input", // 输入框,
    visible: false,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        // validator: seqValidator,
        trigger: "change",
      },
    ],
    colAttr: {
      span: 12,
    },
  },
  {
    prop: "pzBaSxDict",
    label: "批准/备案部门属性",
    visible: false,
    type: "select", // 选择器,
    attr: {
      // size: "small",
      placeholder: "请选择",
      multiple: false,
    },
    rules: [
      {
        // validator: seqValidator,
        required: true,
        message: "请选择",
        trigger: "change",
      },
    ],
    // defaultVal: 1,
    options: [
      { label: "省人民政府", value: "1" },
      { label: "市人民政府", value: "2" },
      { label: "区（县）人民政府", value: "3" },
    ],
    colAttr: {
      span: 12,
    },
  },
  {
    prop: "frDict",
    label: "法人类型",
    type: "select", // 选择器,
    visible: false,
    attr: {
      placeholder: "请选择",
      multiple: false,
    },
    rules: [
      {
        required: true,
        trigger: "change",
      },
    ],
    options: [
      { label: "民法法人", value: "1" },
      { label: "社", value: "2" },
      { label: "企", value: "3" },
      { label: "事", value: "4" },
    ],
    colAttr: {
      span: 12,
    },
  },
  {
    prop: "clDate",
    label: "成立时间",
    type: "datePicker", // 日期选择器,
    visible: false,
    attr: {
      type: "date",
      valueFormat: "yyyy-MM-dd",
    },
    rules: [
      {
        required: true,
        trigger: "change",
      },
    ],
    colAttr: {
      span: 12,
    },
  },
  {
    prop: "zmFile",
    label: "证明文件",
    type: "fileUpload", // 上传,
    visible: false,
    defaultVal: [],
    attr: {
      limit: 10,
      isShowTip: false,
    },
    rules: [{ required: true, message: "文件不能为空" }],
    colAttr: {
      span: 12,
    },
  },
  {
    prop: "tyxyCode",
    label: "统一社会信用代码",
    type: "input", // 输入框,
    visible: false,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        // validator: seqValidator,
        trigger: "change",
      },
    ],
    colAttr: {
      span: 12,
    },
  },
  {
    prop: "zcDeptName",
    label: "注册部门名称",
    type: "input", // 输入框,
    visible: false,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        // validator: seqValidator,
        trigger: "change",
      },
    ],
    colAttr: {
      span: 12,
    },
  },
  {
    prop: "frdjUnitName",
    label: "法人登记单位",
    type: "input", // 输入框,
    visible: false,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        // validator: seqValidator,
        trigger: "change",
      },
    ],
    colAttr: {
      span: 12,
    },
  },
  {
    prop: "zhuceMoney",
    label: "注册资本（万元）",
    visible: false,
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        trigger: "change",
      },
      { validator: moneyValidator, trigger: "change" },
    ],
    colAttr: {
      span: 12,
    },
  },
  {
    prop: "groupZcFile",
    label: "集团章程",
    type: "fileUpload", // 选择器,
    attr: {
      limit: 10,
      isShowTip: false,
    },
    colAttr: {
      span: 12,
    },
  },
  {
    prop: "zcPassFile",
    label: "章程通过程序",
    type: "fileUpload", // 选择器,
    attr: {
      limit: 10,
      isShowTip: false,
    },
    colAttr: {
      span: 12,
    },
  },
  {
    prop: "zcPassDate",
    label: "章程通过时间",
    type: "datePicker", // 日期选择器,
    visible: false,
    attr: {
      type: "date",
      valueFormat: "yyyy-MM-dd",
    },
    colAttr: {
      span: 12,
    },
  },
];

export const createForms2 = [
  {
    title: "负责人",
    children: [
      {
        prop: "userNameFz",
        label: "姓名",
        type: "select",
        attr: {
          placeholder: "请选择负责人",
          // filterable: true,
          // remote: true,
        },
        rules: [
          {
            required: true,
            trigger: "change",
          },
        ],
      },
      { label: "集团职务", prop: "zhiwuFz" },
      { label: "手机号码", prop: "mobileFz" },
      { label: "单位职务", prop: "danweiZwFz" },
      { label: "办公电话", prop: "officePhoneFz" },
      { label: "工作邮箱", prop: "emailFz" },
    ],
  },
  {
    title: "联系人",
    children: [
      {
        prop: "userNameContact",
        label: "姓名",
        type: "select",
        attr: {
          placeholder: "请选择联系人",
        },
        rules: [
          {
            required: true,
            trigger: "change",
          },
        ],
      },
      { label: "集团职务", prop: "zhiwuContact" },
      { label: "手机号码", prop: "mobileContact" },
      { label: "单位职务", prop: "danweiZwContact" },
      { label: "办公电话", prop: "officePhoneContact" },
      { label: "工作邮箱", prop: "emailContactz" },
    ],
  },
  {
    title: "集团",
    children: [
      {
        prop: "mscDwName",
        label: "秘书处所在单位",
        type: "input",
        rules: [
          {
            required: true,
            trigger: "change",
          },
        ],
      },
      {
        prop: "groupAddress",
        label: "集团联系地址",
        type: "input",
        rules: [
          {
            required: true,
            trigger: "change",
          },
        ],
      },
      {
        prop: "groupUrl",
        label: "集团网址",
        type: "input",
      },
      {
        prop: "urlDict",
        label: "网站类型",
        type: "select",
        options: [
          { label: "独立域名网站", value: 1 },
          { label: "非独立域名网站", value: 2 },
        ],
      },
      {
        prop: "wechatPublicNum",
        label: "微信公众号",
        type: "input",
      },
      {
        prop: "otherContact",
        label: "其他联系方式",
        type: "input",
      },
      {
        prop: "qqGroups",
        label: "QQ群号",
        type: "input",
      },
      {
        prop: "qqGroupLord",
        label: "群主QQ号",
        type: "input",
      },
    ],
  },
];
