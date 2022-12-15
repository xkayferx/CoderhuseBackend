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
                result = product
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
            return productos;
        } catch (error) {
            console.log(error)
        }
        
    }

    async update(productoNuevo){
        try{
            const raw = await fs.promises.readFile(this.filePath)
            const productos = await JSON.parse(raw);
            if (!Array.isArray(productos)){
                let result = 'no hay productos disponibles'
                return result
            }else{
                let i = productos.findIndex(x => x.id === productoNuevo.id);
                if(i == -1){
                    let result = 'producto no encontrado'
                    return result
                }else{
                    productos[i].title = productoNuevo.title
                    productos[i].price = productoNuevo.price
                    productos[i].thumbnail = productoNuevo.thumbnail
                    const db = JSON.stringify(productos);
                    await fs.promises.writeFile(this.filePath, db);
                }
            }
        }catch(error){
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

}

module.exports = Contenedor