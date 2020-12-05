const {Router} = require('express')
const router = Router()
const Task = require('../models/add')

router.get('/', async (req, res) => {
    const tasks = await Task.find().lean().sort({date: -1})
    res.render('index', {
        title: 'Главная страница',
        isHome: true,
        tasks
    })
})

router.post('/add', async (req, res) => {
    console.log()
    const task = new Task({
        title: req.body.task,
        desc: '',
        date: Date.now(),
        complete: false
    })

    try{
        await task.save()
        res.redirect('/')
    }catch(e){
        console.log(e)
    }
})

router.post('/remove', async (req, res) => {
    console.log(req.body)
    await Task.deleteOne({date: req.body.date}).lean()
    res.redirect('/')
})

router.post('/complete', async (req,res) => {
    console.log(req.body)
    await Task.updateOne({date: req.body.date}, {$set: {complete: req.body.complete}})
    res.redirect('/')
})

module.exports = router