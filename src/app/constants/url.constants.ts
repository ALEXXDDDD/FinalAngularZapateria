import { PerfilListComponent } from "../pages/perfil/perfil-list/perfil-list.component"


export const dominio = "https://localhost:7282/"  
/* export const dominio = "https://localhost:7287/"  */
/**
 * TODO: las constantes para llamar al backedn 
 */


// export const dominio = "https://zapateriaback.somee.com/" 

export const urlConstants ={
    rol: dominio+'api/Rol',
    producto:dominio+'api/Producto',
    responseProductoStore:dominio+'api/ProductoStore',
    material:dominio+'api/Material',
    responseMaterialStore:dominio+'api/MaterialStore',
    persona: dominio+'api/Persona/',
    Cliente:dominio+'api/Cliente/',
    Empleado:dominio+'api/Empleado/',
    Modelo:dominio+'api/Modelo',
    Unidad:dominio+'api/Unidad',
    auth:dominio + "api/Auth",
    Usuario:dominio + "api/Usuario",
    DetalleProduccion:dominio+"api/DetalleProduccion",
    Proveedor:dominio + "api/Proveedor",
    Credito:dominio + "api/Credito",
    Orden:dominio + "api/Orden/",
    Produccion:dominio + "api/Produccion",
    SalidaMaterial:dominio+"api/SalidaMaterial",
    detalleCredito:dominio+"api/DetalleCredito",
    /// Store Procedure
    verDetalleProducto :dominio+"api/DetalleProducto",
    perfil :dominio+"api/Perfil",
    actualizacionDireccion :dominio+"api/ActualizacionDireccion",
    vistaBailarinas:dominio+"api/BailarinasStore",
    vistaZapatos:dominio+"api/MirarZapatosStore",
    vistaZapatillas:dominio+"api/ZapatillasStore"
}

    


