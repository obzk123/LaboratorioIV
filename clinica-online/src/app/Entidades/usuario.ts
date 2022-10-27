export abstract class Usuario {
    public nombre:string;
    public apellido:string;
    public edad:number;
    public dni:string;
    public email:string;
    public password:string;
    public img:string;

    constructor(nombre:string, apellido:string, edad:number, dni:string, email:string, password:string, img:string)
    {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.email = email;
        this.password = password;
        this.img = img;
    }

    SetNombre(nuevoNombre:string)
    {
        this.nombre = nuevoNombre;
    }

    GetNombre():string
    {
        return this.nombre;
    }

    SetApellido(nuevoApellido:string)
    {
        this.apellido = nuevoApellido;
    }

    GetApellido():string
    {
        return this.apellido;
    }

    SetEdad(nuevaEdad:number)
    {
        this.edad = nuevaEdad;
    }

    GetEdad():number
    {
        return this.edad;
    }

    SetDni(nuevoDni:string)
    {
        this.dni = nuevoDni;
    }

    GetDni():string
    {
        return this.dni;
    }

    SetEmail(nuevoEmail:string)
    {
        this.email = nuevoEmail;
    }

    GetEmail():string
    {
        return this.email;
    }

    SetPassword(password:string)
    {
        this.password = password;
    }

    GetPassword():string
    {
        return this.password;
    }

    SetImage(nuevaImagen:string)
    {
        this.img = nuevaImagen;
    }

    GetImage():string
    {
        return this.img;
    }

}

export class Paciente extends Usuario
{
    public obraSocial:string;
    public img2:string;

    constructor(nombre:string, apellido:string, edad:number, dni:string, email:string, password:string, img:string, obraSocial:string, img2:string)
    {
        super(nombre, apellido, edad, dni, email, password, img);
        this.obraSocial = obraSocial;
        this.img2 = img2;
    }

    SetObraSocial(obraSocial:string)
    {
        this.obraSocial = obraSocial;
    }

    GetObraSocial() : string
    {
        return this.obraSocial;
    }

    SetImage2(img2:string)
    {
        this.img2 = img2;
    }

    GetImage2() : string
    {
        return this.img2;
    }
}

export class Especialista extends Usuario
{
    public especialidad:Array<string>;
    
    constructor(nombre:string, apellido:string, edad:number, dni:string, email:string, password:string, img:string)
    {
        super(nombre, apellido, edad, dni, email, password, img);
        this.especialidad = new Array<string>();
    }

    AddEspecialidad(nuevaEspecialidad:string)
    {
        this.especialidad.push(nuevaEspecialidad);
    }

    GetEspecialidades() : Array<string>
    {
        return this.especialidad;
    }
}
