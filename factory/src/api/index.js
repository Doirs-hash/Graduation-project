import ajax from "./ajax";
const URL='http://localhost:5000'

export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

export const orderListLook= () => ajax(URL+'/orderList/look')
export const orderListAdd=(data)=>ajax(URL+'/orderList/add',data,'POST')
export const orderListChange=(data)=>ajax(URL+'/orderList/changeData',data,'POST')
export const orderListDel=(id)=>ajax(URL+'/orderList/delect',id,'POST')
export const orderListExamine=(id)=>ajax(URL+'/orderList/examine',id,'POST')
export const orderListQuery=(data,type)=>ajax(URL+'/orderList/query',{data,type},'POST')

//订单搜索请求{select:‘全部订单’，startData：2020-12-01，endData:2023-10-23，customer:'客户名称'}
export const orderListSearch=(data)=>ajax(URL+'/orderList/search',data,'POST')

export const goodsListLook=()=>ajax(URL+'/goodsList/look')
export const goodsListAdd=(data)=>ajax(URL+'/goodsList/add',data,'POST')
export const goodsListChange=(data)=>ajax(URL+'/goodsList/changeData',data,'POST')
export const goodsListDel=(id)=>ajax(URL+'/goodsList/delect',id,'POST')
export const goodsListStock=(value)=>ajax(URL+'/goodsList/stock/query',value,'POST')
export const goodsListQuery=(data,type)=>ajax(URL+'/goodsList/query',{data,type},'POST')

export const productListLook=()=>ajax(URL+'/production/order/look')
export const productListChange=(data,date,operator)=>ajax(URL+'/production/order/add',{data,date,operator},'POST')

export const goodsStatisticsListLook=()=>ajax(URL+'/production/goods/Statistics')
export const goodsStatisticsListChange=(id,member,finishtime)=>ajax(URL+'/production/goods/change',{id,member,finishtime},'POST')
export const productionQuery=(value)=>ajax(URL+'/production/goods/Statistics/query',value,'POST')
export const productionOrderQuery=(value,orderStatus)=>ajax(URL+'/production/goods/production/query',{value,orderStatus},'POST')//生产商品统计查询

export const goodsStockGoIn=()=>ajax(URL+'/stock/goodsGoIn/look')
export const goodsGoStock=(data,time,operator)=>ajax(URL+'/stock/goodsGoIn/add',{data,time,operator},'POST')
export const goodsGoLook=()=>ajax(URL+'/stock/data/look')//商品入库记录
export const goodsGoInQuery=(value)=>ajax(URL+'/stock/data/query',value,'POST')//商品入库记录搜索查询
export const stockProductQuery=(value)=>ajax(URL+'/stock/produciton/query',value,'POST')//生产订单入库记录搜索查询


export const goodsOutLook=()=>ajax(URL+'/stock/goout/goods/look')//商品出库记录
export const goodsOutInQuery=(value)=>ajax(URL+'/stock/goout/data/query',value,'POST')//商品出库记录搜索查询
export const orderGoOutSee=()=>ajax(URL+'/stock/goout/order/look')//订单出库查看
export const orderGoOutAdd=(id,goodslist,time,operator)=>ajax(URL+'/stock/goout/order/add',{id,goodslist,time,operator},'POST')//订单出库

export const customersLook=()=>ajax(URL+'/customer/look')
export const customersAdd=(data)=>ajax(URL+'/customer/add',data,'POST')
export const customersChange=(data)=>ajax(URL+'/customer/change',data,'POST')
export const customersDel=(id)=>ajax(URL+'/customer/del',id,'POST')
export const customersQuery=(name)=>ajax(URL+'/customer/query',name,'POST')

export const accountLook=()=>ajax(URL+'/account/look')
export const accountAdd=(data)=>ajax(URL+'/account/add',data,'POST')
export const accountChange=(data)=>ajax(URL+'/account/change',data,'POST')
export const accountDel=(id)=>ajax(URL+'/account/del',id,'POST')
export const accountQuery=(name)=>ajax(URL+'/account/query',name,'POST')

export const signIn=(data)=>ajax(URL+'/user/signin',{data},'POST')//订单出库







