express = require('express')
router = express.Router();
auth = require('../config/auth')
const Character = require('../model/character')
router.use(auth)

router.get('/list',async (req,res) => {
    const result = await Character.findByUser(req.userData._id)
    res.status(200).json(result)
})

router.get('/single',async (req,res) => {
    const result = await Character.findSingleById(req.query.id)
    if(result.user != req.userData._id) {
        res.status(403).json({error:'Forbidden!'})
    }
    res.status(200).json(result)
})

router.post('/create', async (req, res) => {
    const char = req.body.character
    const newChar = new Character(char)
    const result = await newChar.save()
    res.status(201).json(result)

})

module.exports = router