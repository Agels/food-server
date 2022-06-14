const mongoose = require('mongoose');
const {model, Schema} = mongoose;

const invoiceSchema = Schema({
    sub_total : {
        type:Number,
        required:[true,'sub_total cannot be null']
    },

    delivery_fee:{
        type:Number,
        default:0
    },

    delivery_address: {
        provinsi :{type:String, required:[true, 'provinsi cannot be null']},
        kabupaten : {type:String, required:[true, 'Kabupaten cannot be null']},
        kecamatan:{type:String, required:[true, 'kecamatan cannot be null']},
        kelurahan:{type:String, required:[true, 'kelurahan cannot be null']},
        detail:{type:String}
    },
    total : {
        type:Number,
        required:[true, 'total cannot be null']
    },

    payment_status : {
        type:String,
        enum:['waiting_payment', 'paid'],
        default:'waiting_payment'
    },

    user : {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    order : {
        type:Schema.Types.ObjectId,
        ref:'Order'
    }
}, {timestamps : true})

module.exports = model('Invoice', invoiceSchema);