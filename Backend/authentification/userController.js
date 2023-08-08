//Controller file for basic operation
const bcryptjs = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const userSchema = require('./userModel')

// @desc Get user data
// @route GET /api/users/me
// @acces Public

const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email} = await userSchema.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
})

// @desc Register new user
// @route POST /api/users/login
// @acces Public

const loginUser = asyncHandler(async (req, res) => {
    //Check for user email
    console.log("BACK LOGINUSER");
    const {email, password} = req.body
    const user = await userSchema.findOne({email})

    if (user && (await bcryptjs.compare(password, user.password))) {
        res.status(201).json({
            admin: user.admin,
            _id: user.id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials');
    }
})


// @desc Login existing user
// @route PUT /api/users/
// @acces Private




// @desc Login existing user
// @route PUT /api/users/
// @acces Public


const registerUser = asyncHandler(async (req, res) => {
    console.log("BACK REGISTERUSER");
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all field');
    }

    //Verify user do not exists

    const userExists = await userSchema.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    // Create user
    const user = await userSchema.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            admin: "user"
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data');
    }
    res.status(200).json({message: "Registered User"})
    return;
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
}