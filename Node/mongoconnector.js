const mongoose = require('mongoose');
const dburl = 'mongodb://localhost:27017/lcl_local';

mongoose.connect(dburl, {useNewUrlParser: true});