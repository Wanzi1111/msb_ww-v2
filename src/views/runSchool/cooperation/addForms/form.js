export default (remoteMethod, that, type) => [
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
        prop: 'className',
        label: '班级名称',
        type: 'input',
        attr: {
            placeholder: '请输入班级名称',
            clearable: true
        },
        rules: [
            {
                required: true,
                message: "请输入班级名称",
            },
        ],
    }, 
    {
        label: "参与企业",
        prop: "enterpriseName",
        type: "input",
        visible: type !== '4',
        attr: {
            placeholder: "请输入",
            maxlength: 100,
            type: "textarea",
            rows: 5,
        },
        rules: [
            {
                required: true,
                message: "请输入参与企业",
            },
        ],
    },
    {
        prop: 'studentNum',
        label: '学生人数(人)',
        type: 'input',
        attr: {
            placeholder: '请输入学生人数(人)',
            clearable: true
        },
        rules: [
            {
                required: true,
                message: "请输入学生人数(人)",
            },
        ],
    }, 
    {
        prop: 'employment',
        label: '就业人数(人)',
        type: 'input',
        attr: {
            placeholder: '请输入就业人数(人)',
            clearable: true
        },
        rules: [
            {
                required: true,
                message: "请输入就业人数(人)",
            },
        ],
    }, 
    {
        prop: 'positionName',
        label: '就业岗位',
        type: 'input',
        attr: {
            placeholder: '请输入就业岗位',
            clearable: true
        },
        rules: [
            {
                required: true,
                message: "请输入就业岗位",
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