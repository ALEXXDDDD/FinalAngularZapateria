import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantRolListComponent } from './component/rol/mant-rol-list/mant-rol-list.component';
import { MantPersonaListComponent } from './component/persona/mant-persona-list/mant-persona-list.component';
import { MantClienteListComponent } from './component/cliente/mant-cliente-list/mant-cliente-list.component';
import { MantEmpleadoListComponent } from './component/empleado/mant-empleado-list/mant-empleado-list.component';
import { MantModeloListComponent } from './component/modelo/mant-modelo-list/mant-modelo-list.component';
import { MantProductoListComponent } from './component/producto/mant-producto-list/mant-producto-list.component';
import { MantMaterialListComponent } from './component/material/mant-material-list/mant-material-list.component';
import { MantEmplAreaListComponent } from './component/empleado/mant-empl-area-list/mant-empl-area-list.component';
import { MantRolRegisterMultipleComponent } from './component/rol/mant-rol-register-multiple/mant-rol-register-multiple.component';
import { MantListProveedorComponent } from './component/proveedor/mant-list-proveedor/mant-list-proveedor.component';
import { MantListOrdenComponent } from './component/orden/mant-list-orden/mant-list-orden.component';
import { MantDetallProduccionListComponent } from './component/detalleProduccion/mant-detall-produccion-list/mant-detall-produccion-list.component';
import { MantSalidaMaterialListComponent } from './component/salidaMaterial/mant-salida-material-list/mant-salida-material-list.component';
import { MantProduccionListComponent } from './component/produccion/mant-produccion-list/mant-produccion-list.component';
import { MantUsuarioListComponent } from './component/usuario/mant-usuario-list/mant-usuario-list.component';
import { InicioSidebarComponent } from './component/inicio-sidebar/inicio-sidebar.component';

const routes: Routes = [
  {
    path: 'rol', component:MantRolListComponent
  },
  {
    path: 'rolMultiple', component:MantRolRegisterMultipleComponent
  },
  {
    path: 'persona', component:MantPersonaListComponent
  }
  ,
  {
    path: 'material', component:MantMaterialListComponent
  },
  {
    path: 'proveedor', component:MantListProveedorComponent
  },
  {
    path: 'inicioSidebar', component:InicioSidebarComponent
  },
  {
    path: 'orden', component:MantListOrdenComponent
  }
  ,
  {
    path: 'empleado', component:MantEmpleadoListComponent
  },
  {
    path: 'producto', component:MantProductoListComponent
  },
  {
    path: 'cliente', component:MantClienteListComponent
  }, 
  {
        path: 'salidaMaterial', component:MantSalidaMaterialListComponent
  },
  
  {
    path: 'produccion', component:MantProduccionListComponent
  },
  {
    path: 'usuario', component:MantUsuarioListComponent
  },
  {
    path: 'modelo', component:MantModeloListComponent
  },
  {
    path: 'empleado-area', component:MantEmplAreaListComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatenimientoRoutingModule { }
