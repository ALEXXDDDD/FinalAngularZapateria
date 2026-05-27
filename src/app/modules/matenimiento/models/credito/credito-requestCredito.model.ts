export class RequestCredito {
    montoPagado: number= 0 ;
    montoDeuda: number= 0 ;
    montoTotal: number= 0 ;
    idCredito: number= 0;
    idCliente: number= 0;
    nombreCliente: string = "" ;
    codigoOrden: string ="" ;
    estadoOrden: string ="";
    fechaOrden: string ="";
    fechaRequerido: string="" ;
// export interface RequestCredito {
//     idCredito: number;
//     montoTotal: number | null;
//     montoPagado: number | null;
//     montoDeuda: number | null;
//     estadoCredito: string | null;
//     idCliente: number;
// }
}