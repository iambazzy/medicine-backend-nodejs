const express = require('express');
const router = express.Router();
const MedicineController = require('../controllers/medicine.controller');

router.post('/add-medicine', MedicineController.addMedicine);
router.get('/get-medicine', MedicineController.getMedicine);
router.put('/update-medicine', MedicineController.updateMedicine);
router.delete('/delete-medicine', MedicineController.deleteMedicine);

module.exports = router;
