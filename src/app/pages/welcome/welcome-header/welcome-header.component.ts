import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductFilterService } from 'src/app/services/product-filter/product-filter.service';

@Component({
  selector: 'app-welcome-header',
  templateUrl: './welcome-header.component.html',
  styleUrls: ['./welcome-header.component.css']
})
export class WelcomeHeaderComponent implements OnInit {
  public selectedCategory: string = 'Todos';
  public meny: any[] = [];

  constructor(
    private productFilterService: ProductFilterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rellenarMenu();
    this.selectedCategory = this.productFilterService.selectedCategory;
    this.productFilterService.category$.subscribe(category => {
      this.selectedCategory = category;
    });
  }

  public selectCategory(category: string): void {
    this.productFilterService.selectCategory(category);

    const route = this.getRouteForCategory(category);
    this.router.navigate([route]);
  }

  private getRouteForCategory(category: string): string {
    switch (category.toLowerCase()) {
      case 'zapatos':
        return '/vistaZapatos';
      case 'zapatillas':
        return '/vistaZapatillas';
      case 'botines':
        return '/vistaBotines';
      case 'bailarinas':
        return '/lvistaBailarina';
      case 'tacones':
        return '/vistaTacones';
      default:
        return '/lista_productos';
    }
  }

  rellenarMenu() {
    
    let rolID = sessionStorage.getItem("rolId")
    let nombreRol = sessionStorage.getItem("nombreRol")
    // debugger;
    if(nombreRol==null)
    {
      
      
      
          this.meny =[
          {
            name:"Entrada", target:"TargetEntrada",
            subMenu:[
              {name:"Carrito ",url:"/carrito", incon:"fa fa-fw fa-search text-dark mr-2"},
              {name:"Mis pedidos",url:"/mis-pedidos", incon:"fa fa-fw fa-box text-dark mr-2"},
              {name:"Login",url:"/auth", incon:"fa fa-fw fa-user text-dark mr-3"},                     
                  ]
                  
                },
                  
          ]
    
    }
    
    // debugger;
    switch (nombreRol)
    {
      
      case "Administrador":
        this.meny =[
        {
          name:"Administracion", target:"TargetMantenimiento",
          subMenu:[
                  
                {name:"Cuenta ",url:"/perfil", incon:"fas fa-card"},
                {name:"Dasboard",url:"dasboard/mantenimiento/inicioSidebar", incon:"fas fa-card"},                    
              ]           
              }        
            ]
      break;  
      case "Cliente":
        this.meny =[
        {
          name:"Cliente", target:"TargetCliente",
          subMenu:[
            {name:"Carrito ",url:"/carrito", incon:"fa fa-fw fa-search text-dark mr-2"},
            {name:"Mis pedidos",url:"/mis-pedidos", incon:"fa fa-fw fa-box text-dark mr-2"},
                
                ]
                
              },
          {
            name:"Cuenta", target:"TargetCuenta",
            subMenu:[
              {name:"Cuenta",url:"/perfil", incon:"fa fa-fw fa-user text-dark mr-3"},     
              ]
          }             
        ]
      break;
    }
  }
}
