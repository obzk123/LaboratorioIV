export class Encuesta {

    public email:string;
    public nombre:string;
    public apellido:string;
    public edad:number;
    public telefono:number;
    public respuesta:string;
    public juegofavorito:string;
    public condiciones:boolean;


    constructor()
    {
        this.email = "";
        this.nombre = "";
        this.apellido = '';
        this.edad = 0;
        this.telefono = 0;
        this.respuesta = '';
        this.juegofavorito = 'Ahorcado';
        this.condiciones = false;
    }
}


