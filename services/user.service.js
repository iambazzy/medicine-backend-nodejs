require('dotenv').config();
const User = require('../models/user.model');
const Cart = require('../models/cart.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Empty Cart Template 
const { EMPTY_CART } = require('../Helpers/helpers');


// CREATE NEW USER
exports.createUser = async (userData) => {
  try {
    const userFound = await User.exists({ email: userData.email });

    // IF USER FOUND
    if (userFound) {
      return {
        code: 409,
        message: 'An Account Already Exists With The Provided Email'
      }
    } 

    // IF USER DOES NOT FOUND THEN CREATE USER

    // INITIALIZE EMPTY CART FOR USER
    const { _id } = await Cart.create(EMPTY_CART);

    if (!_id) {
      return {
        code: 409,
        message: 'Something Went Wrong - Please Try Again later!'
      }
    }

    const userWithCart = {
      ...userData,
      cart: _id
    }

    // CREATE USER WITH CART
    const data = await User.create(userWithCart);
    return {
      email: data.email,
      code: 200,
      message: 'Account Created Successfully'
    };
  } catch (e) {
    throw Error(e);
  }
}

// LOGIN EXISTING USER
exports.signIn = async (userData) => {
  const { email } = userData;
  try {
    const userFound = await User.findOne({ email: userData.email });

    // IF USER DOES NOT EXIST
    if (userFound === false || userFound === null) {
      return {
        code: 404,
        message: 'Sorry! This email address does not exist'
      }
    }

    // IF USER EXISTS
    if (userFound) {
      const isPasswordCorrect = await bcrypt.compare(userData.password, userFound.password);
      
      // IF PASSWORD IS INCORECT
      if (isPasswordCorrect === false) {
        return {
          code: 404,
          message: 'Email or Password Is Incorrect'
        }
      }

      // IF PASSWORD IS CORRECT ASSIGN TOKEN
      const token = jwt.sign(
        { id : userFound._id }, 
        process.env.SECRET,
        { expiresIn: 86400 }
      );
      return {
        email,
        token,
        id: userFound._id,
        code: 200,
        message: 'Logged In Successfully'
      }
    } 
  } catch (e) {
    throw Error(e);
  }
}

// VERIFY USER TOKEN
exports.verifytoken = async (token) => {
  // CHECK IF TOKEN IS PASSED A PARAM
  if (token === '' || token === undefined || token === null) {
    return {
      message: 'Invalid or Missing Parameters'
    }
  }

  // CHECK IF TOKEN IS VALID
  try {
    const data = await jwt.verify(token, process.env.SECRET);
    return { code: 200, data, valid: true, message: 'Valid Signature!'};
  } catch(e) {
    return { code: 401, valid: false, message: 'Invalid Signature!'};
  }
}