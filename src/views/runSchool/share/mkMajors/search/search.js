import store from "@/store";
import { statusList } from '@/utils/commonDicts';
const visible = store.state?.user?.department_demo === 1;

export default (remoteMethod, that)=> [
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
        label: '专业名称',
        type: 'input',
        attr: { 
            placeholder: '请输入',
            clearable: true
        },
    }, 
    {
        label: "专业类型",
        prop: "type",
        type: 'select',
        attr: {
            placeholder: "请选择",
            multiple: true,
            collapseTags: true,
          },
    },
    {
        prop: "level",
        label: "专业群等级",
        type: "select", // 输入框,
        visible: false,
        options: [],
        rules: [
            {
                required: true,
                message: "请选择等级",
            },
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