const Medicine = require('../models/medicine.model'); 

exports.addMedicine = async (medicineData) => {
  try {
    const name = medicineData.name.toLowerCase().trim();
    const medicine = await Medicine.exists({ name });

    // IF EXISTS
    if (medicine) {
      return {
        code: 409,
        message: 'This Medicine Exists'
      }
    }

    // IF NOT EXISTS
    const dataToSave = {
      ...medicineData,
      name: medicineData.name.toLowerCase().trim()
    }
    const data = await Medicine.create(dataToSave);
    return {
      data,
      code: 200,
      message: 'Medicine Added Successfully'
    } 
  } catch(e) {
    throw Error(e);
  }
}

exports.getMedicines = async () => {
  // Fetch all medicines
  try {
    const medicines = await Medicine.find({});
    return {
      code: 200,
      message: 'Success',
      data: medicines
    }
  } catch (e) {
    throw Error(e);
  }
}

exports.getMedicineById = async (medicineId) => {
  try {
    const medicine = await Medicine.findOne({ _id: medicineId });

    // If medicine exists
    if (medicine) {
      return {
        code: 200,
        message: 'Success',
        data: medicine
      }
    }

    // IF does not exist
    return {
      code: 404,
      message: 'Could not find the requested medicine',
    }
  } catch (e) {
    throw Error(e);
  }
}

exports.updateMedicineById = async (medicineId, data) => {
  try {
    const medicine = await Medicine.exists({ _id: medicineId });

    // If medicine does not exist
    if (medicine === false) {
      return {
        code: 404,
        message: 'No medicine exists with this id'
      }
    }

    // If exists
    const updatedMedicine = await Medicine.findOneAndUpdate({ _id: medicineId }, data, { new: true });
    return {
      code: 200,
      message: 'Medicine Updated Successfully',
      data: updatedMedicine
    }
  } catch (e) {
    throw Error('[medicine.service]', e);
  }
}

exports.deleteMedicineById = async (medicineId) => {
  try {
    const medicine = await Medicine.exists({ _id: medicineId });

     // If medicine does not exist
     if (medicine === false) {
      return {
        code: 404,
        message: 'No medicine exists with this id'
      }
    }

    const deletedMedicine = await Medicine.findOneAndDelete({ _id: medicineId });

    if (deletedMedicine) {
      return {
        code: 200,
        message: 'Deleted Medicine Successfully',
        deletedMedicine
      }
    }

  } catch (e) {
    throw Error('[med service]', e);
  }
}