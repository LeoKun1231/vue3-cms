import { Iform } from '@/base-ui/form'

export const modalConfig: Iform = {
  formItem: [
    {
      field: 'name',
      type: 'input',
      label: '部门名称',
      placeholder: '请输入部门'
    },
    {
      field: 'parentId',
      type: 'select',
      label: '上级部门',
      placeholder: '请选择上级部门',
      options: []
    },
    {
      field: 'leader',
      type: 'select',
      label: '部门领导',
      placeholder: '请选择部门领导',
      options: []
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
