require('dotenv').config();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    const data = await User.create(userData);
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
  const { email, firstname, lastname } = userData;
  try {
    const userFound = await User.findOne({ email: userData.email });
    console.log(userFound);
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