import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasarelaModuleRoutingModule } from './pasarela-module-routing.module';
import { PagPagoComponent } from './pages/pag-pago/pag-pago.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { HeaderpasarelaComponent } from './pages/header-pasarela/headerpasarela/headerpasarela.component';



@NgModule({
  declarations: [
    PagPagoComponent,
    CheckoutPageComponent,
    HeaderpasarelaComponent
  ],
  imports: [
    SharedModule,
    /**
     * TODO: PARA USUAR DOBLE BINDING    
     */
    CommonModule,
    PasarelaModuleRoutingModule
  ]
})
export class PasarelaModuleModule { }
