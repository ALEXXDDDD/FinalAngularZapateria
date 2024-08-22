import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from 'src/app/pages/welcome/welcome.component';
import { FormularioUsuarioComponent } from './components/formulario/formulario-usuario/formulario-usuario.component';

const routes: Routes = [
  {
    path:'' ,component:LoginComponent
  },
  {
    path:'welcome',component:WelcomeComponent //Si es vacio dirigite a este componente

  },
  {
    path:'register',component:FormularioUsuarioComponent //Si es vacio dirigite a este componente
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
