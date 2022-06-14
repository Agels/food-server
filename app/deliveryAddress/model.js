const {Schema, model}  = require('mongoose');

const deliveryAddressSchema = Schema({
    name : {
        type:String,
        maxlength:[255, 'max length 255'],
        required:[true, 'adress cannot be null']
    },

    kelurahan : {
        type:String,
        maxlength:[255, 'max length 255'],
        required:[true, 'kelurahan cannot be null']
    },
    kecamatan : {
        type:String,
        maxlength:[255, 'max length 255'],
        required:[true, 'kecamatan cannot be null'],
    }, 
    kabupaten : {
        type:String,
        maxlength:[255, 'max length 255'],
        required:[true, 'kabupaten cannot be null']
    },
    provinsi : {
        type:String,
        maxlength:[255, 'max length 255'],
        required:[true, 'provinsi cannot be null']
    },
    detail : {
        type:String,
        maxlength:[255, 'max length 255'],
        required:[true, 'detail cannot be null']
    },

    user: {
        type: Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps: true})

module.exports = model('DeliveryAddress', deliveryAddressSchema);
