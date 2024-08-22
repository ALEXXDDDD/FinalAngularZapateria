import { ResponseVDetalleProducto } from "./producto-responseVDetalle.model";

export class ResponseDetalleProducto {
    message: string = "";
    detalleProducts: ResponseVDetalleProducto[] = [];
}