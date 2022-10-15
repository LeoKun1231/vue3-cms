import myRequest from '@/service'
import { IDataType } from '@/service/types'

enum GategoryUrl {
  GOODSCOUNT = '/goods/category/count',
  GOODSSALECOUNT = '/goods/category/sale',
  GOODSFAVORCOUNT = '/goods/category/favor',
  GOODSADDRESSSALECOUNT = '/goods/address/sale',
  goodsSaleTop10 = '/goods/sale/top10',
  amountList = '/goods/amount/list'
}

export function getAmountList() {
  return myRequest.get<IDataType>({
    url: GategoryUrl.amountList
  })
}
export function getCategoryGoodsCount() {
  return myRequest.get<IDataType>({
    url: GategoryUrl.GOODSCOUNT
  })
}

export function getCategoryGoodsSaleCount() {
  return myRequest.get<IDataType>({
    url: GategoryUrl.GOODSSALECOUNT
  })
}

export function getCategoryGoodsFavorCount() {
  return myRequest.get<IDataType>({
    url: GategoryUrl.GOODSFAVORCOUNT
  })
}

export function getGoodsAddressSaleCount() {
  return myRequest.get<IDataType>({
    url: GategoryUrl.GOODSADDRESSSALECOUNT
  })
}

export function getGoodsSaleTop10() {
  return myRequest.get({
    url: GategoryUrl.goodsSaleTop10
  })
}
