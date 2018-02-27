/*
 * @Author: Baozi 
 * @Date: 2018-02-13 14:24:33 
 * @Last Modified by: Baozi
 * @Last Modified time: 2018-02-27 02:24:07
 */
var express = require('express');
var Router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
var userSQL = require('../../db/Usersql');
var md5 = require('md5');
var pool = mysql.createPool(dbConfig.mysql);
Router.get('/', function (req, res, next) {
    console.log(req.query.cookie);
    if (req.query.cookie != undefined) {
        pool.getConnection(function (err, connection) {
            var param = req.query || req.param;
            connection.query('SELECT * FROM kanba_user WHERE cookie = ?', [req.query.cookie], function (err, result) {
                if (result != '') {
                    var cookie = md5(param.pass + Date.now())
                    connection.query('SELECT cookie,userid,name,qq,sex,gx,dz FROM kanba_user WHERE cookie = ?', [req.query.cookie], function (err, result2) {
                        connection.query('UPDATE kanba_user set login = ?,cookie = ? WHERE cookie = ?', ['1', cookie, req.query.cookie], function (err, result) {});
                        result1 = {
                            code: 400,
                            msg: '登陆成功',
                            cookie: cookie,
                            user: JSON.stringify(result2)
                        };
                        res.json(result1);
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


    } else {


        pool.getConnection(function (err, connection) {
            var param = req.query || req.param;
            console.log(req.query);
            connection.query(userSQL.login, [param.user, param.pass], function (err, result) {
                console.log(err);
                if (result != '') {
                    var cookie = md5(param.pass + Date.now());
                    connection.query('UPDATE kanba_user set login = ?,cookie = ? WHERE user = ?', ['1', cookie, param.user], function (err, result) {
                        connection.query('SELECT cookie,userid,name,qq,sex,gx,dz FROM kanba_user WHERE user = ?', [param.user], function (err, result) {
                            console.log(result);
                            result = {
                                code: 400,
                                msg: '登陆成功',
                                cookie: cookie,
                                user: JSON.stringify(result)
                            };
                            res.json(result);
                        });

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
    }


});
module.exports = Router;