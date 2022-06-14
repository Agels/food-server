const DeliveryAddress = require('./model');
const {subject} = require('@casl/ability');
const {policyfor} = require('../../utils');

const store = async(req, res, next) => {
    try {
        let payload = req.body;
        console.log(payload)
        let user = req.user;
        let address = new DeliveryAddress({...payload, user:user._id});
        await address.save();
        res.json({
            status:'data has been added',
            data:address
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

const index = async(req, res, next) => {
    try {
        let {skip =0, limit=10} = req.query;
        let count = await DeliveryAddress.find({user: req.user._id}).countDocuments();
        let deliveryAddress = await DeliveryAddress.find({user: req.user._id})
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .sort('-createdAt')
        .populate('user');
        return res.json({
            status:'success',
            data:deliveryAddress,
            count
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

const update = async(req, res, next) => {
    try{
        let {_id, ...payload} = req.body;
        let id = req.params.id;
        let address = await DeliveryAddress.findById(id);
        let subjectAddress = subject('DeliveryAddress', {...address, user_id:address.user});
        let policy = policyfor(req.user);

        if(!policy.can('update', subjectAddress)){
            return res.json({
                error:1,
                message:'Your are not allowed to modify'
            })
        }

        address = await DeliveryAddress.findByIdAndUpdate(id, payload, {new:true})
        return res.json({
            status:'data has been updated',
            data:address
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

const deleted = async(req, res, next)=> {
    try {
        let id = req.params.id;
        let address = await DeliveryAddress.findById(id);
        let subjectAddress= subject('DeliveryAddress', {...address, user_id: address.user});
        let policy = policefor(req.user);

        if(!policy.can('delete', subjectAddress)){
            return res.json({
                error:1,
                message:'You are not allowed to delete'
            })
        }
         address = await DeliveryAddress.findByIdAndDelete((id));
        return res.json({
            status:'data has been deleted',
            data:address
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

module.exports = {
    store,
    index,
    update,
    deleted
}