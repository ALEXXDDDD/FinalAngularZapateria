import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    LoginComponent,
    FormularioUsuarioComponent,

    FormularioRecupClaveComponent
   
  ],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('818272992678-cacnetaor3df10ftd9ldih4ft588ajnb.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('YOUR_FACEBOOK_APP_ID')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ToastModule
    /**
     * TODO: PARA USUAR DOBLE BINDING    
     */
    /* FormsModule,
    ReactiveFormsModule,
    HttpClientModule  */// 

  ]
  
})
export class AuthModule { }
