/*
 * @Descripttion: 
 * @version: 
 * @Author: gaoleifang
 * @Date: 2023-03-15 18:26:45
 * @LastEditors: gaoleifang
 * @LastEditTime: 2023-03-16 19:07:18
 */
export default [
  {
    prop: 'id',
    label: 'ID',
    align: 'center',
  },
  {
    prop: '序号',
    label: '序号',
    align: 'center',
  },
  {
    prop: '机构类型',
    label: '机构类型',
    align: 'center',
  },
  {
    prop: '负责人',
    label: '负责人',
    align: 'center',
  },
  {
    prop: '联系人',
    label: '联系人',
    align: 'center',
  },
  {
    prop: '联系方式',
    label: '联系方式',
    align: 'center',
  },
  {
    prop: '成立时间',
    label: '成立时间',
    align: 'center',
  },
  {
    prop: '状态',
    label: '状态',
    align: 'center',
  },
  {
    prop: '创建时间',
    label: '创建时间',
    align: 'center',
  },
  {
    name: 'action',
    width: 100,
    prop: 'action',
    label: '操作',
    align: 'center',
    action: true
  }
]

export const actions = ({ onSub }) => {
  return {
    action: (dat, row, index) => {
      return [
        {
          type: 'button',
          label: '编辑',
          click: () => onSub('editGroup'),
          attr: {
            size: 'mini',
            icon: 'el-icon-view'
          }
        },
        {
          type: 'button',
          label: '查看',
          click: () => onSub('checkGroup'),
          attr: {
            size: 'mini',
            icon: 'el-icon-view'
          }
        },
        {
          type: 'button',
          label: '机构单位维护',
          click: () => onSub('saveGroup'),
          attr: {
            size: 'mini',
            icon: 'el-icon-view'
          }
        },
        {
          type: 'button',
          label: '解散',
          click: () => onSub('disGroup'),
          attr: {
            size: 'mini',
            icon: 'el-icon-view'
          }
        },
      ]
    }
  }
}

export const columnStruck = [
  {
    prop: '序号',
    label: '序号',
    align: 'center',
  },
  {
    prop: '单位名称',
    label: '单位名称',
    align: 'center',
  },
  {
    name: 'action',
    width: 100,
    prop: 'action',
    label: '操作',
    align: 'center',
    action: true
  }
]

export const actionsStruck = ({onSub}) => {
  return {
    action: (dat, row, index) => {
      return [
        {
          type: 'button',
          label: '撤销',
          click: () => onSub('cancel'),
          attr: {
            size: 'mini',
            icon: 'el-icon-view'
          }
        },
      ]
    }
  }
}