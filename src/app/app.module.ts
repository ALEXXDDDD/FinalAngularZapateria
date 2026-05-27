import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { PruebaComponent } from './pages/prueba/prueba.component';
import { NotFoudComponent } from './pages/not-foud/not-foud.component';
import { WelcomeComponent } from './pages/welcome/welcome.component'
import { AuthInterceptor } from './services/auth.interceptor';
import { WelcomeHeaderComponent } from './pages/welcome/welcome-header/welcome-header.component';
import { SinPermisoComponent } from './pages/sinPermiso/sin-permiso/sin-permiso.component';
import { MantRolRegisterMultipleComponent } from './modules/matenimiento/component/rol/mant-rol-register-multiple/mant-rol-register-multiple.component';
import { ServiceRolComponent } from './service-rol/service-rol.component';
import { CarritoComprasComponent } from './Ventas/component/carrito-compras/carrito-compras.component';
import { ListarDetalleComponent } from './Ventas/component/listar-detalle/listar-detalle.component';
import { ButtonModule } from 'primeng/button';
import { ProductoComponent } from './Ventas/component/vistas/producto/producto.component';
import { VistZapatillaComponent } from './Ventas/component/vistas/vist-zapatilla/vist-zapatilla.component';
import { VistModelosComponent } from './Ventas/component/vistas/vist-modelos/vist-modelos.component';
import { VistEmpresaComponent } from './Ventas/component/vistas/vist-empresa/vist-empresa.component';
import { VistContactoComponent } from './Ventas/component/vistas/vist-contacto/vist-contacto.component';
import { VistProductoComponent } from './Ventas/component/vistas/vist-producto/vist-producto.component';
import { VistBailarinaComponent } from './Ventas/component/vistas/mod-bailarinas/vist-bailarina/vist-bailarina.component';
import { VistaZapatoComponent } from './Ventas/component/vistas/vist-zapato/vista-zapato/vista-zapato.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule, DatePipe } from '@angular/common';
import { TemplateRoutingModule } from './modules/template/template-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { PerfilListComponent } from './pages/perfil/perfil-list/perfil-list.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { PasarelaModuleModule } from './Pasarela/pasarela-module/pasarela-module.module';
import { ChatBotModule } from './chat-bot/chat-bot.module';
import { ChatPagesComponent } from './chat-bot/chat-pages/chat-pages.component';
import { WelcomeBodyComponent } from './pages/welcome/welcome-body/welcome-body/welcome-body.component';
import { InicioSidebarComponent } from './modules/matenimiento/component/inicio-sidebar/inicio-sidebar.component';
import { ApiMapsGoogleComponent } from './Ventas/component/maps-google/api-maps-google/api-maps-google.component';
import { WelcomeFooterComponent } from './pages/welcome/welcome-footer/welcome-footer/welcome-footer.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast'; 

import { GoogleMapsModule } from '@angular/google-maps';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { EnvioDomicilioComponent } from './Ventas/component/vistas/envio-domicilio/envio-domicilio.component';


@NgModule({
  declarations: [
    AppComponent,
    PruebaComponent,
    NotFoudComponent,
    VistEmpresaComponent,
    VistContactoComponent,
    
    ProductoComponent,
    WelcomeComponent,
    WelcomeHeaderComponent,
    ChatPagesComponent,
    VistBailarinaComponent,
    VistZapatillaComponent,
    ListarDetalleComponent,
    CarritoComprasComponent,
    SinPermisoComponent,
    ServiceRolComponent,
    VistaZapatoComponent,
    PerfilListComponent,
    WelcomeBodyComponent,
    ApiMapsGoogleComponent,
    WelcomeFooterComponent
   
  ],
  imports: [
    SharedModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    ToastModule ,
    ModalModule.forRoot(),
    AppRoutingModule,
    /**
     * TODO: PARA USUAR DOBLE BINDING    
     */
    FormsModule,
    DatePipe,
    OAuthModule.forRoot(),
    HttpClientModule,
    SocialLoginModule
      
  ],

  schemas:  [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
      
    
    
    } ,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('818272992678-0n17gkh83hg7vh176r94rrigdcuqql8i.apps.googleusercontent.com') // Reemplaza con tu Google Client ID
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('FACEBOOK_APP_ID') // Reemplaza con tu Facebook App ID
          }
        ]
      } as SocialAuthServiceConfig,
    },
    MessageService 

  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
function provideFirebaseApp(arg0: () => any): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

function initializeApp(arg0: { projectId: string; appId: string; storageBucket: string; locationId: string; apiKey: string; authDomain: string; messagingSenderId: string; measurementId: string; }): any {
  throw new Error('Function not implemented.');
}

function provideStorage(arg0: () => any): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

