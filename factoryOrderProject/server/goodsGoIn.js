const express = require('express')
const goodsGoIn = express.Router()
const moment=require('moment')
const DB = require('./DB')
const mysql = DB.single.mysql
const tablename = "goodscheckin"

//商品字符串转商品数组
StockGoodsdbDataToArr = (datas) => {
    let result = [{}];
    let arrData = datas.split(',');
    for (let i = 0; i < arrData.length-1; i += 3) {
        //name:商品名， num：个数
        result[i/ 3] = {
            key: arrData[i],
            name: arrData[i+1],
            num: Number(arrData[i+2]),
        }
    }
    return result;
}

/**库存模块
 *  查看所有*待入库生产订单信息
 */
 goodsGoIn.get('/goodsGoIn/look', (request, response) => {
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        var value = [];
        value[0] = "待入库";
        let sql = "select * from production where orderstatus=?";
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
                result[i].orderStates = tables[i].orderstatus;
                result[i].goodslist = StockGoodsdbDataToArr(tables[i].goodslist);
                result[i].creattime = tables[i].creattime;
                result[i].finishtime = tables[i].finishtime;
                result[i].operator = tables[i].operator;
                result[i].order =tables[i].member;
            }
            // console.log(result);
            response.send({ status: 0, msg:"查询成功",data: result })
        }
    })
})

goodsGoIn.post('/produciton/query', (request, response) => {
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        var value = [];
        value[0] = "待入库"
        value[1]=datas*1
        let sql = "select * from production where orderstatus=? and id=?";
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
                result[i].orderStates = tables[i].orderstatus;
                result[i].goodslist = StockGoodsdbDataToArr(tables[i].goodslist);
                result[i].creattime = tables[i].creattime;
                result[i].finishtime = tables[i].finishtime;
                result[i].operator = tables[i].operator;
                result[i].order =tables[i].member;
            }
            // console.log(result);
            response.send({ status: 0, msg:"查询成功",data: result })
        }
    })
})

/**
 *  查看所有信息 
 */
goodsGoIn.get('/data/look', (request, response) => {
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

//商品入库记录搜索查询
goodsGoIn.post('/data/query', (request, response) => {
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
 *  入库<待完成>
 */
 goodsGoIn.post('/goodsGoIn/add', (request, response) => {
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        datas = JSON.parse(datas)
        console.log(datas)
        var value = [];
        value[0] = '待出库';
        value[1] = datas.data.key;
        let sql = "update production set orderstatus=? where id=?"
        let tables;
        tables = await mysql.select(sql,value);
        console.log(tables);
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({ status: 1, msg:"入库失败"})
        } else {
            //查询出所有商品的ID,数量----商品ID作为下标
            let goodsDbData = [];
            
                let goodssql = 'select * from goodslist'
                let goodstables = await mysql.select(goodssql,[]);
                for (let i = 0; i < goodstables.length; i++) {
                    let temp = goodstables[i].id;
                    goodsDbData[temp] = {};
                    goodsDbData[temp].key = goodstables[i].id;
                    goodsDbData[temp].name = goodstables[i].name;
                    goodsDbData[temp].size = goodstables[i].size;
                    goodsDbData[temp].company = goodstables[i].company;
                    goodsDbData[temp].stock = goodstables[i].stock;
                }
            //将入库的商品列表进行入库,----获取数量+添加数量    ,   商品ID
            for (const data of datas.data.goodslist) {
                console.log(data);
                sql = "update goodslist set stock=? where id=?"
                await mysql.select(sql,[goodsDbData[data.key*1].stock*1+data.num,data.key*1]);
                sql = 'insert into goodscheckin(id,goodsid,goodsname,goodsspecs,goodsunit,num,time,operator) value(?,?,?,?,?,?,?,?)'
                let goodsvalue = [];
                goodsvalue[0] = null;
                goodsvalue[1] = data.key*1;
                goodsvalue[2] = goodsDbData[data.key].name;
                goodsvalue[3] = goodsDbData[data.key].size;
                goodsvalue[4] = goodsDbData[data.key].company;
                goodsvalue[5] = data.num;
                goodsvalue[6] = datas.time;
                goodsvalue[7] = datas.operator;
                await mysql.select(sql,goodsvalue);
            }
            //将订单状态改为入库
            let array = datas.data.order.split(',');
            for (let i = 0; i < array.length; i++) {
                sql = "update orderlist set orderStates=? where id=?"
                await mysql.select(sql,['待出库',array[i]]);
            }
            //新增入库记录
            response.send({ status: 0, msg:"入库成功"})
        }
    })
})

module.exports = goodsGoIn