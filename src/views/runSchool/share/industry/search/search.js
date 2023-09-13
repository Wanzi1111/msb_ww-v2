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
        prop: 'academyName',
        label: '产业学院名称',
        type: 'input',
        attr: { 
            placeholder: '请输入',
            clearable: true
        },
    },
    {
        label: "创建时间",
        prop: "citme",
        type: "datePicker",
        attr: {
            type: "daterange",
            placeholder: "请输入创建时间",
            clearable: true,
            startPlaceholder: "开始时间",
            endPlaceholder: "结束时间",
            valueFormat: "yyyy-MM-dd",
        },
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