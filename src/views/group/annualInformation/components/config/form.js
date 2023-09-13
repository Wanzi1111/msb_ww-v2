import store from "@/store";
import {
  intValidator,
  rateValidator,
  moneyValidator,
} from "@/utils/formValidator";

// 成员单位时，用于隐藏部分字段；秘书处时，不同操作按钮
const visible = store.state?.user?.department_demo != 2;
// 高职学校显示部分字段
const schoolTypeVisible = store.state?.user?.school_type_demo == 2;

// 非必填，校验正整数
const int_noRequired = (rule, value, callback) => {
  if (value) {
    intValidator(rule, value, callback);
  } else {
    callback();
  }
};

// 非必填，校验金额
const money_noRequired = (rule, value, callback) => {
  if (value) {
    moneyValidator(rule, value, callback);
  } else {
    callback();
  }
};

const commonValid = { validator: intValidator, trigger: "change" };

// 学校
const s_createForms1 = (remoteMethod, that) => [
  {
    prop: "companyId",
    label: "单位名称:",
    type: "select", // 输入框,
    options: [],
    visible,
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
    prop: "year",
    label: "年度:",
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
        message: "请选择年度",
        trigger: "change",
      },
    ],
  },
  {
    prop: "enrollment",
    label: "招生人数（人）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      { required: true, message: "请输入招生人数", trigger: "change" },
      commonValid,
    ],
  },
  {
    prop: "enrolment",
    label: "在校生数（人）:",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      { required: true, message: "请输入在校生数", trigger: "change" },
      commonValid,
    ],
  },
  {
    prop: "graduates",
    label: "毕业生数（人）:",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      { required: true, message: "请输入毕业生数", trigger: "change" },
      commonValid,
    ],
  },
  {
    prop: "employmentRate",
    label: "就业率（%）:",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      { required: true, message: "请输入就业率", trigger: "change" },
      { validator: rateValidator, trigger: "change" },
    ],
  },
  {
    prop: "teachers",
    label: "专任教师规模（人）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      { required: true, message: "请输入专任教师规模", trigger: "change" },
      commonValid,
    ],
  },
  {
    prop: "expansion",
    label: "扩招人数（人）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      { required: true, message: "请输入扩招人数", trigger: "change" },
      commonValid,
    ],
  },
  {
    prop: "vocational",
    label: "中高职学生对口单招生人数（人）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    visible: schoolTypeVisible, // 高职学院显示
    rules: [
      {
        required: true,
        message: "请输入中高职学生对口单招生人数",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "cultivate",
    label: "3+2贯通培养招生人数（人）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    visible: schoolTypeVisible, // 高职学院显示
    rules: [
      {
        required: true,
        message: "请输入3+2贯通培养招生人数",
        trigger: "change",
      },
      commonValid,
    ],
  },
];

const s_createForms2 = [
  {
    prop: "training",
    label: "校企合作实习实训数量（人月）:",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入校企合作实习实训数量",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "partTimeCount",
    label: "集团内企业人员到学校兼职人数（人次）:",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入集团内企业人员到学校兼职人数",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "teachingHours",
    label: "集团内企业人员到学校兼职任课总量（课时）:",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入集团内企业人员到学校兼职任课总量",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "positions",
    label: "集团内成员单位提供的顶岗实习实训岗位数（个）:",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入集团内成员单位提供的顶岗实习实训岗位数",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "trainingUnit",
    label: "到成员单位顶岗实习实训数量（人月）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入到成员单位顶岗实习实训数量",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "totalTraining",
    label: "顶岗实习实训总人数（人）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入顶岗实习实训总人数",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "trainingMemberUnit",
    label: "到集团内成员单位顶岗实习实训人数（人）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入到集团内成员单位顶岗实习实训人数",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "employmentRate",
    label: "专业就业对口率（%）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入专业就业对口率",
        trigger: "change",
      },
      { validator: rateValidator, trigger: "change" },
    ],
  },
  {
    prop: "scholarshipAmount",
    label: "获得集团内企业奖助学金（万元）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入获得集团内企业奖助学金",
        trigger: "change",
      },
      { validator: moneyValidator, trigger: "change" },
    ],
  },
  {
    prop: "teachersMemberCount",
    label: "集团内其他院校教师到校兼职数量（人次）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入集团内其他院校教师到校兼职数量",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "teachingHoursMember",
    label: "集团内其他院校教师到校兼职教学总量（课时）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入集团内其他院校教师到校兼职教学总量",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "provincialSkillCount",
    label: "在成员单位参与下取得省级职业技能竞赛获奖量（项）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入在成员单位参与下取得省级职业技能竞赛获奖量",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "nationalSkillCount",
    label: "在成员单位参与下取得国家级职业技能竞赛获奖量（项）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入在成员单位参与下取得国家级职业技能竞赛获奖量",
        trigger: "change",
      },
      commonValid,
    ],
  },
];

