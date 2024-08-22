import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagPagoComponent } from './pages/pag-pago/pag-pago.component';

const routes: Routes = [

  {
    path:'' ,component:PagPagoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasarelaModuleRoutingModule { }
