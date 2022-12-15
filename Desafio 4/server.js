const express = require('express');
const fs = require('fs')
const Contenedor = require('./contenedor.js')
const app = express();
const PORT= 8080;
const listaProductos = new Contenedor('productos');

const routeProductos = express.Router();
routeProductos.use(express.json());
routeProductos.use(express.urlencoded({extended : true}));
app.use(express.static('public'))
app.use('/api/productos', routeProductos)

routeProductos.get('/',(req, res) =>{
    listaProductos.getAll().then(consignaA => res.json(consignaA))
})

routeProductos.get('/:id',(req, res) =>{
    let id = req.params
    listaProductos.getById(id).then(consignaB => res.json(consignaB))
})

routeProductos.post('/',(req, res) =>{
    console.log(req.body);
    let producto = req.body;
    listaProductos.save(producto).then(consignaC => res.json(consignaC))
})

routeProductos.put('/:id',(req, res) =>{
    let id = req.params
    let producto = req.body;
    producto.id = id
    listaProductos.update(producto).then(consignaD => res.json(consignaD))
})

routeProductos.delete('/:id',(req, res) =>{
    let id = req.params
    listaProductos.deleteById(id).then(consignaE => res.json(consignaE))
})

const server = app.listen(PORT, () => {
    console.log(`el servidor se esta escuchando en el puerto: ${PORT}`);
})
server.on('error', error => console.log(`sucedio el error: ${error}`))