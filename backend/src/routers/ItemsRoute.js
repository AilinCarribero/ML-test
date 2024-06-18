const express = require('express');
const router = express.Router();

const { listenItems, detalleItem, paginacionItems } = require('../controllers/ItemsController');

router.get('/paginacion', paginacionItems);
router.get('/:id', detalleItem);
router.get('/', listenItems);

module.exports = router;