const SQL = require('better-sqlite3')

const User = new SQL("./models/DATABASE.sqlite")

//User.prepare("CREATE TABLE  USERS (id integer PRIMARY KEY  AUTOINCREMENT  ,username TEXT unique , email TEXT unique CHECK ( email like '%_@__%.__%'), password  TEXT , phone CHECK ( phone LIKE '[0-9][0-9][0-9] [0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'  )  , type integer not null check ( USERS.type == 0 or USERS.type == 1 ))").run()
// type 0 mean Particulier account
// type 1 mean Profesionnel account
User.prepare('CREATE TABLE IF NOT EXISTS messages (message_content text, date_ DATE, author text)').run();


function addUser(email, username, password, type) {
    User.prepare("INSERT INTO USERS (email,username,password,type)VALUES (?,?,?,?)").run([email, username, password,type])
}
// messages
function add_message(author, text) {
    let insert = db.prepare('INSERT INTO messages VALUES (?, ?, ?)');
    insert.run([text, new Date().toString(), author]);
}

function list_messages() {
    let select = User.prepare('SELECT message_content, date_ , author  FROM messages')
    let result = select.all();
    return result.reverse();
}
module.exports = {
    User, addUser,
    add_message: add_message,
    list_messages: list_messages,
}
console.log(list_messages())