const router = require('express').Router();
const {police_check} = require('../../midlewares');
const deliveryAdressController = require('./controller');

router.get('/deliveryAddress',police_check('view', 'DeliveryAddress'),deliveryAdressController.index);
router.post('/deliveryAddress',police_check('create', 'DeliveryAddress'),deliveryAdressController.store);
router.put('/deliveryAddress/:id',police_check('update', 'DeliveryAddress'),deliveryAdressController.update);
router.delete('/deliveryAddress/:id',police_check('delete', 'DeliveryAddress'),deliveryAdressController.deleted);

module.exports = router