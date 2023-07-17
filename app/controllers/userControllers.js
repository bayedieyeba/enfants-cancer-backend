const asyncHandler = require("express-async-handler")
const generateToken = require("../config/generateToken")
const User = require("../models/userModel")


const registerUser = asyncHandler(async (req, res) => {

    const { firstName, password,phone,lastName,email } = req.body
    
    if (!firstName || !lastName || !password || !phone) {
        res.status(400)
        throw new Error("Please Enter all the Fields")
    }

     const userExits = await User.findOne({ $or: [{ email }, { phone }] });
    
    if (userExits) {
        res.status(401)
        throw new Error("L'email ou le numéro de téléphone existe déjà")
    }

     const user = await User.create(
        {
            firstName,
            phone,
            email,
            password,
            lastName,
        }
    )
    if (user) {
        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Failed to create the user')
    }



})

const authUser = asyncHandler(async (req, res) => {
    
    const { login, password } = req.body;
    let query;

  if (/^\d+$/.test(login)) {
    // Si c'est un numéro de téléphone
    query = { phone: login };
  } else {
    // Sinon, c'est un email
    query = { email: login };
  }
    const user = await User.findOne(query);
    
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid login or Password")
    }
})
 
module.exports = {
    registerUser, authUser
}