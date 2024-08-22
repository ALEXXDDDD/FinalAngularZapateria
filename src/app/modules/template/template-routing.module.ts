import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './component/template/template.component';
import { MantEmpleadoListComponent } from '../matenimiento/component/empleado/mant-empleado-list/mant-empleado-list.component';
import { MantRolListComponent } from '../matenimiento/component/rol/mant-rol-list/mant-rol-list.component';
import { MantSalidaMaterialListComponent } from '../matenimiento/component/salidaMaterial/mant-salida-material-list/mant-salida-material-list.component';
import { MantUsuarioListComponent } from '../matenimiento/component/usuario/mant-usuario-list/mant-usuario-list.component';
import { InicioSidebarComponent } from '../matenimiento/component/inicio-sidebar/inicio-sidebar.component';

const routes: Routes = [
  {
    path : '',component:TemplateComponent,
    children:[
      {
        path:'mantenimiento',loadChildren:()=>import("../matenimiento/matenimiento.module").then(x=>x.MatenimientoModule)
      },
      {
        path: 'empleado', component:MantEmpleadoListComponent
      },
      {
        path: 'usuario', component:MantUsuarioListComponent
      },
      {
        path: 'inicioSidebar', component:InicioSidebarComponent
      },
      {
        path: 'saukdaMaterial', component:MantSalidaMaterialListComponent
      },
      {
        path: 'rol', component:MantRolListComponent
      },
      // {
      //   path:'mantenimiento/persona',loadChildren:()=>import("../matenimiento/matenimiento.module").then(x=>x.MatenimientoModule)
      // }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
