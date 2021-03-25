const Address = require('../models/address.model');
const User = require('../models/user.model');
const { getUserIdFromToken, extractToken } = require('../Helpers/helpers');

// ADD ADDRESS
exports.addAddress = async (addressData, headers) => {
  try {
    const token = extractToken(headers['authorization']);
    const userId = getUserIdFromToken(token);
    
    const user = await User.findById(userId, { addresses: 1 });

    if(!user) {
      return { code: 400, message: 'No User Found' };
    }

    // User already has some addresses
    if (user.addresses !== null) {
      const userAddresses = await Address.findOne({ _id: user.addresses });

      // If Addresses are less than 5 then save
      if (userAddresses.addresses.length < 5) {
        const updatedAddress = await Address.updateOne(
          { _id: user.addresses },
          { $push: { addresses: addressData } }
        );

        // Push into array and save.
        if (updatedAddress) {
          return { code: 200, message: 'Address Was Saved Successfully' };
        }
      } else {
        return { code: 400, message: 'User can only save upto 5 addresses' };
      }
    } else {
      // User has no address - create one
      const address = await Address.create({ addresses: addressData });

      // If address got saved successfully
      if (address) {
        const updatedUser = await User.updateOne(
          { _id: userId },
          { addresses: address._id }
        );

        // If User Was Updated Successfully
        if (updatedUser) {
          return { code: 200, message: 'Address Was Saved Successfully' };
        } else {
          return { code: 400, message: 'Something Went Wrong While Saving Your Address.' };
        }
      } else {
        return { code: 400, message: 'Something Went Wrong While Saving Your Address.' };
      }
    }
  } catch (e) {
    throw Error(e);  
  }
}

// GET ADDRESS
exports.getUserAddresses = async (headers) => {
  try {
    const token = extractToken(headers['authorization']);
    const userId = getUserIdFromToken(token);

    const user = await User.findById(userId);
    
    if (!user) {
      return { code: 404, message: 'No user found' };
    }

    const userAddressId = user.addresses;    
    const records = await Address.findOne({ _id: userAddressId });
    
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
exports.updateUserAddress = async (addressId, addressData, headers) => {
  try {
    const token = extractToken(headers['authorization']);
    const userId = getUserIdFromToken(token);

    const user = await User.findById(userId);
    
    if (!user) {
      return { code: 404, message: 'No user found' };
    }

    const userAddressId = user.addresses; 
    const { addresses } = await Address.findOne({ _id: userAddressId });

    if (!addresses) {
      return { code: 400, message: 'Something Went Wrong' };
    }

    const addressIndex = addresses.findIndex((address) => address['id'] === addressId);
    addresses[addressIndex] = addressData;

    const data= await Address.findOneAndUpdate({ _id: userAddressId }, { addresses: addresses }, { new: true });

    if (addresses) {
      return {
        code: 200,
        message: 'Address Updated Successfully',
        data: data.addresses
      }
    } else {
      return { code: 400, message: 'Address was not updated.' }
    } 
  } catch (e) {
    throw Error(e);
  }
}

// DELETE ADDRESS
exports.deleteAddress = async (addressId, headers) => {
  try {
    const token = extractToken(headers['authorization']);
    const userId = getUserIdFromToken(token);

    const user = await User.findById(userId);
    
    if (!user) {
      return { code: 404, message: 'No user found' };
    }

    const userAddressId = user.addresses; 
    const { addresses } = await Address.findOne({ _id: userAddressId });

    if (!addresses) {
      return { code: 400, message: 'Something Went Wrong' };
    }

    const filteredAddresses = addresses.filter((address) => address['id'] !== addressId);

    const updatedAddress = await Address.findOneAndUpdate({ _id: userAddressId }, { addresses: filteredAddresses }, { new: true });
    
    if (updatedAddress) {
      return {
        code: 200,
        message: 'Address Removed Successfully',
        data: updatedAddress
      }
    } else {
      return { code: 400, message: 'Address was not deleted' }
    } 
  } catch (e) {
    throw Error(e);
  }
}