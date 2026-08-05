export class RequestVWUsuario {
    idUsuario: number = 0;
    lugarRegistro: string = "";
    idPersona: number = 0;
    irol: number= 0;
    nombrePersona: string = "";
    apellidoCliente: string = "";
    nombreRol: string = "";
    iRol: number = 0;
    tipoDocumento: string = "";
    numeroDocumento: string = "";
    telefono: string = "";
    codigoUbigeo: string = "" ;
    direccion: string = "" ;
    usuario1: string = "";
    password: string = "";
    email: string = "";
    estado: boolean=false
}

export interface RequestUsuario {
    idUsuario: number | null;
    idPersona: number | null;
    apellidoCliente: string | null;
    usuario1: string | null;
    password: string | null;
    email: string | null;
    estado: boolean | null;
    irol: number | null;
    nombrePersona: string | null;
    nombreRol: string | null;
    tipoPersona: string | null;
    tipoDocumento: string | null;
    numeroDocumento: string | null;
    telefono: string | null;
    direccion: string | null;
}