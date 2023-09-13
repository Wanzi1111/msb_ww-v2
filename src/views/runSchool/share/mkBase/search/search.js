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
        prop: 'name',
        label: '基地名称',
        type: 'input',
        attr: { 
            placeholder: '请输入基地名称',
            clearable: true
        },
    }, 
    {
        label: "基地类型",
        prop: "type",
        type: "select",
        attr: {
          placeholder: "请输入",
          clearable: true,
        },
        options: [
            {
                label: '校内基地',
                value: '0'
            }, {
                label: '校外基地',
                value: '1'
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