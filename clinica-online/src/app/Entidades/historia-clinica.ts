import { Paciente } from "./usuario";

export class HistoriaClinica {
    public idPaciente:number;
    public altura:string;
    public peso:number;
    public temperatura:number;
    public presion:number;
    public datosExtras:Array<string>;

    constructor(idPaciente:number, altura:string, peso:number, temperatura:number, presion:number, datosExtras:Array<string>)
    {
        this.idPaciente = idPaciente;
        this.altura = altura;
        this.peso = peso;
        this.temperatura = temperatura;
        this.presion = presion;
        this.datosExtras = datosExtras;
    }
}
