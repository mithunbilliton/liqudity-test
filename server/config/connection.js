var mongoose = require('mongoose');


var URL = process.env.URL || 'mongodb://localhost/CRUD_DB';
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true
});
var db = mongoose.connection;
db.on('error', () => {
    console.error('Error occured in db connection');
});

db.on('open', () => {
    console.log('DB Connection established succesfully');
});