/*
 * @Author: hqk
 * @Date: 2022-02-08 15:55:37
 * @LastEditors: hqk
 * @LastEditTime: 2022-10-11 09:12:41
 * @Description:
 */
import PageModal from '@/components/page-modal'
import { ref } from 'vue'
type CallbackFn = (payload?: any) => void
export function usePageModal(
  createCallback?: CallbackFn,
  editCallback?: CallbackFn
): any {
  const defaultRef = ref({})
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  // 处理新建操作
  const handlerCreate = () => {
    defaultRef.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    createCallback && createCallback()
  }
  // 处理编辑操作
  const handlerEdit = (value: any) => {
    console.log(value)

    defaultRef.value = { ...value }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    editCallback && editCallback(value)
  }
  return [pageModalRef, defaultRef, handlerCreate, handlerEdit]
}
