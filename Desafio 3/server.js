const express = require('express');
const fs = require("fs");
const app = express();
const PORT = 8080;

class Contenedor {
    constructor(fileName){
        this.fileName = fileName
        this.filePath =`./${fileName}.txt`
        const productos = [];
        const productosDB = JSON.stringify(productos);
        if(!fs.existsSync(this.filePath)){
            fs.writeFile(`./${fileName}.txt`,productosDB, error => {
                if(error){
                    console.log("sucedio un error", error);
                }else{
                    console.log("el archivo fue creado con exito");
                }
            })
        }else{
            console.log(`el archivo de texto ${fileName} ya existe`);
        }
    }

    async save (product) {
        try{
            let result = 0
            const raw = await fs.promises.readFile(this.filePath)
            const productos = await JSON.parse(raw);
            let lastItem = productos.length
            if(lastItem == 0){
                product.id = 1
                result = 1
            }else{
                lastItem = lastItem - 1;
                product.id = productos[lastItem].id + 1
                result = productos[lastItem].id + 1 
            }
            productos.push(product);
            const db = JSON.stringify(productos);
            await fs.promises.writeFile(this.filePath, db);
            console.log(result)
            return result
        }catch(error){
            console.log("sucedio un error", error)
        }
    }

    async getById(id){
        try{
            const raw = await fs.promises.readFile(this.filePath)
            const productos = await JSON.parse(raw);
            if (!Array.isArray(productos)){
                return null
            }else{
                const obj = productos.filter(producto => producto.id === id);
                return obj || null;
            }
        }catch(error){
            console.log(error)
        }
    }

    async getRandom(){
        try{
            const raw = await fs.promises.readFile(this.filePath)
            const productos = await JSON.parse(raw);
            function getRandomid() {
                let lastItem = productos.length + 1;
                let randomId = Math.floor(Math.random() * lastItem);
                if(randomId == 0){
                    randomId = 1
                }
                return randomId;
                
            }
            const id = getRandomid()
            console.log(id)
            const obj = productos.filter(producto => producto.id === id);
            return obj;
        }catch(error){
            console.log(error)
        }
    }

    async getAll(){
        try {
            const raw = await fs.promises.readFile(this.filePath)
            const productos = await JSON.parse(raw);
            return productos;
        } catch (error) {
            console.log(error)
        }
        
    }

    async deleteById(id){
        try{
            const raw = await fs.promises.readFile(this.filePath)
            const productos = await JSON.parse(raw);
            let ok = 0
            let lastItem = productos.length
            let i = 0;
            while(i < lastItem){
                if(productos[i].id == id){
                    productos.splice(i,1)
                    ok = 10;
                    i = lastItem;
                }else{
                    i = i + 1;
                }
            }
            if(ok > 0){
                console.log("el producto fue eliminado");
            }else{
                console.log("el producto no fue encontrado")
            }
            
            const db = JSON.stringify(productos);
            await fs.promises.writeFile(this.filePath, db);
        }catch(error){
            console.log(error)
        }
    }

    async deleteAll() {
        let doom = [];
        const db = JSON.stringify(doom);
        await fs.promises.writeFile(this.filePath, db);
    }

}

app.get('/productos', (req,res) => {
        const listaProductos = new Contenedor('productos');
        listaProductos.getAll().then(consignaA => res.send(consignaA))
    
})

app.get('/productoRandom', (req,res) => {
    const listaProductos = new Contenedor('productos');
    listaProductos.getRandom().then(consignaB => res.send(consignaB))
})

const server = app.listen(PORT, () => {
    console.log( `El servidor se esta escuchando en el puerto: ${PORT}`)
})
server.on("error", error => console.log(`error en el servidor: ${error}`))