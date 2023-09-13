import store from "@/store";
import { statusList } from '@/utils/commonDicts';
const visible = store.state?.user?.department_demo === 1;

export default (remoteMethod, that)=>[
    {
        label: "单位名称:",
        prop: "companyId",
        type: "select",
        visible,
        attr: {
          placeholder: "请输入",
          clearable: true,
          filterable: true,
          remote: true,
          remoteMethod: (query) => remoteMethod.call(that, query, "searchs"),
        },
    },
    {
        prop: 'name',
        label: '课程名称',
        type: 'input',
        attr: { 
            placeholder: '请输入',
            clearable: true
        },
    }, 
    {
        label: "课程类型",
        prop: "type",
        type: "select",
        attr: {
          placeholder: "请输入",
          clearable: true,
        },
        options: [],
        
    },
    {
        prop: "level",
        label: "课程级别",
        type: "select", // 输入框,
        attr: {
            placeholder: "请输入",
            clearable: true,
        },
        options: [],
    },

    {
        prop: "level",
        label: "获奖级别",
        type: "select", // 输入框,
        attr: {
            placeholder: "请输入",
            clearable: true,
        },
        options: [],
    },
    {
        prop: 'status',
        label: '状态',
        type: 'select',
        options: statusList,
        attr: {
            placeholder: '请选择',
            clearable: true,
        }
    }
]