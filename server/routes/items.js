express = require('express')
router = express.Router()
auth = require('../config/auth')
const Item = require('../model/item')
router.use(auth)

router.get('/', async (req,res) => {
    res.status(200).json(await Item.find())
})

router.get('/query',async (req,res) => {
    res.status(200).json(await Item.findByName(req.query.name))
})

router.post('/add',async (req,res) => {
    const newItem = new Item(req.body.item)
    result = await newItem.save()
    res.status(201).json(result)
})

module.exports = router