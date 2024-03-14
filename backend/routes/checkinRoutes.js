const express = require('express');
const router = express.Router();
const CheckinController = require('../controllers/checkinController');

// Routes for check-ins
router.get('/', CheckinController.getAllCheckins);
router.get('/:id', CheckinController.getCheckinById);
router.post('/', CheckinController.createCheckin);
router.put('/:id', CheckinController.updateCheckin);
router.delete('/:id', CheckinController.deleteCheckin);

module.exports = router;
