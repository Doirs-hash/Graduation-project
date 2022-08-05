const mysql = require('mysql')
class DB{
    constructor(){
        this.mysql = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '123456',
            database: 'factoryorder',
            port: '3306'
        })
        this.mysql.connect(function(err){
            if (err) {
                console.log('---------:' + err)
                return
            }
            console.log('连接到数据库SUCCESS')
        })
        let tempSql = this.mysql;
        tempSql.select = async function (sql,datas) {
            let res;
            await new Promise(function (resolve, reject) {
                tempSql.query(
                    sql,
                    datas,    
                    function (err, result) {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(result)
                        }
                    }
                )
            }).then((data) => {
                res = data;
            }).catch((err) => {
                res = err;
            })
            return res;
        }
    }
    static get single(){
        
        return new DB();
    }
}
module.exports = DB;
