import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from 'src/app/pages/welcome/welcome.component';
import { SharedModule } from '../shared/shared.module';
import { FormularioUsuarioComponent } from './components/formulario/formulario-usuario/formulario-usuario.component';
import { FormularioRecupClaveComponent } from './components/formulario/formulario-recup-clave/formulario-recup-clave.component';
import { LoadingWidgetComponent } from './components/widgets/loading-widget/loading-widget.component';



@NgModule({
  declarations: [
    LoginComponent,
    FormularioUsuarioComponent,
    LoadingWidgetComponent,
    FormularioRecupClaveComponent
   
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
    /**
     * TODO: PARA USUAR DOBLE BINDING    
     */
    /* FormsModule,
    ReactiveFormsModule,
    HttpClientModule  */// 

  ]
  
})
export class AuthModule { }
