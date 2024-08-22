export class RequestVWCliente {
    idCliente: number = 0; 
    idPersona: number=0;
    nombrePersona: string = "";
    tipoPersona: string = "";
    tipoDocumento: string = "";
    numeroDocumento: string = "";
    telefono: string = "";
    codigoUbigeo: string | null ="";
    direccion: string | null = "";
    fechaNacimiento:string = "";
    estado: boolean = false;

    
}
export interface RequestVCliente {
    idCliente: number;
    idPersona: number;
    fechaNacimiento: string | null;
    estado: boolean;
    nombrePersona: string;
    tipoPersona: string;
    tipoDocumento: string;
    numeroDocumento: string;
    telefono: string;
    codigoUbigeo: string | null;
    direccion: string | null;
}