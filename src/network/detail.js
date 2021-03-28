import { request } from "./request"
export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}
export function getRecommend() {
    return request({
        url: '/recommend',
    })
}
export class Goods {//将分散于各个数组的信息整合起来 整合成一个新的 创建一个类 将所需要的数组作为参数传递进来 然后组件引入这个类 将受到的数据传递进去 重新整合粗一个
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods

    }
}
export class GoodsParams {
    constructor(info, rule) {
        this.image = info.image ? info.image[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}