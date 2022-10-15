export const contentTableConfig = {
  title: '类别列表',
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '150',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '150',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      midWidth: '150',
      slotName: 'handler'
    }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
