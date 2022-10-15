/*
 * @Author: hqk
 * @Date: 2022-02-06 13:19:59
 * @LastEditors: hqk
 * @LastEditTime: 2022-08-25 15:13:26
 * @FilePath: \vue3-cms\src\global\register-properties.ts
 * @Description:
 */
import { App } from 'vue'
import { formatUtcString } from '@/utils/date-format'

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
