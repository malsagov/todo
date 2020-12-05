const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const mongoose = require('mongoose')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.use(express.json())

app.engine('hbs', hbs.engine)
//устанавливаю hbs в качестве шаблонтзатора express
app.set('view engine', 'hbs')
//устанавливаю папку views(второй параметр), как путь к представлениям
app.set('views', 'views')


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))


app.use('/', homeRoutes)

async function start(){
    try{
        const url = `mongodb+srv://mal48813:mal48813@cluster0.iiqbb.mongodb.net/todo`
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        app.listen(3000, () => {
            console.log(`Server is running`)
        })
    }catch(e){
        console.log(e)
    }
}

start()