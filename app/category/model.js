const mongoose = require('mongoose');
const {model, Schema} = mongoose;

const CategorySchema = Schema({
    name : {
        type:String,
        minlength:[2, 'name character must be more than 2'],
        maxlength:[20, 'maximum character length 100'],
        required:[true, 'fields cannot be null']
    }
})

module.exports = model('Category',CategorySchema);