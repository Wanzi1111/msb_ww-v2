const searchs = [
  {
    prop: '机构名称',
    label: '机构名称',
    type: 'input',
    layer: 'defaultNew',
    attr: {
      placeholder: '请输入机构名称',
      size: 'small',
      clearable: true
    }
  },
  {
    prop: '机构类型',
    label: '机构类型',
    type: 'select',
    layer: 'defaultNew',
    options: [
      {
        label: '正式课',
        value: '1'
      },
      {
        label: '试听课',
        value: '2'
      },
      {
        label: '专题课',
        value: '3'
      }
    ],
    attr: {
      placeholder: '请选择',
      clearable: true,
      size: 'small'
    }
  },
  {
    prop: '负责人',
    label: '负责人',
    type: 'input',
    layer: 'defaultNew',
    attr: {
      placeholder: '请输入负责人',
      size: 'small',
      clearable: true
    }
  },
  {
    prop: '状态',
    label: '状态',
    type: 'select',
    layer: 'defaultNew',
    options: [
      {
        label: '正式课',
        value: '1'
      },
      {
        label: '试听课',
        value: '2'
      },
      {
        label: '专题课',
        value: '3'
      }
    ],
    attr: {
      placeholder: '请选择',
      clearable: true,
      size: 'small'
    }
  },
]

export {
  searchs
}