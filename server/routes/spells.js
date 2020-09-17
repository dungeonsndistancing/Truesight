express = require('express')
jwt = require('jsonwebtoken')
router = express.Router();
auth = require('../config/auth')
router.use(auth)
const Spell = require('../model/spell')

router.get('/', async (req, res) => {
    res.status(200).json(await Spell.find())

})

router.get('/query',auth, async(req,res) => {
    console.log('hi')
    try{
        res.status(200).json(await Spell.findByName(req.query.searchterms,req.query.page,req.query.editable,req.userData._id))
    } catch(err) {
        console.log(err)
        res.status(400).send()
    }
})
router.get('/count',auth,async(req,res) => {
    res.status(200).json(await Spell.spellCount())
})

router.get('/get',auth, async(req,res) => {
    res.status(200).json(await Spell.findById(req.query.id))
})
router.put('/update',auth,async(req,res) => {
    try{ 
        console.log(req.body.spell.name)
        var spell = await Spell.findById(req.body.spell._id)
        if(spell.user == req.body.spell.user) {
            await Spell.findByIdAndUpdate(req.body.spell._id,req.body.spell)
            res.status(201).send("success")
        } else {
            res.status(403).send()
        }
    } catch(err) {
        console.log(err)
        res.status(400).send("Something went wrong")
    }
})
router.post('/add',auth, async (req, res) => {
    const spell = req.body.spell
    console.log(spell.components)
    try{ 
        const spellsave = new Spell(req.body.spell)
        spellsave.user = req.userData._id
        await spellsave.save()
        res.status(200).json({result: "success"})
    } catch (err) {
        res.status(400).json({error: err})
        res.send()
    }

})
module.exports = router