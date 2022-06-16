const express = require ('express')
const app = express()
const rutas = require('./routes/index')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.use ('/api', rutas)


app.listen(8080, ()=>{
    console.log("servidor escuchando el puerto 8080");
})