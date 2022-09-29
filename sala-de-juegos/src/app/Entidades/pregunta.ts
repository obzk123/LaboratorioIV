export class Pregunta 
{
    public imagen:string;
    public categoria:string;
    public pregunta:string;
    public respuesta1:string;
    public respuesta2:string;
    public respuesta3:string;
    public respuesta4:string;
    public correcta:number;


    constructor()
    {
        this.imagen = '';
        this.categoria = '';
        this.pregunta = '';
        this.respuesta1 = '';
        this.respuesta2 = '';
        this.respuesta3 = '';
        this.respuesta4 = '';
        this.correcta = 0;
    }

    public static CargarPregunta(imagen:string, categoria:string, pregunta:string, respuesta1:string, respuesta2:string, respuesta3:string, respuesta4:string, correcta:number) : Pregunta
    {
        let variablePregunta = new Pregunta();
        variablePregunta.imagen = imagen;
        variablePregunta.categoria = categoria;
        variablePregunta.pregunta = pregunta;
        variablePregunta.respuesta1 = respuesta1;
        variablePregunta.respuesta2 = respuesta2;
        variablePregunta.respuesta3 = respuesta3;
        variablePregunta.respuesta4 = respuesta4;
        variablePregunta.correcta = correcta;

        return variablePregunta;
    }
}
