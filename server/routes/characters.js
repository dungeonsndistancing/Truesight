express = require('express')
router = express.Router();
auth = require('../config/auth')
const Character = require('../model/character')
const User = require('../model/user');
router.use(auth)

router.get('/list',auth,async (req,res) => {
    const result = await Character.findByUser(req.userData._id)
    res.status(200).json(result)
})

router.get('/single',auth,async (req,res) => {
    const result = await Character.findSingleById(req.query.id)
    res.status(200).json(result)
})

router.post('/create',auth, async (req, res) => {
    const char = req.body.character
    try{
    const result = await Character.findByUser(req.userData._id)
    res.status(200).json(result)
    } catch (err) {
        res.status(400).json({error:err})
    }

})

module.exports = router