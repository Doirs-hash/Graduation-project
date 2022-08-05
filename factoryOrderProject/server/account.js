const express = require('express')
const account = express.Router()
const DB = require('./DB')
const mysql = DB.single.mysql
const tablename = "user"
/**
 *  查看所有信息 
 */
account.get('/look', (request, response) => {
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
                result[i].key=tables[i].id
                result[i].role = tables[i].role;
                result[i].account = tables[i].account;
                result[i].password = tables[i].password;
                result[i].name = tables[i].name;
                result[i].phone = tables[i].phone;
            }
            // console.log(result);
            response.send({ status: 0, msg:"查询成功",data: result })
        }
    })
})

account.post('/add', (request, response) => {
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        datas = JSON.parse(datas)
        console.log('添加用户请求')
        var value = [];
        value[0] = null
        value[1] = datas.role
        value[2] = datas.account
        value[3] = datas.password
        value[4] = datas.name
        value[5] = datas.phone
        let sql = 'insert into '+tablename+'(id,role,account,password,name,phone) value(?,?,?,?,?,?)'
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

account.post('/change', (request, response) => {
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        datas = JSON.parse(datas)
        console.log(datas)
        var value = [];
        value[0] = datas.account
        value[1] = datas.password
        value[2] = datas.name
        value[3] = datas.phone
        value[4] = datas.role
        value[5]=datas.key
        let sql = 'update '+tablename+' set account=?,password=?,name=?,phone=?,role=? where id=? '
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

account.post('/del',(request,response)=>{
    let datas
    request.on('data',(chunk)=>{
        datas+=chunk
    })
    request.on('end',async ()=>{
        datas= datas.replace('undefined','')
        let value = datas*1
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

account.post('/query', (request, response) => {
    let datas
    request.on('data',(chunk)=>{
        datas+=chunk
    })
    request.on('end', async () => {
        datas= datas.replace('undefined','')
        let value = datas
        let sql = 'select * from '+tablename+' where account=?'
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
                result[i].role = tables[i].role;
                result[i].account = tables[i].account;
                result[i].password = tables[i].password;
                result[i].name = tables[i].name;
                result[i].phone = tables[i].phone;
            }
            // console.log(result);
            response.send({ status: 0, msg:"查询成功",data: result })
        }
    })
})
module.exports = account