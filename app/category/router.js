const router = require('express').Router();
const Categorycontroller = require('./controller');
const {police_check} = require('../../midlewares');
router.get('/category', Categorycontroller.index);
router.post('/category',police_check('create', 'Category'),Categorycontroller.store);
router.put('/category/:id',police_check('update', 'Category'),Categorycontroller.update);
router.delete('/category/:id',police_check('delete', 'Category'),Categorycontroller.deleted);

module.exports = router