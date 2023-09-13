export default (remoteMethod, that) => [
    {
        prop: "companyId",
        label: "单位名称",
        type: "select", // 输入框,
        options: [],
        attr: {
            placeholder: "请输入搜索单位名称并选择",
            filterable: true,
            remote: true,
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
        prop: 'academyName',
        label: '产业学院名称',
        type: 'input',
        attr: {
            placeholder: '请输入产业学院名称',
            clearable: true
        },
        rules: [
            {
                required: true,
                message: "请输入产业学院名称",
            },
        ],
    },
    {
        label: "创建时间",
        prop: "foundDate",
        type: "datePicker",
        attr: {
            placeholder: "请输入创建时间",
            clearable: true,
            valueFormat: "yyyy-MM-dd",
        },
        rules: [
            {
                required: true,
                message: "请选择创建时间",
            },
        ],
    },
    {
        prop: 'enterpriseName',
        label: '企业名称',
        type: 'input',
        attr: {
            placeholder: '请输入企业名称',
            clearable: true
        },
        rules: [
            {
                required: true,
                message: "请输入企业名称",
            },
        ],
    },
    {
        prop: 'enrollment',
        label: '招生人数（人)',
        type: 'input',
        attr: {
            placeholder: '请输入招生人数（人)',
            clearable: true
        },
        rules: [
            {
                required: true,
                message: "请输入招生人数（人)",
            },
        ],
    },
    {
        prop: 'positionName',
        label: '岗位名称',
        type: 'input',
        attr: {
            placeholder: '请输入岗位名称',
            clearable: true
        },
        rules: [
            {
                required: true,
                message: "请输入岗位名称",
            },
        ],
    },
    {
        prop: 'employment',
        label: '岗位就业人数（人）',
        type: 'input',
        attr: {
            placeholder: '请输入岗位就业人数（人）',
            clearable: true
        },
        rules: [
            {
                required: true,
                message: "请输入岗位就业人数（人）",
            },
        ],
    },
    {
        prop: "configList",
        label: "共建专业",
        type: "radio", // 输入框,
        options: [],
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
    }
]

// 共建专业
const mkMajorForm =  (querySearch) =>  [
    {
        prop: "cf_name",
        label: "专业名称",
        type: "autocomplete", // 输入框
        attr: {
            placeholder: '请输入专业名称',
            filterable: true,
            remote: true,
            fetchSuggestions: querySearch,
            valueKey: "name",
        },
        rules: [
          { required: true, message: "请输入专业名称" },
          { min: 1, max: 50, message: "最多输入50个字符", trigger: "change" },
        ],
    },
    {
        prop: 'cf_code',
        label: '专业代码',
        type: 'input',
        attr: {
            placeholder: '请输入专业代码',
            clearable: true
        },
        rules: [
            {
                required: true,
                message: "请输入专业代码",
            },
        ],
    },
    {
        label: "成立时间",
        prop: "cf_foundDate",
        type: "datePicker",
        attr: {
            placeholder: "请输入成立时间",
            clearable: true,
            valueFormat: "yyyy-MM-dd",
        },
        rules: [
            {
                required: true,
                message: "请选择成立时间",
            },
        ],
    },
    {
        label: "合作单位",
        prop: "cf_coCompany",
        type: "input",
        attr: {
            placeholder: "请输入",
            maxlength: 100,
            type: "textarea",
            rows: 5,
        },
        rules: [
            {
                required: true,
                message: "请输入企业名称",
            },
        ],
    },
    {
        prop: "cf_type",
        label: "专业类型",
        type: "select", // 输入框,
        attr: {
            placeholder: "请选择",
            multiple: true,
            collapseTags: true,
            clearable: true
          },
        options: [],
        rules: [
            {
                required: true,
                message: "请选择专业类型",
            },
        ],
    },
]

// 共建专业群
const mkMajorGroupForm = (querySearch) =>  [
    {
        prop: "cf_name",
        label: "专业群名称",
        type: "autocomplete", // 输入框
        options: [],
        attr: {
            placeholder: "请输入搜索专业群名称",
            filterable: true,
            remote: true,
            fetchSuggestions: querySearch,
            valueKey: "name",
        },
        rules: [
            { required: true, message: "请输入专业群名称" },
            { min: 1, max: 50, message: "最多输入50个字符", trigger: "change" },
        ],
    },
    {
        label: "下辖专业名称",
        prop: "cf_majors",
        type: "input",
        attr: {
            placeholder: "请输入下辖专业名称",
            maxlength: 100,
            type: "textarea",
            rows: 5,
        },
        rules: [
            {
                required: true,
                message: "请输入下辖专业名称",
            },
        ],
    },
    {
        label: "成立时间",
        prop: "cf_foundDate",
        type: "datePicker",
        attr: {
            placeholder: "请输入成立时间",
            clearable: true,
            valueFormat: "yyyy-MM-dd",
        },
        rules: [
            {
                required: true,
                message: "请选择成立时间",
            },
        ],
    },
    {
        label: "合作单位",
        prop: "cf_coCompany",
        type: "input",
        attr: {
            placeholder: "请输入",
            maxlength: 100,
            type: "textarea",
            rows: 5,
        },
        rules: [
            {
                required: true,
                message: "请输入企业名称",
            },
        ],
    },
    {
        prop: 'cf_department',
        label: '所属院系名称',
        type: 'input',
        attr: {
            placeholder: '请输入所属院系名称',
            clearable: true
        },
        rules: [
            {
                required: true,
                message: "请输入所属院系名称",
            },
        ],
    },
    {
        prop: "cf_level",
        label: "等级",
        type: "select", // 输入框,
        options: [],
        rules: [
            {
                required: true,
                message: "请选择等级",
            },
        ],
    },
]

// 共建课程
const mkCourseForm =  (querySearch) => [
    {
        prop: "cf_name",
        label: "课程名称",
        type: "autocomplete", // 输入框,
        options: [],
        attr: {
            placeholder: "请输入搜索课程名称",
            filterable: true,
            remote: true,
            fetchSuggestions: querySearch,
            valueKey: "name",
        },
        rules: [
            { required: true, message: "请输入搜索课程名称" },
            { min: 1, max: 50, message: "最多输入50个字符", trigger: "change" },
        ],
    },
    {
        prop: "cf_type",
        label: "课程类型",
        type: "select", // 输入框,
        options: [],
        rules: [
            {
                required: true,
                message: "请选择课程类型",
            },
        ],
    },
    {
        label: "合作单位",
        prop: "cf_coCompany",
        type: "input",
        attr: {
            placeholder: "请输入合作单位",
            maxlength: 100,
            type: "textarea",
            rows: 5,
        },
        rules: [
            {
                required: true,
                message: "请输入合作单位",
            },
        ],
    },
    {
        prop: "cf_level",
        label: "课程级别",
        type: "select", // 输入框,
        options: [],
        rules: [
            {
                required: true,
                message: "请选择课程级别",
            },
        ],
    },
    {
        prop: "cf_awardType",
        label: "获奖级别",
        type: "select", // 输入框,
        options: [],
        rules: [
            {
                required: true,
                message: "请选择获奖级别",
            },
        ],
    },
    {
        prop: "cf_year",
        label: "建成年份:",
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
      prop: "cf_fileUrl",
      label: "文件上传",
      type: "fileUpload", // 上传,
      defaultVal: [],
      attr: {
        limit: 10,
        isShowTip: false,
      },
    },
    {
      prop: "cf_remark",
      label: "备注",
      type: "textarea",
      attr: {
        placeholder: "请输入备注",
        rows: 6,
      },
    },
]

// 共建教材 
const mkTextbookForm = (querySearch) =>  [
    {
        prop: "cf_name",
        label: "教材名称",
        type: "autocomplete", // 输入框
        attr: {
            placeholder: '请输入教材名称',
            filterable: true,
            remote: true,
            fetchSuggestions: querySearch,
            valueKey: "name",
        },
        rules: [
          { required: true, message: "请输入教材名称" },
          { min: 1, max: 50, message: "最多输入50个字符", trigger: "change" },
        ],
    },
    {
        label: "合作单位",
        prop: "cf_coCompany",
        type: "input",
        attr: {
            placeholder: "请输入合作单位",
            maxlength: 100,
            type: "textarea",
            rows: 5,
        },
        rules: [
            {
                required: true,
                message: "请输入合作单位",
            },
        ],
    },
    {
        prop: "cf_year",
        label: "出版年份:",
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
                message: "请选择出版年份",
                trigger: "change",
            },
        ],
    },
    {
        prop: "cf_type",
        label: "教材类型",
        type: "select", // 输入框,
        options: [],
        rules: [
            {
                required: true,
                message: "请选择教材类型",
            },
        ],
    },
    {
        prop: "cf_level",
        label: "级别",
        type: "select", // 输入框,
        options: [
            {
                label: '国家级',
                value: '0'
            }, {
                label: '省级',
                value: '1'
            }, {
                label: '校级',
                value: '2'
            }
        ],
        rules: [
            {
                required: true,
                message: "请选择级别",
            },
        ],
    },
    {
      prop: "cf_fileUrl",
      label: "文件上传",
      type: "fileUpload", // 上传,
      defaultVal: [],
      attr: {
        limit: 10,
        isShowTip: false,
      },
    },
    {
      prop: "cf_remark",
      label: "备注",
      type: "textarea",
      attr: {
        placeholder: "请输入备注",
        rows: 6,
      },
    },
]

