express = require('express')
router = express.Router()
auth = require('../config/auth')
const Item = require('../model/item')


router.get('/', async (req,res) => {
    res.status(200).json(await Item.find())
})

router.get('/count', async (req,res) => {
    res.status(200).json(await Item.itemCount())
})

router.get('/query',async (req,res) => {
    console.log(req.query)
    res.status(200).json(await Item.findByName(req.query.searchterms,req.query.page))
})

router.post('/add',async (req,res) => {
    const newItem = new Item(req.body.item)
    result = await newItem.save()
    res.status(201).json(result)
})

module.exports = router