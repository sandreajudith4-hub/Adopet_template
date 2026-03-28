var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'adev',
    database: 'ani_adopt'
})

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to DB');

    /*
    line 12 and 13 can be replaced with the following if/else code block. they do the same thing.
    if (err) {
        throw err;
    } else {
        console.log('Connected to DB')
    }
    */
})

module.exports = connection;