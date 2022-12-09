const express = require('express');
import Contenedor from './contenedor.js';
const app = express();
const PORT= 8080;

const routeProductos = express.Router();
routeProductos.use(express.json());
routeProductos.use(express.urlencoded({extended : true}));
app.use('/api/productos', routeProductos)

routeProductos.get('/',(req, res) =>{
    const listaProductos = new Contenedor('productos');
    listaProductos.getAll().then(consignaA => res.send(consignaA))
})

routeProductos.get('/:id',(req, res) =>{
    let id = req.params
    const listaProductos = new Contenedor('productos');
    listaProductos.getById(id).then(consignaB => res.send(consignaB))
})

routeProductos.post('/',(req, res) =>{
    let producto = req.body
    const listaProductos = new Contenedor('productos');
    listaProductos.save(producto).then(consignaC => res.send(consignaC))
})

routeProductos.put('/:id',(req, res) =>{
    let id = req.params
    let producto = req.body;
    producto.id = id
    const listaProductos = new Contenedor('productos');
    listaProductos.update(producto).then(consignaD => res.send(consignaD))
})

routeProductos.delete('/:id',(req, res) =>{
    let id = req.params
    const listaProductos = new Contenedor('productos');
    listaProductos.deleteById(id).then(consignaE => res.send(consignaE))
})

const server = app.listen(PORT, () => {
    console.log(`el servidor se esta escuchando en el puerto: ${PORT}`);
})
server.on('error', error => console.log(`sucedio el error: ${error}`))