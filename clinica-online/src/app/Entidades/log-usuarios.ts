export class LogUsuarios {
    public idUsuario:number;
    public fecha:string;
    public hora:string;

    constructor(idUsuario:number, fecha:string, hora:string)
    {  
        this.idUsuario = idUsuario;
        this.fecha = fecha;
        this.hora = hora;
    }
}
