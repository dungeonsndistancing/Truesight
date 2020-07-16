express = require('express')
jwt = require('jsonwebtoken')
router = express.Router();
auth = require('../config/auth')
router.use(auth)
const Spell = require('../model/spell')

router.get('/', async (req, res) => {
    res.status(200).json(await Spell.find())

})


router.post('/add', async (req, res) => {
    const spell = req.body.spell
    console.log(spell.components)
    try{ 
        const spellsave = new Spell(req.body.spell)
        let result = await spellsave.save()
        res.status(200).json({result: "success"})
    } catch (err) {
        res.status(400).json({error: err})
        res.send()
    }

})
module.exports = router