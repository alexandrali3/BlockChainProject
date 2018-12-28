var Database = require('./routes/database')
var sleep = require('system-sleep')
var database = new Database()

var nonce = database.getNonce()

console.log('nonce:' + nonce)

global.nonce = --nonce;

global.getNextNonce = function () {
    global.nonce++;
    return '0x' + global.nonce.toString(16);
}

var id = Math.random().toString(36).substr(2);
var name = Math.random().toString(36).substr(2);
console.log('id:' + id);
console.log('name:' + name);

var hash = database.addNote(id, name, "Content!!");

console.log('hash:' + hash);

var status = null;

while((status = database.queryTransactionStatus(hash)) == null) {
    sleep(10);
}

if (status == 1) {
    console.log('Successfully added!');
    console.log('Content: ' + database.getNote(id, name));
    var content = Math.random().toString(36).substr(2);
    console.log('Content: ' + content);

    hash = database.updateNote(id, name, content);

    console.log('hash: ', hash)

    while ((status = database.queryTransactionStatus(hash)) == null) {
        sleep(10);
    }

    if (status == 1) {
        console.log('Updated successfully!');
        console.log('Content: ' + database.getNote(id, name));
    } else if (status == 0) {
        console.log('Updated failed!');
    }
} else if (status == 0) {
    console.log('Added failed!');
}
