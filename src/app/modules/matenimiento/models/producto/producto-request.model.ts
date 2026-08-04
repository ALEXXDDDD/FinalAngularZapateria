export class RequestProducto {
    idProducto: number = 0;
    nombreProd: string = "";
    codigoProd: string = "";
    precioUnitario: number = 0;
    nombreModelo: string = "";
    stock: number = 0;
    estadoProducto: boolean = false;
    idUnidad: number = 0;
    nombreUnidad: string = "";
    categoria: string = "";
    fotografia: string = "";
    color?: string | null;
    talla?: string | null;
    descripcion?: string | null;
    idDetalleProducto?: number | null;
}
export interface RequestVProducto {
    idProducto: number | null;
    nombreProd: string | null;
    codigoProd: string | null;
    nombreUnidad: string | null;
    nombreModelo: string | null;
    precioUnitario: number | null;
    stock: number;
    estadoProducto: boolean | null;
    idUnidad: number;
    fotografia: string | null;
    idModelo: number | null;
    color: string | null;
    categoria: string | null;
    talla: string | null;
    descripcion: string | null;
    idDetalleProducto: number;
}