import store from "@/store";
import { statusList } from '@/utils/commonDicts';
const visible = store.state?.user?.department_demo === 1;

export default (remoteMethod, that)=>[
    {
        label: "单位名称",
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
        prop: 'practiceCompany',
        label: '授课（实践）单位',
        type: 'input',
        attr: { 
            placeholder: '请输入',
            clearable: true
        },
    }, 
    {
        prop: "targetCompany",
        label: "目标单位",
        type: "input",
        attr: { 
            placeholder: '请输入',
            clearable: true
        },
    },
    {
        prop: "type",
        label: "类型",
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