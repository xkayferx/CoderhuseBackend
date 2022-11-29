const fs = require("fs");

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

    async getAll(){
        try {
            const raw = await fs.promises.readFile(this.filePath)
            const productos = await JSON.parse(raw);
            console.log(productos)
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

let productoA = {
    title : 'productoRandomA',
    price : 7000,
    thumbnail: 'www.fakethumbnail.com',
}

let productoB = {
    title : 'productoRandomB',
    price : 5000,
    thumbnail: 'www.fakethumbnail.com',
}

let productoC = {
    title : 'productoRandomC',
    price : 10000,
    thumbnail: 'www.fakethumbnail.com',
}

const listaProductos = new Contenedor('productos');

//listaProductos.save(productoA).then(consignaA1 => console.log(consignaA1))
//listaProductos.save(productoB).then(consignaA2 => console.log(consignaA2))
//listaProductos.save(productoC).then(consignaA3 => console.log(consignaA3))
//listaProductos.getById(1).then(consignaB => console.log(consignaB))
listaProductos.getAll().then(consignaC => console.log(consignaC))
//listaProductos.deleteById(2).then(consignaD => console.log(consignaD))
//listaProductos.getAll().then(consignaE => console.log(consignaE))


