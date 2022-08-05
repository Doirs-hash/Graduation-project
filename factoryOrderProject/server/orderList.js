const express = require('express')
const orderRouter = express.Router()
const moment=require('moment')
const DB = require('./DB')
const mysql = DB.single.mysql

orderRouter.post('/add', (request, response) => {
    let datas
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        datas= datas.replace('undefined','')
        datas = JSON.parse(datas)
        var orderlist = [];
        orderlist[0] = null;
        orderlist[1] = datas.xdtime;
        orderlist[2] = datas.customer;
        orderlist[3] = datas.price;
        orderlist[4] = datas.deliver;
        orderlist[5] = datas.people;
        orderlist[6] = datas.cm;
        orderlist[7] = datas.orderStates;
        orderlist[8] = datas.jhtime;
        orderlist[9] = orderArrToDBdata(datas.goodsList);
        
        let sql = 'insert into orderlist(id,xdtime,customer,price,deliver,people,cm,orderStates,jhtime,goodslist) value(?,?,?,?,?,?,?,?,?,?)'
        let tables;
        tables = await mysql.select(sql, orderlist);
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({status:1,msg:'数据添加失败'})
        } else {
            datas.key = tables.insertId;
            response.send({status:0,dataAdd:datas,msg:'数据添加成功'})
        }
        
    })
})

orderRouter.get('/look', (request, response) => {
    request.on('data',(chunk)=>{
        console.log('收到order/look请求')
    })
    request.on('end', async () => {
        // let id = datas.id
        let sql = 'select * from orderlist';
        let tables;
        tables = await mysql.select(sql);
        let result = [];
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({data:result,status:1,msg:'数据请求出错'})
        } else {
            if (tables.length == 0) {
               return response.send({data:result,status:0,msg:'没有查找到数据'})
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
                result[i].goodsList = orderdbDataToArr(tables[i].goodslist);
            }
            // console.log(result);
            response.send({data:result,status:0})
        }

    })
})

orderRouter.post('/changeData',(request,response)=>{
    let datas=''
    request.on('data', (chunk) => {
        datas+=chunk
    })
    request.on('end',async ()=>{
        datas = JSON.parse(datas)
        console.log(datas)
        var orderlist = [];
        orderlist[0] = datas.xdtime;
        orderlist[1] = datas.customer;
        orderlist[2] = datas.price;
        orderlist[3] = datas.deliver;
        orderlist[4] = datas.people;
        orderlist[5] = datas.cm;
        orderlist[6] = datas.orderStates;
        orderlist[7] = datas.jhtime;
        orderlist[8] = orderArrToDBdata(datas.goodsList);
        orderlist[9] = datas.key;
        let sql = 'update orderlist set xdtime=?,customer=?,price=?,deliver=?,people=?,cm=?,orderStates=?,jhtime=?,goodslist=? where id=?'
        let tables;
        tables = await mysql.select(sql,orderlist);
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({status:1,msg:'数据修改失败'})
        } else {
            console.log(tables);
            response.send({status:0,msg:'数据修改成功'})
        }
    })
})

orderRouter.post('/examine',(request,response)=>{
    let datas=''
    request.on('data', (chunk) => {
        datas+=chunk
    })
    request.on('end',async()=>{
        let value='待生产'
        let sql = 'update orderlist set orderStates=? where id=?'
        let tables
        tables = await mysql.select(sql,[value,datas]);
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({status:1,msg:'审核通过失败'})
        } else {
            console.log(tables);
            response.send({status:0,msg:'审核通过'})
        }
    })
})

orderRouter.post('/delect',(request,response)=>{
    let datas
    request.on('data',(chunk)=>{
        datas+=chunk
    })
    request.on('end',async ()=>{
        datas= datas.replace('undefined','')
        let data = datas*1
        let sql = 'delete from orderlist where id = ?'
        let tables;
        tables = await mysql.select(sql,data);
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({status:1,msg:'删除失败'})
        } else {
            console.log(tables);
            response.send({status:0,msg:'删除成功'})
        }
    })
})

orderRouter.post('/query', (request, response) => {
    let datas=''
    request.on('data', (chunk) => {
        datas+=chunk
    })
    request.on('end', async () => {
        datas=JSON.parse(datas)
        let str=datas.type
        let value=datas.data
        let sql = 'select * from orderlist where '+str+'=?';
        console.log(sql)
        let tables;
        tables = await mysql.select(sql,[value]);
        let result = [];
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            return response.send({msg:'查找数据出错数据',status:1})
        } else {
            if (tables.length == 0) {
               return response.send({msg:'没有匹配的数据',status:0})
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
                result[i].goodsList = orderdbDataToArr(tables[i].goodslist);
            }
            // console.log(result);
            response.send({data:result,msg:'查询成功',status:0})
        }

    })
})


//数组转为数据库存储数据
orderArrToDBdata = (arrs) => {
    let result = "";

    for (const arr of arrs) {
        result +=arr.key+","+ arr.name + "," + arr.num + "," + arr.price + ","
    }
    return result;
}
//数据库数据转为数组 
orderdbDataToArr = (datas) => {
    let result = [{}];
    let arrData = datas.split(',');
    for (let i = 3; i < arrData.length; i += 4) {
        //name:商品名， num：个数
        result[(i - 3) / 4] = {
            key: arrData[i - 3],
            name: arrData[i - 2],
            num: Number(arrData[i - 1]),
            price: arrData[i],
        }
    }
    return result;
}

module.exports = orderRouter