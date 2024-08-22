import { ResponseProducto } from "../producto/producto-response.model";

export interface CarritoItem {
    producto: ResponseProducto,
    cantidad: number
}