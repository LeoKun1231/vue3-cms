/*
 * @Author: hqk
 * @Date: 2022-07-10 11:03:06
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-11 18:12:24
 * @Description:
 */
export const contentTableConfig = {
  title: '故事列表',
  propList: [
    {
      prop: 'username',
      label: '作者',
      minWidth: '120',
      slotName: 'username'
    },
    {
      prop: 'title',
      label: '故事标题',
      minWidth: '120',
      slotName: 'title'
    },
    {
      prop: 'info',
      label: '我的故事',
      minWidth: '500',
      slotName: 'info'
    },
    {
      prop: 'createTime',
      label: '创建时间',
      minWidth: '250',
      slotName: 'create'
    }
  ],
  showIndexColumn: true,
  showSelectColumn: false
}
