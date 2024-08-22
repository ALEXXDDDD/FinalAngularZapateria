import { ResponseVWProduccion } from "./produccion-reponseVW.model";

export class ResponseProduccion {
    message: string = "";
    produccions: ResponseVWProduccion[] = [];
}

export interface RequestProduccion {
    idProduccion: number;
    codigoProduccion: string;
    meta: number;
    fechaInicio: string;
    estadoProduccion: string;
    cantidadFaltante: number | null;
    idUnidad: number;
    fechaFin: string | null;
}