const {subject} = require('@casl/ability');
const Invoice = require('./model');
const {policyfor} = require('../../utils');

const show = async(req, res, next) => {
    try {
        let {order_id} = req.params;
        let invoice = await Invoice.findOne({order:order_id})
        .populate('order')
        .populate('user');

        let policy = policyfor(req.user);
        let subjectInvoice = subject('Invoice', {...invoice,user_id:invoice.user._id});
        if(!policy.can('read', subjectInvoice)){
            return res.json({
                error:1,
                message:'you are not allowed to see invoice'
            });
        }

        return res.json({
            status:'success',
            data:invoice
        })
    }catch(err){
        return res.json({
            error:1,
            message:'error when getting invoice',
            fields:err.errors
        })
    }
}

module.exports = {
    show
}