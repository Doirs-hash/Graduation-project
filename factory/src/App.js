import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'

import OrderList from './pages/order/order_list/orderList'
import GoodsList from './pages/goods/goods_list/goodsList'
import Statistics from './pages/stock/statistics'
import OrderGoOut from './pages/stock/orderGoOut'
import GoodsGoIn from './pages/stock/goodsGoIn'
import GoodsGoOut from './pages/stock/goodsGoOut'
import GoodsStatistics from './pages/production/goodsStatistics'
import ProductionOrder from './pages/production/productionOrder'
import ProductionGoIn from './pages/stock/productionGoIn'

import Customer from './pages/customer/customer'
import Account from './pages/account/account'

import OrderCharts from './pages/charts/order'
import GoodsCharts from './pages/charts/goods'

import './App.less'

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Admin />} >
                        {/* 订单 */}
                        <Route path='/order/orderList' element={<OrderList />}></Route>{/* 订货单 */}
                        {/* 商品 */}
                        <Route path='/goods/goodsList' element={<GoodsList />}></Route>{/* 商品列表 */}
                        {/* 库存 */}
                        <Route path='/order/goodsStock' element={<Statistics />}></Route>{/* 商品库存 */}
                        <Route path='/goods/goodsWarehousing' element={<GoodsGoIn />}></Route>{/* 商品入库 */}
                        <Route path='/goods/goodsExWarehousing' element={<GoodsGoOut />}></Route>{/* 商品出库 */}
                        <Route path='/goods/productionGoIn' element={<ProductionGoIn />}></Route>{/* 生产订单入库 */}
                        <Route path='/order/orderExWarehouse' element={< OrderGoOut />}></Route>{/* 订单出库 */}
                        {/* 生产 */}
                        <Route path='/production/order' element={<ProductionOrder />}></Route>{/* 生产订单 */}
                        <Route path='/production/Statistics' element={<GoodsStatistics />}></Route>{/* 生产商品统计 */}
                        {/* 客户 */}
                        <Route path='/customer' element={<Customer />}></Route>{/* 客户列表 */}
                        {/* 账户 */}
                        <Route path='/account' element={<Account />}></Route>{/* 账户管理 */}
                        {/* 图表 */}
                        <Route path='/charts/order' element={<OrderCharts />}></Route>{/* 账户管理 */}
                        <Route path='/charts/goods' element={<GoodsCharts />}></Route>{/* 账户管理 */}

                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}


