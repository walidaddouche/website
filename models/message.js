let users = [];
let messages = [];

// user
function add_user(name, password) {
    if(!name || !password) return -1;
    for(user of users) {
        if(user.name == name) return -1;
    }
    let new_user = {id: 1 + users.length, name: name, password: password};
    users.push(new_user);
    return new_user.id;
}

function get_user_name(id) {
    for(user of users) {
        if (user.id == id) return user.name;
    }
    return null;
}

function login(name, password) {
    for(user of users) {
        if (user.name == name && user.password == password) return user.id;
    }
    return -1;
}

// messages
function add_message(author, text) {
    if(get_user_name(author) !== null) {
        messages.push({
            id: messages.length,
            text: text,
            date: new Date().toString(),
            author: author
        });
    }
}

function list_messages() {
    let result = [];
    for(message of messages) {
        result.push({
            text: message.text,
            date: message.date,
            author: get_user_name(message.author),
        });
    }
    return result.slice(-10);
}

module.exports = {
    add_user: add_user,
    login: login,
    add_message: add_message,
    list_messages: list_messages,
};