const s_createForms3 = [
  {
    prop: "teachers",
    label: "到集团内其他院校兼职教师数量（人次）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ validator: int_noRequired, trigger: "change" }],
  },
  {
    prop: "teachingHours",
    label: "到集团内其他院校兼职教学总量（课时）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ validator: int_noRequired, trigger: "change" }],
  },
  {
    prop: "servicesCount",
    label: "为其他成员院校开展教学等工作指导与服务次数（次）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ validator: int_noRequired, trigger: "change" }],
  },
];

const s_createForms4 = [
  {
    prop: "trainingStaff",
    label: "为集团内企业培训职工量（人日）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入为集团内企业培训职工量",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "employedStaff",
    label: "到集团内企业就业人数（人）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入到集团内企业就业人数",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "orderClass",
    label: "集团内企业订单班班级数（个）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入集团内企业订单班班级数",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "orderTrainee",
    label: "集团内企业订单培养人数（人）:",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入集团内企业订单培养人数",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "teacherPractice",
    label: "教师到集团内企业实践数量（人月）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入教师到集团内企业实践数量",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "otherCooperationClass",
    label: "集团内企业其它联合培养班班级数（个）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入集团内企业其它联合培养班班级数",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "otherCooperationTrainee",
    label: "集团内企业其它联合培养人数（人）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入集团内企业其它联合培养人数",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "apprenticeshipClass",
    label: "现代学徒制班级数（个）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入现代学徒制班级数",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "apprenticeshipTrainee",
    label: "现代学徒制学生数（人）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入现代学徒制学生数",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "officerClass",
    label: "士官生培养班级数（个）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入士官生培养班级数",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "officerTrainee",
    label: "士官生培养学生数（人）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入士官生培养学生数",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "productionProject",
    label: "集团内企业联合开展生产技术攻关项目数:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入集团内企业联合开展生产技术攻关项目数",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "researchProject",
    label: "集团内企业合作开展职教科研教研项目数:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入集团内企业合作开展职教科研教研项目数",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "assetValue",
    label: "共享实习实训设备资产总值（万元）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入共享实习实训设备资产总值",
        trigger: "change",
      },
      { validator: moneyValidator, trigger: "change" },
    ],
  },
  {
    prop: "inventionPatent",
    label: "为集团内企业取得发明专业成果（件）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入为集团内企业取得发明专业成果",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "governmentProject",
    label: "为集团内企业争取政府科技项目数（项）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入为集团内企业争取政府科技项目数",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "socialTraining",
    label: "为集团内企业单位联合为社会培训量（人日）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入为集团内企业单位联合为社会培训量",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "governmentProjectFund",
    label: "为集团内企业争取政府科技项目金额（万元）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入为集团内企业争取政府科技项目金额",
        trigger: "change",
      },
      { validator: moneyValidator, trigger: "change" },
    ],
  },
  {
    prop: "projectAmount",
    label: "为集团内企业开展技术研发与技术服务项目数（项）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入为集团内企业开展技术研发与技术服务项目数",
        trigger: "change",
      },
      commonValid,
    ],
  },
  {
    prop: "projectFund",
    label: "为集团内企业开展技术研发与技术服务项目金额（万元）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      {
        required: true,
        message: "请输入为集团内企业开展技术研发与技术服务项目金额",
        trigger: "change",
      },
      { validator: moneyValidator, trigger: "change" },
    ],
  },
];

const s_createForms5 = [
  {
    prop: "foreignStudents",
    label: "外国留学生数量（人数）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ required: true, trigger: "change" }, commonValid],
  },
  {
    prop: "exchangeStudents",
    label: "互派留学生数量（人数）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ required: true, trigger: "change" }, commonValid],
  },
  {
    prop: "importedStandards",
    label: "引进课程标准数（个）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ required: true, trigger: "change" }, commonValid],
  },
  {
    prop: "foreignTeachers",
    label: "引进外教人数（人）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ required: true, trigger: "change" }, commonValid],
  },
  {
    prop: "importedTextbooks",
    label: "引进教材数（种 ）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ required: true, trigger: "change" }, commonValid],
  },
  {
    prop: "teachersAttended",
    label: "教师参加国际学术会议（人次 ）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ required: true, trigger: "change" }, commonValid],
  },
  {
    prop: "skillCompetitions",
    label: "师生参加国际技能大赛（人次）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ required: true, trigger: "change" }, commonValid],
  },
  {
    prop: "culturalExchanges",
    label: "师生参加国际文化交流（人次）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ required: true, trigger: "change" }, commonValid],
  },
  {
    prop: "foreignTraining",
    label: "教师参加国外学习培训（人次 ）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ required: true, trigger: "change" }, commonValid],
  },
];

