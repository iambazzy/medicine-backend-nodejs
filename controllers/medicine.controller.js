const MedicineService = require('../services/medcine.service');

// ADD MEDICINE
exports.addMedicine = async (req, res, next) => {
  const { name, composition, mrp, bestPrice, description, quantity, company, prescription} = req.body;

  if (name === undefined || composition === undefined || mrp === undefined || 
      bestPrice === undefined || description === undefined || quantity === undefined || 
      company === undefined || prescription === undefined) {
    return res.status(422).json({ code: 422, message : 'Missing Required Parameters' });
  }

  if (name === '' || composition === '' || mrp === '' ||
      bestPrice === '' || description === '' || quantity === '' || 
      company === '' || prescription === '') {
    return res.status(422).json({ code: 422, message : 'Invalid Parameter Values' });
  }

  MedicineService.addMedicine(req.body)
  .then((resp) => {
    res.status(resp.code).json(resp);
    next();
  });
}

// GET MEDICINES
exports.getMedicine = async (req, res, next) => {
  MedicineService.getMedicines(req.body)
  .then((resp) => {
    res.status(resp.code).json(resp);
    next();
  });
}

// UPDATE MEDICINES
exports.updateMedicine = async (req, res, next) => {
  const { medicineId } = req.query;

  if (medicineId === undefined || medicineId === '' || Object.keys(req.body).length === 0) {
    return res.status(422).json({ code: 422, message : 'Missing Required Parameters' });
  }

  MedicineService.updateMedicineById(medicineId, req.body)
  .then((resp) => {
    res.status(resp.code).json(resp);
    next();
  });
}

// DELETE MEDICINES
exports.deleteMedicine = async (req, res, next) => {
  const { medicineId } = req.query;

  if (medicineId === undefined || medicineId === '' ) {
    return res.status(422).json({ code: 422, message : 'Missing Required Parameters' });
  }

  MedicineService.deleteMedicineById(medicineId)
  .then((resp) => {
    res.status(resp.code).json(resp);
    next();
  });
}