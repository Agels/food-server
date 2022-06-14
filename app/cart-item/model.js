const mongoose = require('mongoose');
const {model, Schema} = mongoose;

const cartItemSchema = Schema ({
    name: {
        type:String,
        minlength:[5, 'max length 5'],
        required:[true, 'name must be full filled']
    }, 

    qty : {
        type:Number,
        minlength :[1, 'min qty 1'],
        required:[true, 'qty cannot be null']
    },

    price : {
        type: Number,
        default: 0
    }, 

    image_url:String,

    user : {
        type:Schema.Types.ObjectId,
        ref:'User'
    }, 

    product : { 
        type:Schema.Types.ObjectId,
        ref:'Product'
    }
})

module.exports = model('CartItem',cartItemSchema );