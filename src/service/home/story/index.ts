import { storyRequest } from '@/service'
import { IDataType } from '@/service/types'

export function addStory(value: any) {
  return storyRequest.post<IDataType>({
    url: '/story/add',
    data: value
  })
}

export function getAllStory(queryInfo: any) {
  return storyRequest.get<IDataType>({
    url: '/story/list',
    params: queryInfo
  })
}
