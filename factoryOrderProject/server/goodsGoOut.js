const express = require('express')
const goodsGoOut = express.Router()
const moment=require('moment')
const DB = require('./DB')
const mysql = DB.single.mysql
const tablename = "goodscheckout"

//数据库数据转为数组 
outOrderdbDataToArr = (datas) => {
    let result = [{}];
    let arrData = datas.split(',');
    for (let i = 0; i < arrData.length-1; i += 4) {
        //name:商品名， num：个数
        result[i / 4] = {
            key: arrData[i],
            name: arrData[i+1],
            num: Number(arrData[i+2]),
            price: arrData[i+3],
        }
    }
    return result;
}
/**
 *  查看所有待出库的订单
 */
 goodsGoOut.get('/order/look', (request, response) => {
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        var value = [];
        value[0] = "待出库";
        let sql = "select * from orderlist where orderStates=?";
        let tables;
        tables = await mysql.select(sql,value);
        let result = [];
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({ msg: '数据读取错误', status: 1 })
        } else {
            if (tables.length == 0) {
                response.send({ status: 0, msg:"未查找到数据"})
            }
            for (let i = 0; i < tables.length; i++) {
                result[i] = {};
                result[i].key = tables[i].id;
                result[i].xdtime = moment(tables[i].xdtime).format('YYYY-MM-DD') ;
                result[i].customer = tables[i].customer;
                result[i].price = tables[i].price;
                result[i].deliver = tables[i].deliver;
                result[i].people = tables[i].people;
                result[i].cm = tables[i].cm;
                result[i].orderStates = tables[i].orderStates;
                result[i].jhtime = moment(tables[i].jhtime).format('YYYY-MM-DD') ;
                result[i].goodsList = outOrderdbDataToArr(tables[i].goodslist);
            }
            // console.log(result);
            response.send({ status: 0, msg:"查询成功",data: result })
        }
    })
})


/**
 *  查看商品出库所有记录 
 */
 goodsGoOut.get('/goods/look', (request, response) => {
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        var value = [];
        let sql = "select * from "+tablename;
        let tables;
        tables = await mysql.select(sql,value);
        let result = [];
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({ msg: '数据读取错误', status: 1 })
        } else {
            if (tables.length == 0) {
               return response.send({ status: 0, msg:"未查找到数据"})
            }
            for (let i = 0; i < tables.length; i++) {
                result[i] = {};
                result[i].key = tables[i].id;
                result[i].goodsid = tables[i].goodsid;
                result[i].goodsname = tables[i].goodsname;
                result[i].goodsspecs = tables[i].goodsspecs;
                result[i].goodsunit = tables[i].goodsunit;
                result[i].num = tables[i].num;
                result[i].time = moment(tables[i].time).format("YYYY-MM-DD");
                result[i].operator = tables[i].operator;
            }
            // console.log(result);
            response.send({ status: 0, msg:"查询成功",data: result })
        }
    })
})

goodsGoOut.post('/data/query', (request, response) => {
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        var value = [];
        let sql = "select * from "+tablename+' where goodsname=?';
        let tables;
        value[0]=datas
        tables = await mysql.select(sql,value);
        let result = [];
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({ msg: '数据读取错误', status: 1 })
        } else {
            if (tables.length == 0) {
               return response.send({ status: 0, msg:"未查找到数据"})
            }
            for (let i = 0; i < tables.length; i++) {
                result[i] = {};
                result[i].key = tables[i].id;
                result[i].goodsid = tables[i].goodsid;
                result[i].goodsname = tables[i].goodsname;
                result[i].goodsspecs = tables[i].goodsspecs;
                result[i].goodsunit = tables[i].goodsunit;
                result[i].num = tables[i].num;
                result[i].time = moment(tables[i].time).format("YYYY-MM-DD");
                result[i].operator = tables[i].operator;
            }
            // console.log(result);
            response.send({ status: 0, msg:"查询成功",data: result })
        }
    })
})

/**
 *  订单出库
 */
 goodsGoOut.post('/order/add', (request, response) => {
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        datas = JSON.parse(datas)
        console.log(datas)
        let sql = "";
        let tables;
        //查询出所有商品的ID,数量----商品ID作为下标
        let goodsDbData = [];
        {
            sql = 'select * from goodslist'
            tables = await mysql.select(sql,[]);
            for (let i = 0; i < tables.length; i++) {
                let temp = tables[i].id;
                goodsDbData[temp] = {};
                goodsDbData[temp].key = tables[i].id;
                goodsDbData[temp].name = tables[i].name;
                goodsDbData[temp].size = tables[i].size;
                goodsDbData[temp].company = tables[i].company;
                goodsDbData[temp].stock = tables[i].stock;
            }
        }
        console.log(goodsDbData)
        //商品数量不足，无法出库
        for (const data of datas.goodslist) {
            console.log(data.key*1);
            console.log(goodsDbData[data.key*1]);
            if(goodsDbData[data.key*1].stock*1-data.num*1<0){
               return response.send({ status: 1, msg:"出库失败,"+data.name+"商品数量不足"});
            }
        }
        //将出库的订单商品列表进行出库,----库存商品数量-出库数量    ,   商品ID
        for (const data of datas.goodslist) {
            //更新库存的数量
            sql = "update goodslist set stock=? where id=?"
            await mysql.select(sql,[goodsDbData[data.key*1].stock*1-data.num*1,data.key*1]);
            //生成出库记录
            sql = 'insert into goodscheckout(id,goodsid,goodsname,goodsspecs,goodsunit,num,time,operator) value(?,?,?,?,?,?,?,?)'
            let goodsvalue = [];
            goodsvalue[0] = null;
            goodsvalue[1] = data.key*1;
            goodsvalue[2] = goodsDbData[data.key*1].name;
            goodsvalue[3] = goodsDbData[data.key*1].size;
            goodsvalue[4] = goodsDbData[data.key*1].company;
            goodsvalue[5] = data.num;
            goodsvalue[6] = datas.time;
            goodsvalue[7] = datas.operator;
            await mysql.select(sql,goodsvalue);
        }
        //将订单状态改为已完成
        sql = "update orderlist set orderStates=? where id=?"
        tables = await mysql.select(sql,["已完成",datas.id]);
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({ status: 1, msg:"出库失败"})
        } else {
            response.send({ status: 0, msg:"出库成功"})
        }
    })
})

module.exports = goodsGoOut