const mysql = require('mysql');
var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'bbs'
});
let allServices = {
    query: function (sql, values) {

        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {

                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })

    },
   findUserData: function (name) {
        let _sql = `select * from user where username="${name}";`
        return allServices.query(_sql)
    },
    addUserData: (obj) => {
         let _sql = "insert into goods set goods_id=?,goods_name=?,goods_price=?,goods_url=?,goods_detailurl=?,goods_points=?;"
         return allServices.query(_sql, obj)
     },
}

module.exports = allServices;