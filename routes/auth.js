const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('auth', {
        title: 'title'
    })
})

router.get('/login', (req, res) => {
    res.render('auth/login', {
        title: 'ttt'
    })
})

router.get('/register', (req, res) => {
    res.render('auth/register', {
        title: 'ttt'
    })
})

module.exports = router