export class RequestVWMaterial {
    idMaterial: number= 0;
    nombreMaterial: string= "" ;
    nombreUnidad: string = "";
    stock: number= 0;
    descripMaterial: string = "";
    marca: string = "";
    estado: string = "";
}


export interface RequestVMaterial {
    idMaterial: number;
    nombreMaterial: string;
    stock: number;
    descripMaterial: string | null;
    marca: string | null;
    estado: string | null;
    nombreUnidad: string;
}