const express = require('express')
const goodsRouter = express.Router()
const DB = require('./DB')
const mysql = DB.single.mysql

goodsRouter.get('/look', (request, response) => {
    request.on('data', (chunk) => {
        console.log(chunk)
    })
    request.on('end', async () => {
        let sql = 'select * from goodslist'
        let tables;
        tables = await mysql.select(sql);
        let result = [];
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({ msg: '数据读取错误', status: 1 })
        } else {
            if (tables.length == 0) {
               return response.send({msg:'没有查找到数据',status:0})
            }
            for (let i = 0; i < tables.length; i++) {
                result[i] = {};
                result[i].key = tables[i].id;
                result[i].name = tables[i].name;
                result[i].size = tables[i].size;
                result[i].color = tables[i].color;
                result[i].classify = tables[i].classify;
                result[i].company = tables[i].company;
                result[i].stock = tables[i].stock;
                result[i].safetyStock = tables[i].safetyStock;
                result[i].sellingprice = tables[i].sellingprice
                result[i].extend = tables[i].extend
            }
            // console.log(result);
            response.send({ status: 0, data: result })
        }
    })
})

goodsRouter.post('/add', (request, response) => {
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
        console.log('添加')
    })
    request.on('end', async () => {
        datas = JSON.parse(datas)
        var goodslist = [];
        goodslist[0] = null;
        goodslist[1] = datas.name;
        goodslist[2] = datas.size;
        goodslist[3] = datas.color;
        goodslist[4] = datas.classify;
        goodslist[5] = datas.company;
        goodslist[6] = datas.stock;
        goodslist[7] = datas.sellingprice;
        goodslist[8] = datas.extend;
        goodslist[9] = datas.safetyStock;
        let sql = 'insert into goodslist(id,name,size,color,classify,company,stock,sellingprice,extend,safetyStock) value(?,?,?,?,?,?,?,?,?,?)'
        let tables;
        tables = await mysql.select(sql, goodslist);
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({ status: 1, msg: '数据添加失败' })
        } else {
            datas.key = tables.insertId;
            response.send({ status: 0, dataAdd: datas, msg: '数据添加成功' })
            
        }

    })
})

goodsRouter.post('/changeData', (request, response) => {
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        datas = JSON.parse(datas)
        console.log('修改商品请求')
        var goodslist = [];
        goodslist[0] = datas.name;
        goodslist[1] = datas.size;
        goodslist[2] = datas.color;
        goodslist[3] = datas.classify;
        goodslist[4] = datas.company;
        goodslist[5] = datas.stock;
        goodslist[6] = datas.sellingprice;
        goodslist[7] = datas.extend;
        goodslist[8] = datas.safetyStock;
        goodslist[9] = datas.key;

        let sql = 'update goodslist set name=?,size=?,color=?,classify=?,company=?,stock=?,sellingprice=?,extend=?,safetyStock=? where id=?'
        let tables;
        tables = await mysql.select(sql, goodslist);
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({ status: 1, msg: '商品信息修改失败' })
        } else {
            response.send({ status: 0, msg: '商品信息修改成功' })
        }
    })
})

goodsRouter.post('/delect',(request,response)=>{
    let datas=''
    request.on('data',(chunk)=>{
        datas+=chunk
    })
    request.on('end',async ()=>{
        datas= datas.replace('undefined','')
        let data = datas*1
        let sql = 'delete from goodslist where id = ?'
        let tables;
        tables = await mysql.select(sql,data);
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({status:1,msg:'删除失败'})
        } else {
            response.send({status:0,msg:'删除成功'})
        }
    })
})

goodsRouter.post('/stock/query',(request,response)=>{
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        let sql = 'select * from goodslist where name=?'
        let tables;
        tables = await mysql.select(sql,datas);
        let result = [];
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({ msg: '数据读取错误', status: 1 })
        } else {
            if (tables.length == 0) {
               return response.send({msg:'没有查找到数据',status:0})
            }
            for (let i = 0; i < tables.length; i++) {
                result[i] = {};
                result[i].key = tables[i].id;
                result[i].name = tables[i].name;
                result[i].size = tables[i].size;
                result[i].color = tables[i].color;
                result[i].classify = tables[i].classify;
                result[i].company = tables[i].company;
                result[i].stock = tables[i].stock;
                result[i].safetyStock = tables[i].safetyStock;
                result[i].sellingprice = tables[i].sellingprice
                result[i].extend = tables[i].extend
            }
            // console.log(result);
            response.send({ status: 0, data: result,msg:'查询成功' })
        }
    })
})

goodsRouter.post('/query', (request, response) => {
    let datas=''
    request.on('data', (chunk) => {
        datas+=chunk
    })
    request.on('end', async () => {
        datas=JSON.parse(datas)
        console.log(datas)
        let str=datas.type
        let value=datas.data
        let sql = 'select * from goodslist where '+str+'=?'
        let tables;
        tables = await mysql.select(sql,[value]);
        let result = [];
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({ msg: '数据读取错误', status: 1 })
        } else {
            if (tables.length == 0) {
               return response.send({msg:'没有查找到数据',status:0})
            }
            for (let i = 0; i < tables.length; i++) {
                result[i] = {};
                result[i].key = tables[i].id;
                result[i].name = tables[i].name;
                result[i].size = tables[i].size;
                result[i].color = tables[i].color;
                result[i].classify = tables[i].classify;
                result[i].company = tables[i].company;
                result[i].stock = tables[i].stock;
                result[i].safetyStock = tables[i].safetyStock;
                result[i].sellingprice = tables[i].sellingprice
                result[i].extend = tables[i].extend
            }
            response.send({ status: 0, data: result,msg:'查询成功' })
        }
    })
})


//数组转为数据库存储数据
goodsArrToDBdata = (arrs) => {
    let result = "";

    for (const arr of arrs) {
        result += arr.name + "," + arr.num + "," + arr.note + ","
    }
    return result;
}
//数据库数据转为数组 
goodsdbDataToArr = (datas) => {
    let result = [{}];
    let arrData = datas.split(',');
    for (let i = 2; i < arrData.length; i += 3) {
        //name:商品名， num：个数
        result[(i - 2) / 3] = {
            key: arrData[i - 2],
            name: arrData[i - 2],
            num: Number(arrData[i - 1]),
            note: arrData[i],
        }
    }
    return result;
}

module.exports = goodsRouter