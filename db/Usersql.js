var UserSQL = {  
    insert:'INSERT INTO kanba_user(userid,user,name,pass,qq,ip,login,sex,tuitime,gx,dz) VALUES(0,?,?,?,?,?,?,?,?,?,?)', 
    queryAll:'SELECT * FROM student',  
    getUserById:'SELECT * FROM kanba_user WHERE user = ?',
    login:'SELECT * FROM kanba_user WHERE user = ? and pass = ?',
  };
module.exports = UserSQL;
