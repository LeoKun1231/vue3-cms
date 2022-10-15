import { ref } from 'vue'
import PageContent from '@/components/page-content'
export function usePageSearch(): any {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handlerReset = () => {
    pageContentRef.value?.getPageData()
  }
  const handlerQuery = (value: any) => {
    console.log(value)

    pageContentRef.value?.getPageData(value)
  }

  return [pageContentRef, handlerReset, handlerQuery]
}
