export class RequestVWUsuario {
    idUsuario: number = 0;
    lugarRegistro: string = "";
    idPersona: number = 0;
    irol: number= 0;
    nombrePersona: string = "";
    apellidoPersona: string = "";
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
    idUsuario: number;
    idPersona: number;
    usuario1: string;
    lugarRegistro: string;
    password: string;
    email: string;
    estado: boolean;
    irol: number;
    nombrePersona: string;
    apellidoPersona: string;
    tipoPersona: string;
    tipoDocumento: string;
    numeroDocumento: string;
    telefono: string;
    codigoUbigeo: string | null;
    direccion: string | null;
}