// 共建基地 
const mkBaseForm = (querySearch) =>  [
    {
        prop: "cf_name",
        label: "基地名称",
        type: "autocomplete", // 输入框
        attr: {
            placeholder: '请输入基地名称',
            filterable: true,
            remote: true,
            fetchSuggestions: querySearch,
            valueKey: "name",
        },
        rules: [
          { required: true, message: "请输入基地名称" },
          { min: 1, max: 50, message: "最多输入50个字符", trigger: "change" },
        ],
    },
    {
        prop: "cf_type",
        label: "基地类型",
        type: "select", // 输入框,
        options: [],
        rules: [
            {
                required: true,
                message: "请输选择基地类型",
            },
        ],
    },
    {
        prop: "cf_year",
        label: "建立年份",
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
                message: "请选择出版年份",
                trigger: "change",
            },
        ],
    },
    {
        label: "牵头单位",
        prop: "cf_leadCompany",
        type: "input",
        attr: {
            placeholder: "请输入牵头单位",
            maxlength: 100,
            type: "textarea",
            rows: 5,
        },
        rules: [
            {
                required: true,
                message: "请输入牵头单位",
            },
        ],
    },
    {
        label: "合作单位",
        prop: "cf_coCompany",
        type: "input",
        attr: {
            placeholder: "请输入合作单位",
            maxlength: 100,
            type: "textarea",
            rows: 5,
        },
        rules: [
            {
                required: true,
                message: "请输入合作单位",
            },
        ],
    },
    {
      prop: "cf_fileUrl",
      label: "文件上传",
      type: "fileUpload", // 上传,
      defaultVal: [],
      attr: {
        limit: 10,
        isShowTip: false,
      },
    },
    {
      prop: "cf_remark",
      label: "基地简介",
      type: "textarea",
      attr: {
        placeholder: "请输入基地简介",
        rows: 6,
      },
    },
]

