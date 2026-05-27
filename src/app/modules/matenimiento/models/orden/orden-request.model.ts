
export class ResponseListOrden {
    idOrden: number=0;
    codigoOrden: string="";
    fechaOrden: string="";
    montoDeuda: number= 0 ;
    estadoOrden: string="";
    fechaRequerido: string="" ;
    nombreCliente: string="";
    nombreProd: string="";
    tipoOrden: boolean = false;
    idUsuario: number= 0;
    precioUnitario: number= 0;
    cantidad: number= 0;
    montoTotal: number= 0 ;
    nombrePersona: string="";
    telefono: string="";
    usuario: string="";
    email: string="";
    codigoUbigeo: string="" ;
    direccion: string="" ;
}
export interface ResponseVOrden {
    idOrden: number;
    idProducto: number;
    codigoOrden: string | null;
    nombreProd: string | null;
    fechaOrden: string;
    fechaRequerido: string | null;
    estadoOrden: string;
    idCliente: number;
    nombreCliente: string | null;
    precioUnitario: number | null;
    montoTotal: number | null;
    cantidad: number;
    categoria: string | null;
    nombrePersona: string;
    telefono: string;
    usuario: string;
    email: string;
    codigoUbigeo: string | null;
    direccion: string | null;
}

