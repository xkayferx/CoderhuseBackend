class Usuario {
    constructor(nombre, apellido,){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }

    getFullName(){
        return console.log(`El nombre completo del usuario es: ${this.nombre} ${this.apellido}`)
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        return console.log("el usuario tiene", this.mascotas.length, "mascota/as");
    }

    addBooks(name, author){
        this.libros.push({nombre: name, autor: author});
    }

    getBookNames(){
        let names = this.libros.map(a => a.nombre);
        return console.log(names);
    }

}

const usuarioA = new Usuario( 'Esteban', 'Quito');
usuarioA.addMascota('Leon');
usuarioA.addBooks('libroA', 'autorA');
usuarioA.getFullName();
usuarioA.getBookNames();
usuarioA.countMascotas();


