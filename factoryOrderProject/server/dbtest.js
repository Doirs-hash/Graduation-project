const DB = require("./DB")
const mysql = DB.single.mysql;
let datas = {
    id: null,
    xdtime: '2012-12-31 11:30:45',
    customer: "1",
    price: 100,
    deliver: "1",
    people: "1",
    cm: "1",
    orderStates: "1",
    jhtime: '2012-12-31 11:30:45',
    goodslist: [
        {
            name: "商品4",
            count: 10
        },
        {
            name: "商品5",
            count: 20
        }
    ]
}

//数组转为数据库存储数据
arrToDBdata=(arrs) =>{
    let result = "";

    for (const arr of arrs) {
        result += arr.name + "," + arr.count + ",";
    }
    return result;
}
//数据库数据转为数组 
dbDataToArr=(datas)=> {
    let result = [{}];
    let arrData = datas.split(',');
    for (let i = 1; i < arrData.length; i += 2) {
        //name:商品名， count：个数
        result[(i - 1) / 2] = {
            name: arrData[i - 1],
            count: Number(arrData[i])
        }
    }
    return result;
}

//查询
async function select() {
    let id = datas.id
    let sql = 'select * from orderlist';
    let tables;
    tables = await mysql.select(sql,id);
    let result = [];
    if (tables.errno != undefined) {
        console.log(tables.errno, tables.sql);
    } else {
        if (tables.length == 0) {
            console.log("查询结果为空");
        }
        for (let i = 0; i < tables.length; i++) {
            result[i] = {};
            result[i].id = tables[i].id;
            result[i].xdtime = tables[i].xdtime;
            result[i].customer = tables[i].customer;
            result[i].price = tables[i].price;
            result[i].deliver = tables[i].deliver;
            result[i].people = tables[i].people;
            result[i].cm = tables[i].cm;
            result[i].orderStates = tables[i].orderStates;
            result[i].jhtime = tables[i].jhtime;
            result[i].goodslist = dbDataToArr(tables[i].goodslist);
        }
        console.log(result);
    }
}
 select();
 //删除
async function del() {
    let data = 1
    let sql = 'delete from orderlist where id = ?'
    let tables;
    tables = await mysql.select(sql,data);
    if (tables.errno != undefined) {
        console.log(tables.errno, tables.sql);
    } else {
        console.log(tables);
    }
}
//del()

async function insert() {
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
    orderlist[9] = arrToDBdata(datas.goodslist);
    let sql = 'insert into orderlist(id,xdtime,customer,price,deliver,people,cm,orderStates,jhtime,goodslist) value(?,?,?,?,?,?,?,?,?,?)'
    let tables;
    tables = await mysql.select(sql, orderlist);
    if (tables.errno != undefined) {
        console.log(tables.errno, tables.sql);
    } else {
        datas.id = tables.insertId;
        console.log(datas);
    }

}
//insert();

async function updata() {
    var orderlist = [];
    orderlist[0] = datas.xdtime;
    orderlist[1] = datas.customer;
    orderlist[2] = datas.price;
    orderlist[3] = datas.deliver;
    orderlist[4] = datas.people;
    orderlist[5] = datas.cm;
    orderlist[6] = datas.orderStates;
    orderlist[7] = datas.jhtime;
    orderlist[8] = arrToDBdata(datas.goodslist);
    orderlist[9] = datas.id;
    let sql = 'update orderlist set xdtime=?,customer=?,price=?,deliver=?,people=?,cm=?,orderStates=?,jhtime=?,goodslist=? where id=?'
    let tables;
    tables = await mysql.select(sql,orderlist);
    if (tables.errno != undefined) {
        console.log(tables.errno, tables.sql);
    } else {
        console.log(tables);
    }
}
//updata()
//mysql.end();

