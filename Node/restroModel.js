const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const RestroSchema = new Schema({
    brand_id:{
        type: String
    },
    website:{
        type: String
    },
    name: {
        type: String,
    },
    type:{
        type: Number
    },
    item_count:{
        type: Number
    },
    updated_at:{
        type: Date
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String
    },
    timing:{
        type: String
    }
})

const RestroModel = mongoose.model('restaurants', RestroSchema);
module.exports = RestroModel;

