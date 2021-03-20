const Address = require('../models/address.model');
const User = require('../models/user.model');
const { getUserIdFromToken, extractToken } = require('../Helpers/helpers');

// ADD ADDRESS
exports.addAddress = async (addressData, headers) => {
  try {
    const token = extractToken(headers['authorization']);
    const userId = getUserIdFromToken(token);
    
    const user = await User.findById(userId);

    if(!user) {
      return { code: 400, message: 'No User Found' };
    }

    // Saving user Address
    const address = await Address.create(addressData);

    if (!user.addresses.includes(address._id)) {
      // Check if user has 5 or less than 5 addresses
      if (user.addresses.length < 5) {
        const updatedUser = await User.updateOne(
          { _id: userId }, 
          { $push: { addresses: address._id } }
        );
        return { code: 200, message: 'Address Saved Successfully' };
      } else {
        return { code: 400, message: 'You can only have upto 5 addresses' };
      }
    } else {
      return { code: 400, message: 'Address Id Exists' };
    }

  } catch (e) {
    throw Error(e);  
  }
}

// GET ADDRESS
exports.getUserAddresses = async (userId) => {
  try {
    const user = await User.findById(userId);
    
    if (!user) {
      return { code: 404, message: 'No user found' };
    }

    const userAddressIds = user.addresses;    
    const records = await Address.find().where('_id').in(userAddressIds).exec();
    
    return {
      code: 200,
      message: 'Success',
      data: records
    };
  } catch(e) {
    throw Error(e);
  }
}

// UPDATE ADDRESS
exports.updateUserAddress = async (addressId, addressData) => {
  try {
    const address = await Address.exists({ _id: addressId });

     // If address does not exist
     if (address === false) {
      return {
        code: 404,
        message: 'No address exists'
      }
    }

    const updatedAddress = await Address.findOneAndUpdate({ _id: addressId }, addressData, { new: true });
    return {
      code: 200,
      message: 'Address Updated Successfully',
      data: updatedAddress
    }
  } catch (e) {
    throw Error(e);
  }
}

// DELETE ADDRESS
exports.deleteAddress = async (addressId, userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return {
        code: 404,
        message: 'No user found'
      }
    }

    // Update user adresses array (delete address id)
    const toDelete = user.addresses.indexOf(addressId);

    // If address not found
    if (toDelete === -1 || toDelete === null || toDelete === undefined) {
      return {
        code: 404,
        message: 'Address Not Found'
      }
    }

    user.addresses.splice(toDelete, 1);
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, { "$set": { "addresses": user.addresses } });

    // Delete Address in address collection
    const deletedAddress = await Address.findOneAndDelete({ _id: addressId });
    if (updatedUser && updatedUser._id && deletedAddress && deletedAddress._id) { 
      return {
        code: 200,
        message: 'Deleted Address Successfully'
      }
    }
  } catch (e) {
    throw Error(e);
  }
}