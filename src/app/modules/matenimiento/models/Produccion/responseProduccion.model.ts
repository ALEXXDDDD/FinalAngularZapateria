export class ResponseVProduccion {
    idProduccion: number= 0;
    cantidadProduccion: number= 0;
    descripcion: string ="";
    meta: number= 0;
    fechaInicio: string ="";
    estadoProduccion: string="";
    
    fechaFin: string ="";
    nombreProd: string ="";
    codigoOrden: string ="";
    cantidadFaltante: number= 0 ;
    codigoProduccion: string ="";
    codigoProd: string ="";
}
export interface RequestIngresoProducto {
    idProduccion: number;
    idProducto: number;
    cantidad: number;
    fechaIngreso: string;
    codigoProduccion: string;
    nombreProd: string | null;
    codigoOrden: string | null;
    idUnidad: number;
    idIngresoProducto: number;
}