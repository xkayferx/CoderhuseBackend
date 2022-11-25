const { Console } = require("console");
const fs = require("fs");

class Contenedor {
    constructor(fileName){
        this.fileName = fileName
        const path =`./${fileName}.txt`
        const productos = [];
        const productosDB = JSON.stringify(productos);
        if(!fs.existsSync(path)){
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
        

        async function writeTxt(data) {
            try{
                await fs.promises.writeFile(path, db);
                console.log("el producto fue guardado con exito");
            }catch(error){
                console.log("sucedio al guardar el producto ");
            }
        }
    }

    async save (product) {
        try{
            let result = 0
            const path =`./${this.fileName}.txt`
            const raw = await fs.promises.readFile(path)
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
            const db = await JSON.stringify(productos);
            await fs.promises.writeFile(path, db);
            console.log(result)
            return await result
        }catch(error){
            console.log("sucedio un error", error)
        }
    }

    async getById(id){
        try{
            const path =`./${this.fileName}.txt`
            const raw = await fs.promises.readFile(path)
            const productos = await JSON.parse(raw);
            let result = ""
            let ok = 0
            let lastItem = productos.length
            let i = 0;
            while(i < lastItem){
                if(productos[i].id == id){
                    result = await productos[i];
                    
                    ok = 10;
                    i = lastItem;
                }else{
                    i = i + 1;
                }
            }
            if(ok > 0){
                console.log(result)
                return await result;
            }else{
                return "no se encontro el producto"
            }
        }catch(error){
            console.log(error)
        }
    }

    async getAll(){
        try {
            const path =`./${this.fileName}.txt`
            const raw = await fs.promises.readFile(path)
            const productos = await JSON.parse(raw);
            console.log(productos)
            return productos;
        } catch (error) {
            console.log(error)
        }
        
    }

    async deleteById(id){
        try{
            const path =`./${this.fileName}.txt`
            const raw = await fs.promises.readFile(path)
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
            
            const db = await JSON.stringify(productos);
            await fs.promises.writeFile(path, db);
        }catch(error){
            console.log(error)
        }
    }

    async deleteAll() {
        let doom = [];
        const path =`./${this.fileName}.txt`
        const db = await JSON.stringify(doom);
        await fs.promises.writeFile(path, db);
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

//let consignaA1 = listaProductos.save(productoA);
//console.log(consignaA1);
//let consignaA2 = listaProductos.save(productoB);
//console.log(consignaA2);
//let consignaA3 = listaProductos.save(productoC);
//console.log(consignaA3);
//let consignaB = listaProductos.getById(1);
//console.log(consignaB);
let consignaC = listaProductos.getAll();
console.log(consignaC);
//let consignaD = listaProductos.deleteById(2);
//console.log(consignaD);
//let consignaE = listaProductos.deleteAll();
//console.log(consignaE);


