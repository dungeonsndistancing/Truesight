express = require('express')
router = express.Router()
mongoose = require("mongoose")
auth = require("../config/auth")
const User = require("../model/user")

router.post('/register', async (req, res) => {
    try{
        let isUser =  await User.find({email: req.body.email })
        if(isUser.length >= 1) {
            return res.status(409).json({
                message: "email already in use"
            })
        }
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        let data = await user.save();
        const token = await user.generateAuthToken()
        res.status(201).json({ data, token})
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ err: err})
    }
})

router.post('/login', async(req,res) => {
    try{
        console.log("hi")
        console.log(req.body)
        const email = req.body.email
        const pass = req.body.password
        console.log("hi3")
        const user = await User.findByCredentials(email, pass)
        
        if(!user) {
            return res.status(401).json({ error: "Wrong credentials"})
        }
        const token = await user.generateAuthToken()
        res.status(201).json({user, token})
    } catch (err) {
        console.log(err)
        res.status(400).json({err: err})
    }
})

router.post('/verify',auth, async(req,res) => {
     res.status(200).json({data: await req.userData})

})

router.get('/me',auth, async(req, res) => {
    console.log(req.userData)
     res.status(200).json({data : await req.userData})
})

module.exports = router