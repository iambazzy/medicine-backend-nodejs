const Cart = require('../models/cart.model');
const User = require('../models/user.model');
const Medicine = require('../models/medicine.model');
const { getUserIdFromToken, extractToken } = require('../Helpers/helpers');

// ADD PRODUCT TO CART OR UPDATE
exports.addProductToCart = async (productFromClient, orderQuantity, headers) => {
  try {
    const token = extractToken(headers['authorization']);
    const userId = getUserIdFromToken(token);
    
    const { cart } = await User.findById(userId, { cart: 1 });
    
    if (!cart) {
      return { code: 400, message: '[NO:CART] - ERROR' };
    }

    // Compare product price
    const { _id , mrp, bestPrice } = productFromClient;
    const medicineStoredInServer = await Medicine.findOne({ _id });

    // Check if medicine Exists
    if(!medicineStoredInServer) {
      return { code: 400, message: '[CART] - ERROR - NO MEDICINE' };
    }

    if (
      parseInt(mrp) !== parseInt(medicineStoredInServer.mrp) || 
      parseInt(bestPrice) !== parseInt(medicineStoredInServer.bestPrice)) {
      return  { code: 400, message: '[CART] - Price Mismatch' };
    }

    // Check if in stock
    if (orderQuantity > medicineStoredInServer.quantity || orderQuantity < 0) {
      return  { code: 400, message: `Only (${medicineStoredInServer.quantity}) ${medicineStoredInServer.name} are left in stock` };
    }

    // Check If Medicine is already in the cart
    const { products } = await Cart.findOne({ _id: cart });
    const found = products.findIndex((product) => product['_id'] === _id);
    
    // Update Existing Medicine In Cart IF FOUND
    if (found !== -1) {
      products[found] = { ...productFromClient, orderQuantity };
      const updatedCart = await Cart.findOneAndUpdate(
        { _id: cart },
        { products: products },
        { new: true }
      );
        
      return {
        code: 200,
        message: 'Cart updated Successfully.',
        data: updatedCart
      }
    } 

    // ADD TO CART IF IT IS NOT IN THE CART ALREADY
    const updatedCart = await Cart.findOneAndUpdate(
      { _id: cart },
      { $push: { products: { ...productFromClient, orderQuantity } } },
      { new: true }
    );

    return  { 
      code: 200, 
      message: 'Added to cart successfully.' ,
      data: updatedCart
    };
    
  } catch (e) {
    throw new Error(e);
  }
}

// GET CART
exports.getCart = async (headers) => {
  try {
    const token = extractToken(headers['authorization']);
    const userId = getUserIdFromToken(token);
    
    const { cart } = await User.findById(userId, { cart: 1 });
    
    if (!cart) {
      return { code: 400, message: '[NO:CART] - ERROR' };
    }

    const userCart = await Cart.findOne({ _id: cart });

    return  { 
      code: 200, 
      message: 'Success' ,
      data: userCart
    };
    
  } catch (e) {
    throw new Error(e);
  }
}

// DELETE PRDUCT IN CART
exports.deleteInCart = async(productId, headers) => {
  try {
    const token = extractToken(headers['authorization']);
    const userId = getUserIdFromToken(token);
    
    const { cart } = await User.findById(userId, { cart: 1 });
    
    if (!cart) {
      return { code: 400, message: '[NO:CART] - ERROR' };
    }

    const userCart = await Cart.findOne({ _id: cart });

    const newCart = userCart.products.filter((product) => product['_id'] !== productId);

    const updatedCart = await Cart.findOneAndUpdate(
      { _id: cart },
      { products: newCart },
      { new: true }
    );

    return  { 
      code: 200, 
      message: 'Success',
      data: updatedCart
    };
    
  } catch (e) {
    throw new Error(e);
  }
}