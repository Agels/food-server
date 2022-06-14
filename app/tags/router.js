const router = require('express').Router();
const { police_check } = require('../../midlewares');
const TagsController = require('./controller');

router.get('/tags', TagsController.index);
router.post('/tags', police_check('create','Tags'), TagsController.store);
router.put('/tags/:id',police_check('update','Tags'), TagsController.update);
router.delete('/tags/:id',police_check('delete','Tags'), TagsController.deleted);

module.exports = router