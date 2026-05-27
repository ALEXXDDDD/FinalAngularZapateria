export class ResquestVDetalleCredito {
    montoAmortizacion: number=0;
    fechaAmortizacion: string="";
    idOrden: number=0;
    codigoOrden: string ="";
    nombreCliente: string="";
    relacionCliente: string="" ;
    idCredito: number=0;
    idDetalleCredito: number=0;
}
export interface RequestDetalleCredito {
    montoAmortizacion: number;
    fechaAmortizacion: string;
    idOrden: number;
    codigoOrden: string | null;
    nombreCliente: string | null;
    relacionCliente: string | null;
    idCredito: number;
    idDetalleCredito: number;
}