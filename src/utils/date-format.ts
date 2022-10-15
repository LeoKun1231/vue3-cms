import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_FORMAT_TIME = 'YYYY-MM-DD HH:mm:ss'
export function formatUtcString(
  utcString: string,
  format: string = DATE_FORMAT_TIME
) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
