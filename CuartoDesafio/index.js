const {Router} = require('express')
const router = Router()

const productos = []




router.get('/productos', (req, res)=>{
    res.json(productos)
})

router.post('/productos', (req,res)=>{
    const{title, price, thumbnail} = req.body
    let id = productos.length
    productos.push({title, price, thumbnail, id})
    res.send(productos[productos.length-1])
})
router.get('/productos/:id', (req, res)=>{
    let producto = productos.find(prod => prod.id == req.params.id);
    let msj;
    if (producto){
        console.log(producto);
        msj = producto;
    } else {
        console.log(producto);
        msj = {error: "producto no encontrado"}
    }
    res.send(msj)
})

router.put('/productos/:id', (req,res)=>{
    let producto = productos.findIndex((prod) => { return prod.id == req.params.id});
    let msj;
    if (producto != -1){
        productos[producto]=req.body;
        msj = {ok: "producto actualizado exitosamente"}
        
    } else {
        
        
        msj = {error: "producto no encontrado"}
    }
    res.send(msj)
})

router.delete('/productos/:id', (req,res)=>{
    let producto = productos.findIndex((prod) => { return prod.id == req.params.id});
    let msj;
    console.log(producto);
    if (producto != -1){
        productos.splice(producto, 1);
        msj = {ok: "producto eliminado exitosamente"}
        
    } else {
        
        msj = {error: "producto no encontrado"}
    }
    res.send(msj)
})



module.exports = router