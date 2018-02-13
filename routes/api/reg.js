/*
 * @Author: Baozi 
 * @Date: 2018-02-13 13:40:05 
 * @Last Modified by: Baozi
 * @Last Modified time: 2018-02-13 14:22:52
 */
var express = require('express');
var Router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
var userSQL = require('../../db/Usersql');
Router.get("/", function (req, res, next) {
    console.log('进入');
    var pool = mysql.createPool(dbConfig.mysql);
    //创建mysql连接池
    pool.getConnection(function (err, connection) {
        var param = req.query || req.param;
       //从get参数里获取注册用户得信息
        connection.query(userSQL.getUserById, [param.user], function (err, result) {
            //查询用户名是否重复，如果重复则返回code 300，否则增加用户
            if (result != '') {
                result = {
                    code: 300,
                    msg: '用户存在'
                };
                connection.release();
                //释放连接池
                res.json(result);
            } else {
                var addSqlParams = [param.user, param.name, param.pass, param.qq, param.ip, param.login, param.sex, param.tuitime, param.gx, param.dz];
                connection.query(userSQL.insert, addSqlParams, function (err, result) {
                    //执行sql语句 插入用户
                    if (err) {
                        result = {
                            code: 100,
                            err: err
                        };
                        connection.release();
                        //释放连接池
                        res.json(result);
                        //如果出错返回错误信息
                    } else {
                        result = {
                            code: 200,
                            msg: '注册成功'
                        };
                        connection.release();
                        //释放连接池
                        res.json(result);
                        //返回注册成功
                    }
                });
            };
        });
    });
});
module.exports = Router;