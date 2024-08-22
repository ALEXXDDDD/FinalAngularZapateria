import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatenimientoRoutingModule } from './matenimiento-routing.module';
import { MantRolListComponent } from './component/rol/mant-rol-list/mant-rol-list.component';
import { MantRolRegistrerComponent } from './component/rol/mant-rol-registrer/mant-rol-registrer.component';
import { MantPersonaRegistrerComponent } from './component/persona/mant-persona-registrer/mant-persona-registrer.component';
import { MantPersonaListComponent } from './component/persona/mant-persona-list/mant-persona-list.component';
import { MantClienteListComponent } from './component/cliente/mant-cliente-list/mant-cliente-list.component';
import { MantClienteRegisterComponent } from './component/cliente/mant-cliente-register/mant-cliente-register.component';
import { MantEmpleadoListComponent } from './component/empleado/mant-empleado-list/mant-empleado-list.component';
import { MantEmpleadoRegisterComponent } from './component/empleado/mant-empleado-register/mant-empleado-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MantModeloListComponent } from './component/modelo/mant-modelo-list/mant-modelo-list.component';
import { MantModeloResgisterComponent } from './component/modelo/mant-modelo-resgister/mant-modelo-resgister.component';
import { MantUnidadResgisterComponent } from './component/unidad/mant-unidad-resgister/mant-unidad-resgister.component';
import { MantUnidadListComponent } from './component/unidad/mant-unidad-list/mant-unidad-list.component';
import { MantProductoRegisterComponent } from './component/producto/mant-producto-register/mant-producto-register.component';
import { MantProductoListComponent } from './component/producto/mant-producto-list/mant-producto-list.component';
import { MantMaterialListComponent } from './component/material/mant-material-list/mant-material-list.component';
import { MantMaterialRegisterComponent } from './component/material/mant-material-register/mant-material-register.component';
import { MantProdModLisComponent } from './component/modelo/mant-prod-mod-lis/mant-prod-mod-lis.component';
import { MantDetallProduccionListComponent } from './component/detalleProduccion/mant-detall-produccion-list/mant-detall-produccion-list.component';
import { MantDetallProduccionRegisterComponent } from './component/detalleProduccion/mant-detall-produccion-register/mant-detall-produccion-register.component';
import { MantEmplAreaListComponent } from './component/empleado/mant-empl-area-list/mant-empl-area-list.component';
import { MantRolRegisterMultipleComponent } from './component/rol/mant-rol-register-multiple/mant-rol-register-multiple.component';
import { MantListProveedorComponent } from './component/proveedor/mant-list-proveedor/mant-list-proveedor.component';
import { MantRegisterProveedorComponent } from './component/proveedor/mant-register-proveedor/mant-register-proveedor.component';
import { MantListOrdenComponent } from './component/orden/mant-list-orden/mant-list-orden.component';
import { MantRegisterOrdenComponent } from './component/orden/mant-register-orden/mant-register-orden.component';
import { MantSalidaMaterialListComponent } from './component/salidaMaterial/mant-salida-material-list/mant-salida-material-list.component';
import { MantSalidaMaterialRegisterComponent } from './component/salidaMaterial/mant-salida-material-register/mant-salida-material-register.component';
import { MantProduccionListComponent } from './component/produccion/mant-produccion-list/mant-produccion-list.component';
import { MantProduccionRegisterComponent } from './component/produccion/mant-produccion-register/mant-produccion-register.component';
import { MantUsuarioListComponent } from './component/usuario/mant-usuario-list/mant-usuario-list.component';
import { MantCreditoListComponent } from './component/credito/mant-credito-list/mant-credito-list.component';
import { MantCreditoRegisterComponent } from './component/credito/mant-credito-register/mant-credito-register.component';
import { MantDetalleCreditoLisComponent } from './component/detalleCredito/mant-detalle-credito-lis/mant-detalle-credito-lis.component';
import { MantDetalleCreditoRegisterComponent } from './component/detalleCredito/mant-detalle-credito-register/mant-detalle-credito-register.component';
import { InicioSidebarComponent } from './component/inicio-sidebar/inicio-sidebar.component';



@NgModule({
  declarations: [
    MantRolListComponent,
    MantRolRegistrerComponent,
    MantPersonaRegistrerComponent,
    MantPersonaListComponent,
    MantClienteListComponent,
    MantClienteRegisterComponent,
    MantEmpleadoListComponent,
    MantEmpleadoRegisterComponent,
    MantModeloListComponent,
    MantModeloResgisterComponent,
    MantUnidadResgisterComponent,
    MantUsuarioListComponent,
    MantUnidadListComponent,
    MantProductoRegisterComponent,
    MantProductoListComponent,
    MantMaterialListComponent,
    MantRolRegisterMultipleComponent,
    MantMaterialRegisterComponent,
    MantProdModLisComponent,
    MantDetallProduccionListComponent,
    MantDetallProduccionRegisterComponent,
    MantEmplAreaListComponent,
    MantListProveedorComponent,
    MantRegisterProveedorComponent,
    MantListOrdenComponent,
    MantRegisterOrdenComponent,
    MantSalidaMaterialListComponent,
    MantSalidaMaterialRegisterComponent,
    MantProduccionListComponent,
    MantProduccionRegisterComponent,
    MantCreditoListComponent,
    MantCreditoRegisterComponent,
    MantDetalleCreditoLisComponent,
    MantDetalleCreditoRegisterComponent,
   
   
  ],
  imports: [
    CommonModule,
    MatenimientoRoutingModule,
    SharedModule
  ]
})
export class MatenimientoModule { }
