import { Iform } from '@/base-ui/form'

export const modalConfig: Iform = {
  formItem: [
    {
      field: 'name',
      type: 'input',
      label: '类别名称',
      placeholder: '请输入类别'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
