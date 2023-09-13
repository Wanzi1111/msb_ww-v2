import store from "@/store";
import { statusList } from '@/utils/commonDicts';
const visible = store.state?.user?.department_demo === 1;

export default (activeType, remoteMethod, that)=>[
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
        label: '班级名称',
        type: 'input',
        attr: { 
            placeholder: '请输入基地名称',
            clearable: true
        },
    }, 
    {
        prop: "positionName",
        label: "就业岗位",
        type: "input", // 输入框,
        attr: {
          placeholder: "请输入",
          maxlength: 100,
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