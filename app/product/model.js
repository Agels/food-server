const mongoose = require('mongoose');
const {model, Schema} = mongoose;

const productSchema = Schema({

    name: {
        type:String,
        minlength:[3, 'character length must be more than 3'],
        required:[true, 'name cannot be null']
    },
    description : {
        type:String,
        maxlength:[100,'maximum character length 100']
    },
    price: {
        type:Number,
        default:0
    },
    image_url:String,
    category: {
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    tags: {
        type:Schema.Types.ObjectId,
        ref:'Tags'
    }
},
{
    timestamp:true
})

module.exports = model('Product',productSchema);