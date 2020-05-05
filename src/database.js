const mongoose = require('mongoose');
const { database } = require('./keys');

mongoose.connect(database.URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(db => console.log('Database is connected')).catch(err => console.log(err));
