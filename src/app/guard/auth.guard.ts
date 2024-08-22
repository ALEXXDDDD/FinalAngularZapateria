import { CanActivateFn } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  
  let token = sessionStorage.getItem("token")
  if(!token)
  {
    alert("Guardian=> No iniciaste sesion")
    return false;
  }
  return true;
};
