export class RequestVWProveedor {
    idProvedor: number = 0;
    idPersona: number=0;
    nombrePersona: string ="";
    tipoPersona: string ="";
    tipoDocumento: string ="";
    numerodocumento: string ="";
    telefono: string ="";
    codigoUbigeo: string ="" ;
    direccion: string ="" ;
}
export interface RequestVProveedor {
    idProvedor: number;
    nombreProveedor: string | null;
    idPersona: number;
    nombrePersona: string;
    tipoPersona: string;
    tipoDocumento: string;
    numeroDocumento: string;
    telefono: string;
    codigoUbigeo: string | null;
    direccion: string | null;
}