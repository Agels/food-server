// const config = require('../config');
const Category = require('./model');


const index = async (req, res, next) => {
    try{
     let category = await Category.find();
     return res.json({
        status:'success',
        data:category
    })
    } catch(err){
        if(err && err.name == 'ValidationError'){
            return res.json({
                error:true,
                message:err.message,
                fields:err.errors
            })
        }
        next(err)
    }
}

const store = async (req, res, next) => {
    const payload = req.body;
    try {
        let category = new Category(payload);
        await category.save();
        return res.json({
            status:'data has been added',
            data:category
        })
    } catch(err){
        if(err && err.name == 'ValidationError'){
            return res.json({
                error:true,
                message:err.message,
                fields:err.errors
            })
        }
        next(err)
    }
}

const update = async (req, res, next) => {
    const id = req.params.id
    const payload = req.body;
    try {
        const category = await Category.findByIdAndUpdate(id, payload, {new:true, runValidators:true});
        return res.json({
            status:'data has been updated',
            data:category
        })
    } catch(err){
        if(err && err.name == 'ValidationError'){
            return res.json({
                error:true,
                message:err.message,
                fields:err.errors
            })
        }
        next(err)
    }
}


const deleted = async(req, res) => {
    const id = req.params.id
    try{
    const category = await Category.findByIdAndDelete((id))
    return res.json({
        status:'data has been deleted',
        data:category
    })
    }catch(err){
        if(err && err.name == 'ValidationError'){
            return res.json({
                error:true,
                message:err.message,
                fields:err.errors
            })
        }
        next(err)
    }
}


module.exports = {
    index,
    store,
    update,
    deleted
}