// 师资共建
const mkTeachersForm = (querySearch) =>  [
    {
        prop: 'cf_practiceCompany',
        label: '授课（实践）单位名称',
        type: 'input',
        attr: {
            placeholder: '请输入授课（实践）单位名称',
            clearable: true
        },
        rules: [
            {
                required: true,
                message: "请输入授课（实践）单位名称",
            },
        ],
    },
    {
        prop: 'cf_targetCompany',
        label: '目标单位',
        type: 'input',
        attr: {
            placeholder: '请输入目标单位',
            clearable: true
        },
        rules: [
            {
                required: true,
                message: "请输入目标单位",
            },
        ],
    },
    {
        prop: "cf_type",
        label: "类型",
        type: "select", // 输入框,
        options: [],
        rules: [
            {
                required: true,
                message: "请选择类型",
            },
        ],
    },
    {
        prop: "cf_courseName",
        label: "授课课程名称",
        type: "autocomplete", // 输入框
        attr: {
            placeholder: '请输入授课课程名称',
            filterable: true,
            remote: true,
            fetchSuggestions: querySearch,
            valueKey: "courseName",
        },
        rules: [
          { required: true, message: "请输入授课课程名称" },
          { min: 1, max: 50, message: "最多输入50个字符", trigger: "change" },
        ],
    },
    {
        prop: 'cf_classNum',
        label: '授课课时数（课时)',
        type: 'input',
        attr: {
            placeholder: '请输入授课课时数（课时)',
            clearable: true
        },
        rules: [
            {
                required: true,
                message: "请输入授课课时数（课时)",
            },
        ],
    },
    {
        prop: "cf_info",
        label: "教师信息",
        type: 'input',
        attr: {
            placeholder: '请输入教师信息',
            clearable: true
        },
        rules: [
            {
                required: true,
                message: "请输入教师信息",
            },
        ],
    },
    {
        prop: 'cf_courseDay',
        label: '授课天数（天）',
        type: 'input',
        attr: {
            placeholder: '请输入授课天数（天）',
            clearable: true
        },
        rules: [
            {
                required: true,
                message: "请输入授课天数（天）",
            },
        ],
    },
    {
        prop: 'cf_studentNum',
        label: '学生人数（人）',
        type: 'input',
        attr: {
            placeholder: '请输入学生人数（人）',
            clearable: true
        },
        rules: [
            {
                required: true,
                message: "请输入学生人数（人）",
            },
        ],
    },
    {
        prop: 'cf_department',
        label: '实践部门',
        type: 'input',
        attr: {
            placeholder: '请输入实践部门',
            clearable: true
        },
        rules: [
            {
                required: true,
                message: "请输入实践部门",
            },
        ],
    },
    {
        prop: "cf_year",
        label: "创建年份",
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
                message: "请选择创建年份",
                trigger: "change",
            },
        ],
    },
]

const companyNameData = (remoteMethod, that) => [    
    {
        prop: "companyId",
        label: "单位名称",
        type: "select", // 输入框,
        options: [],
        attr: {
            placeholder: "请输入搜索单位名称并选择",
            filterable: true,
            remote: true,
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
]
const allForm = [
    {
        prop: "exchange",
        label: "国际交流合作",   
        slot: "exchange",
    },
    {
        prop: "policy",
        label: "支持国家或区域政策",      
        slot: "policy",
    }
]
const objForms = {
    '1': mkMajorForm,
    '2': mkMajorGroupForm,
    '3': mkCourseForm,
    '4': mkTextbookForm,
    '5': mkBaseForm,
    '6': mkTeachersForm
}
export {
    objForms,
    mkMajorForm,
    mkMajorGroupForm,
    mkCourseForm,
    mkTextbookForm,
    mkBaseForm,
    mkTeachersForm,
    allForm,
    companyNameData
}