// 企业
const e_createForms1 = (remoteMethod, that) => [
  {
    prop: "companyId",
    label: "单位名称:",
    type: "select", // 输入框,
    options: [],
    visible,
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
    prop: "year",
    label: "年度:",
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
        message: "请选择年度",
        trigger: "change",
      },
    ],
  },
  {
    prop: "totalAssets",
    label: "企业资产总额（万元）:",
    type: "input",
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
  },
  {
    prop: "totalAnnualOutputValue",
    label: "企业年产值总额（万元）:",
    type: "input",
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
  },
  {
    prop: "enterpriseSize",
    label: "企业规模:",
    type: "select",
    attr: {
      placeholder: "请选择",
      maxlength: 100,
    },
    rules: [{ required: true, trigger: "change" }],
    options: [
      { label: "专精特新", value: "1" },
      { label: "世界500强", value: "2" },
      { label: "中国500强 ", value: "3" },
      { label: "其他", value: "4" },
    ],
  },
  {
    prop: "aboveSice",
    label: "规模以上企业:",
    type: "select",
    attr: {
      placeholder: "请选择",
      maxlength: 100,
    },
    rules: [{ required: true, trigger: "change" }],
    options: [
      { label: "是", value: "1" },
      { label: "否", value: "0" },
    ],
  },
  {
    prop: "aboveTheLimit",
    label: "限额以上企业:",
    type: "select",
    attr: {
      placeholder: "请选择",
      maxlength: 100,
    },
    rules: [{ required: true, trigger: "change" }],
    options: [
      { label: "是", value: "1" },
      { label: "否", value: "0" },
    ],
  },
  {
    prop: "numberOfEmployees",
    label: "企业职工总数（人）:",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      { required: true, message: "请输入在校生数", trigger: "change" },
      commonValid,
    ],
  },
  {
    prop: "mxcyyxtgdjygwrs",
    label: "面向成员院校提供的就业岗位数（个）:",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      { required: true, message: "请输入毕业生数", trigger: "change" },
      commonValid,
    ],
  },
  {
    prop: "xqhzcsdzjjjll",
    label: "校企合作产生的直接经济效益（万元）:",
    type: "input",
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
  },
  {
    prop: "qynkgsxsxsbzczz",
    label: "企业内可供实习实训设备资产总值（万元）:",
    type: "input",
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
  },
  {
    prop: "tyxkzlhjskfrs",
    label: "同院校开展联合技术开发人数（人）:",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [
      { required: true, message: "请输入毕业生数", trigger: "change" },
      commonValid,
    ],
  },
  {
    prop: "lhjskftrje",
    label: "联合技术开发投入金额（万元）:",
    type: "input",
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
  },
  {
    prop: "qydxxsxjdjszjtuzs",
    label: "企业对学校实训基地建设资金投入总数（万元）:",
    type: "input",
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
  },
];

const e_createForms2 = [
  {
    prop: "kgcyyxrqsxdgwsl",
    label: "可供成员院校入企实习的岗位数量（个）:",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ validator: int_noRequired, trigger: "change" }],
  },
  {
    prop: "wjtjdjsdzxtr",
    label: "为集团基地建设的专项投入（万元）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ validator: money_noRequired, trigger: "change" }],
  },
  {
    prop: "wjtcyyxtgjzxj",
    label: "为集团内成员院校提供奖助学金（万元）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ validator: money_noRequired, trigger: "change" }],
  },
  {
    prop: "jsjtcyyxxxsxl",
    label: "接收集团成员院校学生实习量（人月）:",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ validator: int_noRequired, trigger: "change" }],
  },
  {
    prop: "zpdsxzgrs",
    label: "指派带实习职工人数（人）:",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ validator: int_noRequired, trigger: "change" }],
  },
];

const e_createForms3 = [
  {
    prop: "jtncyyxjrbdwjzl",
    label: "集团内成员院校进入本单位兼职量（人月）:",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ validator: int_noRequired, trigger: "change" }],
  },
  {
    prop: "jtnycwbdwpxygl",
    label: "集团内院校为本单位培训员工量（人日）:",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ validator: int_noRequired, trigger: "change" }],
  },
  {
    prop: "jtnyxybdwsbzfkjxms",
    label: "集团内院校与本单位申报政府科技项目数（项）:",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ validator: int_noRequired, trigger: "change" }],
  },
  {
    prop: "jtnyxybdwsbzfjkxmzje",
    label: "集团内院校与本单位申报政府科技项目总金额（万元）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ validator: money_noRequired, trigger: "change" }],
  },
  {
    prop: "jtnyxwbdwtgjsfwxms",
    label: "集团内院校为本单位提供技术服务项目数（项）:",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ validator: int_noRequired, trigger: "change" }],
  },
  {
    prop: "jtnyxwbdwtgjsfwxmzje",
    label: "集团内院校为本单位提供技术服务项目总金额（万元）:",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ validator: money_noRequired, trigger: "change" }],
  },
  {
    prop: "cyyxwbdwssbyss",
    label: "成员院校为本单位输送毕业生数（人）:",
    type: "input", // 输入框,
    attr: {
      placeholder: "请输入",
      maxlength: 100,
    },
    rules: [{ validator: int_noRequired, trigger: "change" }],
  },
];

export {
  s_createForms1,
  s_createForms2,
  s_createForms3,
  s_createForms4,
  s_createForms5,
  e_createForms1,
  e_createForms2,
  e_createForms3,
};
