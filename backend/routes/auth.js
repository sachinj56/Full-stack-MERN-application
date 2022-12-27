const express = require('express');
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Sachinisagoodb$oy'
const fetchuser = require('./middleware/fetchuser')
// ROUTE 1 :Create a User using:POST "api/auth/createuser". No login required
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(), body('name', 'Enter a valid name').isLength({ min: 3 }), body('password', "Password must be atleast 5 characters").isLength({ min: 5 })
], async (req, res) => {
    // If there are erros,return Bad request and the error request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with this email exits already
    try {



        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "A user with this email already exists" })
        }
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);
        success= true
        res.json({success,authToken})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
})


// ROUTE 2: Authenticate a user using POST:"api/auth/login". No login required

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(), body('password', 'password cannot be blank').exists()
], async (req, res) => {
    // If there are erros,return Bad request and the error request
    try {


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            success=false
            res.status(400).json({success, error: "Please try to login in with correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password,user.password)
        if (!passwordCompare) {
            success=false
            res.status(400).json({ success,error: "Please try to login in with correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
         success=true
        res.json({success,authToken})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
    })

// ROUTE 3: Get loogedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
try {
    userId = req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user)
} catch (error) {
    console.log(error.message)
        res.status(500).send("Internal Server Error")
}
})
module.exports = router