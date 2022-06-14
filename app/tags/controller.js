// const config = require('../config');
const Tags = require('./model');


const index = async (req, res, next) => {
    try{
     let tag = await Tags.find();
     return res.json({
        status:'success',
        data:tag
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
        let tag = new Tags(payload);
        await tag.save();
        return res.json({
            status:'data has been added',
            data:tag
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
        const tag = await Tags.findByIdAndUpdate(id, payload, {new:true, runValidators:true});
        return res.json({
            status:'data has been updated',
            data:tag
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
    const tag = await Tags.findByIdAndDelete((id))
    return res.json({
        status:'data has been deleted',
        data:tag
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
