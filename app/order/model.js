const mongoose = require('mongoose');
const {model, Schema} = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Invoice = require('../invoice/model');

const orderSchema = Schema({
    status :{
        type:String,
        enum:['waiting_payment','proccessing','in_delivery','delivered'],
        default:'waiting_payment'
    }, 
    deiivery_fee : {
        type:Number,
        default:20000
    },

    delivery_address : {
        provinsi: {type: String, required: [true, 'provinsi cannot be null']},
        kabupaten : {type :String, required:[true,'kabupaten cannot be null']},
        kecamatan :{type :String, required:[true, 'kecamatan cannot be null']},
        kelurahan : {type:String, required:[true, 'kelurahan cannot be null']},
        detail :{type:String}
    },

    user: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    order_items : [{type :Schema.Types.ObjectId, ref:'OrderItem'}]

}, {timestamps: true});

orderSchema.plugin(AutoIncrement, {inc_field :'order_number'});
orderSchema.virtual('items_count').get(function(){
    return this.order_items.reduce((total, item) => total + parseInt(item.qty), 0);
});

orderSchema.post('save', async function(){
    let sub_total = this.order_items.reduce((total, item) => total += (item.price * item.qty), 0);
    let invoice = new Invoice({
        user : this.user,
        order: this._id,
        sub_total:sub_total,
        delivery_fee : this.deiivery_fee,
        total: parseInt(sub_total + this.deiivery_fee),
        delivery_address : this.delivery_address
    });

    await invoice.save();
})

module.exports = model('Order', orderSchema);