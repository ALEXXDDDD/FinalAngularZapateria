export class RequestVWSalidaMaterial {
    cantidad: number= 0;
    idUnidad: number=0;
    codigoProduccion: string="";
    idSalidaMaterial: number=0;
    idMaterial: number= 0;
    idProduccion: number= 0;
    nombreMaterial: string="";
    fechaSalida: string="";
    estado: string ="";
    stock: number= 0;
}
export interface RequestVSalIdaMaterial {
    cantidad: number;
    codigoProduccion: string;
    idProduccion: number;
    nombreMaterial: string;
    idMaterial: number;
    fechaSalida: string | null;
    idUnidad: number;
    idSalidaMaterial: number;
}