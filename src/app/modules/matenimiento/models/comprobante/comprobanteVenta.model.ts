import { ResponsePersona } from "../persona/response-persona.model";
import { ResponseProducto } from "../producto/producto-response.model";

export class RepsonseComprobante {
    codigoOrden: string="";
    fechaOrden: string="";
    estadoOrden: string="";
    fechaRequerido: string="" ;
    nombreCliente: string="";
    nombreProd: string="";
    tipoOrden: boolean = false;
    idUsuario: number= 0;
    precioUnitario: number= 0;
    cantidad: number= 0;
    montoTotal: number= 0 ;
    cliente: ResponsePersona[] = [];
    producto: ResponseProducto[] = [];
}