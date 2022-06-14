const {model, Schema} = require('mongoose');

const orderItemSchema = Schema ({
    name: {
        type:String,
        minlength:[5, 'min length 5'],
        required:[true, 'cannot be null']
    },

    price : {
        type:Number,
        required : [true, 'price cannot be null']
    },

    qty : {
        type:Number,
        minlength:[1,'min length 1'],
        required:[true, 'qty cannot be null']
    },
    order : {
        type:Schema.Types.ObjectId,
        ref:'Order'
    },
    product : {
        type:Schema.Types.ObjectId,
        ref:'Product'
    }
});

module.exports = model('OrderItem', orderItemSchema);