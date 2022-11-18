class Usuario {
    constructor(nombre, apellido,){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }

    getFullName(){
        return(` ${this.nombre} ${this.apellido}`)
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        return (this.mascotas.length);
    }

    addBooks(name, author){
        this.libros.push({nombre: name, autor: author});
    }

    getBookNames(){
        let names = this.libros.map(a => a.nombre);
        return (names);
    }

}

const usuarioA = new Usuario( 'Esteban', 'Quito');
usuarioA.addMascota('Leon');
usuarioA.addBooks('libroA', 'autorA');
console.log("El nombre completo del usuario es:" + usuarioA.getFullName()) ;
console.log(usuarioA.getBookNames()); 
console.log("el usuario tiene " + usuarioA.countMascotas() + " mascota/as" );


