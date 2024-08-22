import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headerpasarela',
  templateUrl: './headerpasarela.component.html',
  styleUrls: ['./headerpasarela.component.css']
})
export class HeaderpasarelaComponent  implements OnInit {
  menu = [
    {
      name:'Home',
      icon:'uil uil-estate',
      path:['/'],
      href:null
    },
    {
      name:'Youtube',
      icon:'uil uil-youtube',
      href: '//youtube.com/leifermendez?sub_confirmation=1'
    },
    {
      name:'Github',
      icon:'uil uil-github',
      href:'//github.com/leifermendez'
    },
    {
      name:'Cursos',
      icon:'uil uil-brain',
      href: '//leifermendez.github.io'
    },
    {
      name:'Blog',
      icon:'uil uil-external-link-alt',
      href: '//codigoencasa.com'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}