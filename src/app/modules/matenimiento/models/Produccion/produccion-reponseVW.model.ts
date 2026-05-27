export class ResponseVWProduccion {
    cantidadProduccion: number=0;
    descripcion: string ="";
    meta: number=0;
    fechaInicio: string="";
    codigoOrden: string="";
    estadoProduccion: string="";
    fechaFin: string ="";
    codigoProd: string ="";
    idProduccion: number=0;
    cantidadFaltante: number=0 ;
    codigoProduccion: string ="";
    fechaRegistro: string="";
}
export interface ResponseVProduccion {
    cantidadProduccion: number;
    descripcion: string | null;
    meta: number;
    fechaInicio: string;
    estadoProduccion: string;
    fechaFin: string | null;
    codigoProd: string | null;
    idProduccion: number;
    cantidadFaltante: number | null;
    codigoProduccion: string | null;
    fechaRegistro: string;
}

