import store from "@/store";
import { statusList } from '@/utils/commonDicts';
const visible = store.state?.user?.department_demo === 1;

export default  (remoteMethod, that)=>[
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
        prop: 'name',
        label: '教材名称',
        type: 'input',
        attr: { 
            placeholder: '请输入教材名称',
            clearable: true
        },
    }, 
    {
        label: "教材类型",
        prop: "type",
        type: "select",
        attr: {
          placeholder: "请输入",
          clearable: true,
        },
        options: [
            {
                label: '改编教材',
                value: '0'
            }, {
                label: '新建教材',
                value: '1'
            }
        ],
    },
    {
        prop: "level",
        label: "教材级别",
        type: "select", // 输入框,
        attr: {
            placeholder: "请输入",
            clearable: true,
        },
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