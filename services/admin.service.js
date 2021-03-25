require('dotenv').config();
const Admin = require('../models/admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// CREATE NEW USER
exports.createAdmin = async (userData) => {
  try {
    const userFound = await Admin.exists({ username: userData.username });

    // IF USER FOUND
    if (userFound) {
      return {
        code: 409,
        message: 'An Account Already Exists With The Provided Username'
      }
    } 

    // IF USER DOES NOT FOUND THEN CREATE USER
    const data = await Admin.create(userData);
    return {
      username: data.username,
      code: 200,
      message: 'Account Created Successfully'
    };
  } catch (e) {
    throw Error(e);
  }
}

// LOGIN EXISTING ADMIN
exports.signInAdmin = async (userData) => {
  try {
    const userFound = await Admin.findOne({ username: userData.username });
    
    // IF USER DOES NOT EXIST
    if (userFound === false || userFound === null) {
      return {
        code: 404,
        message: 'Sorry! This username does not exist'
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
        { id : process.env.ADMINSECRET }, 
        process.env.SECRET,
        { expiresIn: 86400 }
      );
      return {
        username: userData.username,
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