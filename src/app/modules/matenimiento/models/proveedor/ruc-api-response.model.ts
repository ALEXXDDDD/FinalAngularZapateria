export interface RucApiResponse {
  ruc: string;
  razon_social: string;
  estado: string;
  condicion: string;
  direccion: string;
  mensaje: string;
  code: string;
}

export interface PersonaRucEncontrada {
  idPersona: number;
  nombrePersona: string;
  tipoDocumento: string;
  numeroDocumento: string;
  tipoPersona: string;
  telefono: string;
  direccion: string;
}

export interface ProveedorRucEncontrado {
  idProvedor: number;
  idPersona: number;
  nombreProveedor: string;
  materialEntrega: string;
  costoMaterialEntrega: number;
  unidadMaterialEntrega: string;
}

export interface BuscarRucProveedorResponse {
  source: string;
  api: RucApiResponse;
  message: string;
  persona?: PersonaRucEncontrada;
  proveedor?: ProveedorRucEncontrado;
}
