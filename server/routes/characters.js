express = require('express')
router = express.Router();
auth = require('../config/auth')
const Character = require('../model/character')
const User = require('../model/user');
router.use(auth)

router.get('/list',auth, async (req,res) => {
    const result = await Character.findByUser(req.userData._id)
    console.log(result)
    res.status(200).json(result)
})

router.get('/single',auth,async (req,res) => {
    console.log("HI")
    console.log(req.query.id)
    const result = await Character.findSingleById(req.query.id)
    if(result.user != req.userData._id) {
        res.status(401).json({error:'Not Authorized'})
    }
    res.status(200).json(result)
})

router.post('/create',auth, async (req, res) => {
    const char = req.body.character
    try{
    const result = await Character.findByUser(req.userData._id)
    console.log(result)
    res.status(200).json(result)
    } catch (err) {
        res.status(400).json({error:err})
    }
    console.log(char)

})

module.exports = router