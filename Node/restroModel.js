const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const RestroSchema = new Schema({
    restaurant_name: {
        type: String,
        required: true
    },
    restro_description:{
        type: String,
        required: true
    },
    restro_category:{
        type: String
    },
    restro_timing:{
        type: String
    }
})

const RestroModel = mongoose.Model('restaurants', RestroSchema);
module.exports = RestroModel;

