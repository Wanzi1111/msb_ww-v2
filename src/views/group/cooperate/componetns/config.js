export const all_ = {
  one: {
    title: "关注合作类别",
    children: {
      saas_cooperative_education: {
        label: "共建共享",
        key: "coShare", //调接口时对应的key
      },
      saas_jointly_sponsor: {
        label: "合作育人",
        key: "coEdu",
      },
      saas_employment_and_entrepreneurship: {
        label: "就业创业",
        key: "empEnt",
      },
      saas_social_training: {
        label: "社会培训",
        key: "socTrain",
      },
      saas_technical_service: {
        label: "技术服务",
        key: "techServ",
      },
      saas_megagame: {
        label: "大赛",
        key: "competition",
      },
      saas_make_experiments: {
        label: "1+X试点和职业等级证书",
        key: "onePlusCertificate",
      },
      saas_cultural_heritage: {
        label: "文化传承",
        key: "culture",
      },
      saas_international_exchange: {
        label: "国际交流合作",
        key: "internationalExchange",
      },
    },
  },
  two: {
    title: "意向合作区域",
    children: {
      saas_internal: {
        label: "国内",
        key: "0",
      },
      saas_hongkong_macao_taiwan: {
        label: "港澳台",
        key: "1",
      },
      saas_international: {
        label: "国际",
        key: "2",
      },
    },
  },
  three: {
    title: "意向合作单位类型与级别",
    children: {
      saas_unit_type: {
        label: "单位类型",
        key: "companyType",
      },
      saas_secondary_vocational_level: {
        label: "中职-学校级别",
        key: "middleLevel",
      },
      saas_vocationnal_level: {
        label: "高职-学校级别",
        key: "highLevel",
      },
      saas_vocationnal_level2: {
        label: "高职-学校级别2",
        key: "highSecondLevel",
      },
      saas_enterprise_size: {
        label: "企业规模",
        key: "companySize",
      },
    },
  },
};

export const createForms_1 = [
  {
    label: "姓名",
    prop: "name",
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
    ],
    colAttr: {
      span: 24,
    },
  },
  {
    label: "部门",
    prop: "department",
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
    ],
  },
  {
    label: "职位",
    prop: "position",
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
    ],
  },
  {
    label: "职称",
    prop: "title",
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
    ],
  },
  {
    label: "授课方向",
    prop: "subject",
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
    ],
  },
  {
    label: "简介",
    prop: "introduction",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
      type: "textarea",
      rows: 5,
    },
  },
];

export const createForms_2 = [
  {
    label: "课程名称",
    prop: "name",
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
    ],
    colAttr: {
      span: 24,
    },
  },
  {
    label: "简介",
    prop: "introduction",
    type: "input",
    attr: {
      placeholder: "请输入",
      maxlength: 100,
      type: "textarea",
      rows: 5,
    },
  },
];
