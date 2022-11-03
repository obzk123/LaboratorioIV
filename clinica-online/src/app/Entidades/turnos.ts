import { Especialista, Paciente} from "./usuario";

export class Turnos {

    public id:number = 0;
    public especialista:Especialista;
    public paciente:Paciente;
    public especialidad:string;
    public fecha:string;
    public estadoTurno:string;
    public comentario:string;
    public resenia:string;
    public hora:string;


    constructor(especialista:Especialista, paciente:Paciente, especialidad:string ,fecha:string, hora:string, estadoTurno:string, comentario:string, resenia:string)
    {
        this.especialista = especialista;
        this.especialidad = especialidad;
        this.paciente = paciente;
        this.fecha = fecha;
        this.estadoTurno = estadoTurno;
        this.comentario = comentario;
        this.resenia = resenia;
        this.hora = hora;
    }
}
