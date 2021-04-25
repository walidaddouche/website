const SQL = require('better-sqlite3')

const User = new SQL("/home/walid/Bureau/log/models/DATABASE.sqlite")

//User.prepare("CREATE TABLE  USERS (id integer PRIMARY KEY  AUTOINCREMENT  ,username TEXT unique , email TEXT unique CHECK ( email like '%_@__%.__%'), password  TEXT , phone CHECK ( phone LIKE '[0-9][0-9][0-9] [0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]' ))").run()
function addUser(email, username, password) {
    User.prepare("INSERT INTO USERS (email,username,password)VALUES (?,?,?)").run([email, username, password])
    console.log("done")
}

module.exports = {
    User, addUser
}
console.log(User.prepare("SELECT  password,username,email from USERS where email like ? ").get("walidwalid@gmail.com"))