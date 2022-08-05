const express = require('express')
const customer = express.Router()
const DB = require('./DB')
const mysql = DB.single.mysql
const tablename = "customer"
/**
 *  查看所有信息 
 */
customer.get('/look', (request, response) => {
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
                result[i].name = tables[i].name;
                result[i].phone = tables[i].phone;
                result[i].address = tables[i].address;
            }
            // console.log(result);
            response.send({ status: 0, msg:"查询成功",data: result })
        }
    })
})

customer.post('/add', (request, response) => {
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        datas = datas.replace('undefined', '')
        datas = JSON.parse(datas)
        console.log(datas)
        var value = [];
        value[0] = null
        value[1] = datas.name
        value[2] = datas.phone
        value[3] = datas.address
        let sql = 'insert into '+tablename+'(id,name,phone,address) value(?,?,?,?)'
        let tables;
        tables = await mysql.select(sql, value);
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({ status: 1, msg: '添加失败' })
        } else {
            datas.key = tables.insertId
            response.send({ status: 0, dataAdd: datas, msg: '添加成功' })
        }

    })
})

customer.post('/change', (request, response) => {
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        datas = datas.replace('undefined', '')
        datas = JSON.parse(datas)
        console.log(datas)
        var value = [];
        value[0] = datas.name
        value[1] = datas.phone
        value[2] = datas.address
        value[3] = datas.key
        let sql = 'update '+tablename+' set name=?,phone=?,address=? where id=?'
        let tables;
        tables = await mysql.select(sql, value);
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({ status: 1, msg: '修改失败' })
        } else {
            console.log(tables);
            response.send({ status: 0, msg: '修改成功' })
        }
    })
})

customer.post('/del',(request,response)=>{
    let datas=''
    request.on('data',(chunk)=>{
        datas+=chunk
    })
    request.on('end',async ()=>{
        console.log(datas)
        let value = datas
        let sql = 'delete from '+tablename+' where id = ?'
        let tables;
        tables = await mysql.select(sql,value);
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({status:1,msg:'删除失败'})
        } else {
            console.log(tables);
            response.send({status:0,msg:'删除成功'})
        }
    })
})

customer.post('/query', (request, response) => {
    let datas=''
    request.on('data',(chunk)=>{
        datas+=chunk
    })
    request.on('end', async () => {
        let value = datas
        let sql = 'select * from '+tablename+' where name=?'
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
                result[i].name = tables[i].name;
                result[i].phone = tables[i].phone;
                result[i].address = tables[i].address;
            }
            // console.log(result);
            response.send({ status: 0, msg:"查询成功",data: result })
        }
    })
})

module.exports = customer