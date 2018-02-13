/*
 * @Author: Baozi 
 * @Date: 2018-02-13 14:24:33 
 * @Last Modified by: Baozi
 * @Last Modified time: 2018-02-13 15:01:53
 */
var express = require('express');
var Router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
var userSQL = require('../../db/Usersql');
Router.get('/', function (req, res, next) {

    var pool = mysql.createPool(dbConfig.mysql);

    pool.getConnection(function (err, connection) {
        var param = req.query || req.param;
        console.log(req.query);
        connection.query(userSQL.login, [param.user, param.pass], function (err, result) {
            console.log(err);
            if (result != '') {
                connection.query('UPDATE kanba_user set login = ? WHERE user = ?', ['1', param.user], function (err, result) {
                    console.log(err);
                    if (err) {
                        res.send('111');
                        return;
                    } else {
                        result = {
                            code: 400,
                            msg: '登陆成功'
                        };
                        res.json(result);
                    }
                });

            } else {
                result = {
                    code: 500,
                    msg: '用户名或密码错误'
                };
                res.json(result);
            }
        });
    });
});
module.exports = Router;