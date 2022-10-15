export const contentTableConfig = {
  title: '商品列表',
  propList: [
    { prop: 'name', label: '商品名', minWidth: '100' },
    {
      prop: 'oldPrice',
      label: '旧价格',
      minWidth: '60',
      slotName: 'oldPrice'
    },
    {
      prop: 'newPrice',
      label: '新价格',
      minWidth: '60',
      slotName: 'newPrice'
    },
    {
      prop: 'imgUrl',
      label: '商品图片',
      minWidth: '100',
      slotName: 'image'
    },
    {
      prop: 'status',
      label: '状态',
      minWidth: '70',
      slotName: 'status'
    },
    {
      prop: 'inventoryCount',
      label: '库存',
      minWidth: '60'
    },
    { prop: 'saleCount', label: '已售', minWidth: '60' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '130',
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
      minWidth: '100',
      slotName: 'handler'
    }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
