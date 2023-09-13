const addGroupForms = (disabled) => [
  // 机构基础信息
  {
    label: '机构基础信息',
    type: 'text',
    attr: {
      disabled,
      customClass: 'groupTitle',
    },
    colAttr: {
      span: 24
    },
  },
  {
    prop: '机构名称',
    label: '机构名称',
    type: 'input', // 输入框,
    attr: {
      disabled,
      placeholder: '请输入',
      maxlength: 100
    },
    rules: [
      {
        required: true,
        // validator: seqValidator,
        trigger: 'change'
      }],
    colAttr: {
      span: 7
    },
  },
  {
    prop: '机构类型',
    label: '机构类型',
    type: 'select', // 选择器,
    attr: {
      disabled,
      // size: "small",
      placeholder: '请选择',
      multiple: false
    },
    rules: [
      {
      // validator: seqValidator,
        required: true,
        message: '请选择',
        trigger: 'change'
      }],
    // defaultVal: 1,
    options: [
      
    ],
    colAttr: {
      span: 17
    },
  },
  {
    prop: 'gradeTime',
    label: '成立时间',
    type: 'datePicker', // 日期选择器,
    attr: {
      disabled,
      type: 'date',
      // size: 'small',
      valueFormat: 'yyyy-MM'
    },
    colAttr: {
      span: 7,
      class: 'gradeTime',
    },
  },
  {
    prop: '联系电话',
    label: '联系电话',
    type: 'input', // 输入框,
    attr: {
      disabled,
      placeholder: '请输入',
      maxlength: 100
    },
    rules: [
      {
        required: true,
        // validator: seqValidator,
        trigger: 'change'
      }],
    colAttr: {
      span: 17
    },
  },
  {
    prop: '联系地址',
    label: '联系地址',
    type: 'input', // 输入框,
    attr: {
      disabled,
      placeholder: '请输入',
      maxlength: 100
    },
    rules: [
      {
        required: true,
        // validator: seqValidator,
        trigger: 'change'
      }],
    colAttr: {
      span: 7
    },
  },
  {
    prop: '人员数量',
    label: '人员数量',
    type: 'input', // 输入框,
    attr: {
      disabled,
      placeholder: '请输入',
      maxlength: 100
    },
    rules: [
      {
        required: true,
        // validator: seqValidator,
        trigger: 'change'
      }],
    colAttr: {
      span: 17
    },
  },
  {
    prop: '机构简介',
    label: '机构简介',
    type: 'input', // 输入框,
    attr: {
      disabled,
      placeholder: '请输入',
      maxlength: 100
    },
    rules: [
      {
        required: true,
        // validator: seqValidator,
        trigger: 'change'
      }],
    colAttr: {
      span: 7
    },
  },
  {
    prop: '固定场所面积(平方米)',
    label: '固定场所面积(平方米)',
    type: 'input', // 输入框,
    attr: {
      disabled,
      placeholder: '请输入',
      maxlength: 100
    },
    rules: [
      {
        required: true,
        // validator: seqValidator,
        trigger: 'change'
      }],
    colAttr: {
      span: 17
    },
  },

  // 机构负责人
  {
    label: '机构负责人',
    type: 'text',
    attr: {
      disabled,
      customClass: 'groupTitle',
    },
    colAttr: {
      span: 24
    },
  },
  {
    prop: '选择联系人',
    label: '选择联系人',
    type: 'select', // 选择器,
    attr: {
      disabled,
      // size: "small",
      placeholder: '请选择',
      multiple: false
    },
    rules: [
      {
      // validator: seqValidator,
        required: true,
        message: '请选择',
        trigger: 'change'
      }],
    // defaultVal: 1,
    options: [
      
    ],
    colAttr: {
      span: 7
    },
  },
  {
    prop: '集团职务',
    label: '集团职务',
    type: 'input', // 输入框,
    attr: {
      disabled,
      placeholder: '请输入',
      maxlength: 100
    },
    rules: [
      {
        required: true,
        // validator: seqValidator,
        trigger: 'change'
      }],
    colAttr: {
      span: 17
    },
  },
  {
    prop: '手机号码',
    label: '手机号码',
    type: 'input', // 输入框,
    attr: {
      disabled,
      placeholder: '请输入',
      maxlength: 100
    },
    rules: [
      {
        required: true,
        // validator: seqValidator,
        trigger: 'change'
      }],
    colAttr: {
      span: 7
    },
  },
  {
    prop: '办公电话',
    label: '办公电话',
    type: 'input', // 输入框,
    attr: {
      disabled,
      placeholder: '请输入',
      maxlength: 100
    },
    rules: [
      {
        required: true,
        // validator: seqValidator,
        trigger: 'change'
      }],
    colAttr: {
      span: 17
    },
  },
  {
    prop: '邮箱地址',
    label: '邮箱地址',
    type: 'input', // 输入框,
    attr: {
      disabled,
      placeholder: '请输入',
      maxlength: 100
    },
    rules: [
      {
        required: true,
        // validator: seqValidator,
        trigger: 'change'
      }],
    colAttr: {
      span: 24
    },
  },
  // 日常联系人
  {
    label: '日常联系人',
    type: 'text',
    attr: {
      disabled,
      customClass: 'groupTitle',
    },
    colAttr: {
      span: 24
    },
  },
  {
    prop: '选择联系人',
    label: '选择联系人',
    type: 'select', // 选择器,
    attr: {
      disabled,
      // size: "small",
      placeholder: '请选择',
      multiple: false
    },
    rules: [
      {
      // validator: seqValidator,
        required: true,
        message: '请选择',
        trigger: 'change'
      }],
    // defaultVal: 1,
    options: [
      
    ],
    colAttr: {
      span: 7
    },
  },
  {
    prop: '集团职务',
    label: '集团职务',
    type: 'input', // 输入框,
    attr: {
      disabled,
      placeholder: '请输入',
      maxlength: 100
    },
    rules: [
      {
        required: true,
        // validator: seqValidator,
        trigger: 'change'
      }],
    colAttr: {
      span: 17
    },
  },
  {
    prop: '手机号码',
    label: '手机号码',
    type: 'input', // 输入框,
    attr: {
      disabled,
      placeholder: '请输入',
      maxlength: 100
    },
    rules: [
      {
        required: true,
        // validator: seqValidator,
        trigger: 'change'
      }],
    colAttr: {
      span: 7
    },
  },
  {
    prop: '办公电话',
    label: '办公电话',
    type: 'input', // 输入框,
    attr: {
      disabled,
      placeholder: '请输入',
      maxlength: 100
    },
    rules: [
      {
        required: true,
        // validator: seqValidator,
        trigger: 'change'
      }],
    colAttr: {
      span: 17
    },
  },
  {
    prop: '邮箱地址',
    label: '邮箱地址',
    type: 'input', // 输入框,
    attr: {
      disabled,
      placeholder: '请输入',
      maxlength: 100
    },
    rules: [
      {
        required: true,
        // validator: seqValidator,
        trigger: 'change'
      }],
    colAttr: {
      span: 24
    },
  },
]
const actions = ({ subDl }) => {
  return {
    submit: {
      type: 'button',
      label: '提交',
      click: () => subDl()
    },
    back: {
      hide: true
    },
    quit: {
      hide: true
    }
  }
}
// 机构单位维护列表
const groupStruckListFroms = [
 {
  prop: 'addGroup',
  slot: 'addGroup',
  visible: false
 },
 {
   prop: 'groupList',
   slot: 'groupList',
   visible: false

 },
 {
  prop: 'groupName',
  label: '机构名称',
  type: 'select', // 选择器,
  attr: {
    filterable: true,
    // size: "small",
    placeholder: '请选择',
    multiple: false
  },
  rules: [
    {
    // validator: seqValidator,
      required: true,
      message: '请选择',
      trigger: 'change'
    }],
  // defaultVal: 1,
  options: [
    
  ],
  colAttr: {
    span: 17
  },
  },
  {
    prop: 'unitName',
    label: '单位名称',
    type: 'select', // 选择器,
    attr: {
      filterable: true,
      // size: "small",
      placeholder: '请选择',
      multiple: false
    },
    rules: [
      {
      // validator: seqValidator,
        required: true,
        message: '请选择',
        trigger: 'change'
      }],
    // defaultVal: 1,
    options: [
      
    ],
    colAttr: {
      span: 17
    },
    },
]
const actionsGroup = ({ subDl }) => {
  return {
    submit: {
      type: 'button',
      label: '确定',
      click: () => subDl('confirm')
    },
    quit: {
      type: 'button',
      label: '取消',
      click: () => subDl('cancel')
    },
    back: {
      hide: true
    }
  }
}
export {
  addGroupForms,
  actions,
  groupStruckListFroms,
  actionsGroup
}