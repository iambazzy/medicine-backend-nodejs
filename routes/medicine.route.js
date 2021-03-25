const express = require('express');
const router = express.Router();
const MedicineController = require('../controllers/medicine.controller');
const { verifyAdmin } = require('../middleware/admin.middleware.js');

router.post('/add-medicine', verifyAdmin, MedicineController.addMedicine);
router.get('/get-medicine', MedicineController.getMedicine);
router.put('/update-medicine', verifyAdmin, MedicineController.updateMedicine);
router.delete('/delete-medicine', verifyAdmin, MedicineController.deleteMedicine);

module.exports = router;
