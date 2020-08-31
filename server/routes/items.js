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

router.get('/query',auth,async (req,res) => {
    console.log(req.query)
    res.status(200).json(await Item.findByName(req.query.searchterms,req.query.page,req.query.editable,req.userData._id))
})

router.get('/get',async (req,res) => {
    res.status(200).json(await Item.findById(req.query.id))
})
router.put('/update',auth,async (req,res) => {
    try{
        var item = await Item.findById(req.body.item._id)
        if(item.user == req.body.item.user){
            await Item.findByIdAndUpdate(req.body.item._id,req.body.item)
            res.status(201).send("success")
        } else {
            throw new Error("not allowed")
        }
    } catch(err) {
        res.status(400).send("something went wrong")
    }
})
router.delete('/remove',auth,async (req,res) => {
    try{
        var item = await Item.findById(req.query.id)
        if(item.user == req.userData._id){
            await Item.findByIdAndDelete(req.query.id)
            
        res.status(201).send("success")
        } else {
            throw new Error("not allowed")
        }
    } catch(err) {
        res.status(400).send("something went wrong")
    }
})
router.post('/add',auth,async (req,res) => {
    const newItem = new Item(req.body.item)
    newItem.user = req.userData._id
    result = await newItem.save()
    res.status(201).json(result)
})

module.exports = router