import { Iform } from '@/base-ui/form'
export const searchFormConfig: Iform = {
  labelWidth: '120px',
  formItem: [
    {
      field: 'name',
      type: 'input',
      label: '类别名称',
      placeholder: '请输入类别'
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
