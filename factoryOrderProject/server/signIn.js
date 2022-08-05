const express = require('express')
const user = express.Router()
const DB = require('./DB')
const mysql = DB.single.mysql
const tablename = "user"

user.post('/signin', (request, response) => {
    let datas = ''
    request.on('data', (chunk) => {
        datas += chunk
    })
    request.on('end', async () => {
        datas = JSON.parse(datas)
        console.log('登录请求')
        let value = []
        value[0] = datas.data.role
        value[1] = datas.data.username
        value[2] = datas.data.password
        let sql = 'select * from ' + tablename + ' where role=? and account=? and password=?'
        let tables
        tables = await mysql.select(sql, value);
        let result = []
        if (tables.errno != undefined) {
            console.log(tables.errno, tables.sql);
            response.send({ msg: '服务器错误', status: 1 })
        } else {
            if (tables.length == 0) {
                return response.send({ status: 1, msg: "账号或密码错误" })
            }
            for (let i = 0; i < tables.length; i++) {
                result[i] = {};
                result[i].key = tables[i].id;
                result[i].role = tables[i].role;
                result[i].account = tables[i].account;
                result[i].password = tables[i].password;
                result[i].name = tables[i].name;
            }
            response.send({ status: 0, msg: "登录成功", data: result })
        }
    })
})

module.exports = user