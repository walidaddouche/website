const SQL = require('better-sqlite3')

const User = new SQL("../DATABASE.sqlite")

//User.prepare("CREATE TABLE  USERS (id integer PRIMARY KEY  AUTOINCREMENT  ,username TEXT unique , email TEXT unique CHECK ( email like '%_@__%.__%'), password  TEXT , phone CHECK ( phone LIKE '[0-9][0-9][0-9] [0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'  )  , type integer not null check ( USERS.type == 0 or USERS.type == 1 ))").run()
// type 0 mean Particulier account
// type 1 mean Profesionnel account


function addUser(email, username, password, type) {
    User.prepare("INSERT INTO USERS (email,username,password,type)VALUES (?,?,?,?)").run([email, username, password,type])
    console.log("done")
}

module.exports = {
    User, addUser
}
//console.log(User.prepare("SELECT  * from USERS  ").get())