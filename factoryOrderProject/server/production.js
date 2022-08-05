const express = require('express')
const moment = require('moment')
const production = express.Router()
const DB = require('./DB')
const mysql = DB.single.mysql
const tablename = "production"

//商品字符串转商品数组
productGoodsdbDataToArr = (datas) => {
    let result = [{}];
    let arrData = datas.split(',');
    for (let i = 3; i < arrData.length; i += 4) {
        //name:商品名， num：个数
        result[(i - 3) / 4] = {
            key: arrData[i - 3],
            name: arrData[i - 2],
            num: Number(arrData[i - 1]),
        }
    }
    return result;
}

productOrderdbDataToArr = (datas) => {
    let result = [{}];
    let arrData = datas.split(',');
    for (let i = 2; i < arrData.length; i += 3) {
        //name:商品名， num：个数
        result[(i - 2) / 3] = {
            key: arrData[i - 2],
            name: arrData[i - 1],
            num: Number(arrData[i]),
        }
    }
    return result;
}

//商品数组转商品字符串
productGoodsArrToDBdata = (arrs) => {
    let result = "";
    for (const arr of arrs) {
        result += arr.key + "," + arr.name + "," + arr.num + ",";
    }
    return result;
}


/**
 *  查看"待生产"的订单
 */
production.get('/order/look', (request, response) => {
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        var value = [];
        value[0] = "待生产";
        let sql = 'select * from orderlist where orderStates=?'
        let tables;
        tables = await mysql.select(sql, value);
        let result = [];
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
        } else {
            if (tables.length == 0) {
                return response.send({ status: 0, msg: "没有待生产订单" })
            }
            for (let i = 0; i < tables.length; i++) {
                result[i] = {};
                result[i].key = tables[i].id;
                result[i].customer = tables[i].customer;
                result[i].orderStates = tables[i].orderStates;
                result[i].goodsList = productGoodsdbDataToArr(tables[i].goodslist);
                console.log(tables[i].goodslist)
            }
            response.send({ status: 0, data: result })
        }
    })
})

//生产订单按客户名称查询
production.post('/goods/Statistics/query', (request, response) => {
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        var value = [];
        console.log(datas)
        value[0] = datas
        value[1] = '待生产'
        let sql = 'select * from orderlist where customer=? and orderStates=?'
        let tables;
        tables = await mysql.select(sql, value);
        let result = [];
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
        } else {
            if (tables.length == 0) {
                return response.send({ status: 0, msg: "未查询到订单" })
            }
            for (let i = 0; i < tables.length; i++) {
                result[i] = {};
                result[i].key = tables[i].id;
                result[i].customer = tables[i].customer;
                result[i].orderStates = tables[i].orderStates;
                result[i].goodsList = productGoodsdbDataToArr(tables[i].goodslist);
                console.log(tables[i].goodslist)
            }
            response.send({ status: 0, data: result, msg: '查询成功' })
        }
    })
})

/**
 *  新增生产订单
 */
production.post('/order/add', (request, response) => {
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        let tables;
        datas = JSON.parse(datas)
        console.log(datas)
        var value = [];
        value[0] = null;
        value[1] = "生产中";
        var valuegoods = [];
        value[2] = "";
        value[3] = datas.date;
        value[4] = null;
        value[5] = datas.operator;
        value[6] = "";
        for (const order of datas.data) {
            for (const goods of order.goodsList) {
                if (typeof valuegoods[goods.key] == Object) {
                    valuegoods[goods.key].num += goods.num * 1;
                } else {
                    valuegoods[goods.key] = {};
                    valuegoods[goods.key].key = goods.key;
                    valuegoods[goods.key].name = goods.name;
                    valuegoods[goods.key].num = goods.num * 1;
                }


            }
            value[6] += order.key + ",";
        }
        console.log(valuegoods);
        for (const key in valuegoods) {
            console.log(valuegoods[key]);
            value[2] += valuegoods[key].key + "," + valuegoods[key].name + "," + valuegoods[key].num + ",";
        }

        console.log(value[2] + "--");
        let sql = "insert into " + tablename + "(id,orderstatus,goodslist,creattime,finishtime,operator,member) value(?,?,?,?,?,?,?)";
        tables = await mysql.select(sql, value);
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({ msg: '转生产失败', status: 1 })
        } else {
            for (const order of datas.data) {
                let ordersql = "update orderlist set orderStates=? where id=?";
                tables = await mysql.select(ordersql, ["生产中", order.key * 1]);
            }
            response.send({ status: 0, msg: "转生产成功" })
        }
    })
})


/**
 *  查看所有生产中生产订单信息
 */
production.get('/goods/Statistics', (request, response) => {
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        var value = [];
        value[0] = "生产中";
        let sql = "select * from " + tablename + " where orderstatus=?";
        let tables;
        tables = await mysql.select(sql, value);
        let result = [];
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({ msg: '数据读取错误', status: 1 })
        } else {
            if (tables.length == 0) {
                return response.send({ status: 0, msg: "未查找到数据" })
            }
            for (let i = 0; i < tables.length; i++) {
                result[i] = {};
                result[i].key = tables[i].id;
                result[i].orderstatus = tables[i].orderstatus;
                result[i].goodslist = productOrderdbDataToArr(tables[i].goodslist);
                result[i].creattime = moment(tables[i].creattime).format('YYYY-MM-DD');
                // result[i].finishtime = moment(tables[i].finishtime).format('YYYY-MM-DD');
                result[i].operator = tables[i].operator;
                result[i].member = tables[i].member;
            }
            // console.log(result);
            response.send({ status: 0, msg: "查询成功", data: result })
        }
    })
})

production.post('/goods/production/query', (request, response) => {
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        datas=JSON.parse(datas)
        
        var value = [];
        value[0] = datas.orderStatus
        value[1] = datas.value*1
        console.log(value)
        let sql = "select * from " + tablename + " where orderstatus=? and id=?";
        let tables;
        tables = await mysql.select(sql, value);
        let result = [];
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({ msg: '数据读取错误', status: 1 })
        } else {
            if (tables.length == 0) {
                return response.send({ status: 0, msg: "未查找到数据" })
            }
            for (let i = 0; i < tables.length; i++) {
                result[i] = {};
                result[i].key = tables[i].id;
                result[i].orderstatus = tables[i].orderstatus;
                result[i].goodslist = productOrderdbDataToArr(tables[i].goodslist);
                result[i].creattime = moment(tables[i].creattime).format('YYYY-MM-DD');
                result[i].operator = tables[i].operator;
                result[i].member = tables[i].member;
            }
            // console.log(result);
            response.send({ status: 0, msg: "查询成功", data: result })
        }
    })
})

/**
 * 更改生产订单状态：生产中 => 待入库
 */
production.post('/goods/change', (request, response) => {
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        datas = JSON.parse(datas)
        let tables;
        var value = [];
        value[0] = "待入库";
        value[1] = datas.finishtime;
        value[2] = datas.id;
        let sql = "update " + tablename + " set orderstatus=?,finishtime=? where id=?"
        tables = await mysql.select(sql, value);

        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({ status: 1, msg: "转入库失败" })
        } else {
            let array = datas.member.split(',');
            for (let i = 0; i < array.length - 1; i++) {
                let ordersql = "update orderlist set orderStates=? where id=?";
                tables = await mysql.select(ordersql, ["待入库", array[i] * 1]);
            }
            response.send({ status: 0, msg: "转入库成功" })
        }
    })
})
module.exports = production