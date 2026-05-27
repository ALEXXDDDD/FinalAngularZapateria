export class VistCredito {
    idCliente: number=0;
    idCredito: number=0;
    nombreCliente: string ="";
    montoDeuda: number=0 ;
    estadoCredito: string="" ;
    montoAmortizacion: number= 0;
    fechaAmortizacion: string="";
    montoPagado: number=0;

}
export interface VistClienteCredito {
    idCliente: number;
    idCredito: number;
    nombreCliente: string | null;
    montoDeuda: number | null;
    estadoCredito: string | null;
    montoPagado: number | null;
}
// export interface VistCredito {
//     montoPagado: number | null;
//     montoDeuda: number | null;
//     idCredito: number;
//     idCliente: number;
//     nombreCliente: string | null;
//     montoTotal: number | null;
//     codigoOrden: string | null;
//     estadoOrden: string;
//     fechaRequerido: string | null;
//     fechaOrden: string;
//     idOrden: number;
//     montoAmortizacion: number;
//     fechaAmortizacion: string;
//     estadoCredito: string | null;
// }