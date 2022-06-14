const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');

let userSchema = Schema({
    full_name: {
        type:String,
        required:[true, 'Name cannot be null'],
        maxlength:[255, 'max length 255'],
        minlength:[3, 'min length 3'],

    },
    customer_id: {
        type:Number
    },
    email: {
        type:String,
        required:[true, 'email cannot be null'],
        maxlength:[255,'max length 255'],
    },
    password : {
        type:String,
        required:[true,'password cannot be null'],
        maxlength:[255, 'max length 255']
    },
    role:{
        type:String,
        enum:[true, 'user', 'admin'],
        default:'user'
    },
    token:[String]
}, {timestamps:true} 
)

// validation email

userSchema.path('email').validate(function(value){
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
}, attr => `${attr.value} email must be valid`)

userSchema.path('email').validate(async function(value) {
    try {
            // 1. lakukan pencarian _collection_User berdasarkan 'email'

        const count = await this.model('User').count({email : value});

             // 2. kode ini mengindikasikan bahwa jika user ditemukan akan mengemblikan 'false' jika ditemukan mengembalikan 'true'
            //jika 'false' maka kode gagal 
           //jika 'true m' maka kode berhasil
        return !count; 
    } catch(err) {
        throw err
    }
}, attr => `${attr.value} email already exist`);

// hasing password

const HASH_ROUND = 10;
userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND);
    next()
})

userSchema.plugin(AutoIncrement, {inc_field:'customer_id'});
module.exports = model('User', userSchema);