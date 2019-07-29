import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
    `
    .ng-invalid.ng-touched:not(form){
      border: 1px solid red;
    }
    `
  ]
})
export class TemplateComponent {

  usuario: Object ={
    nombre: null,
    apellido: null,
    correo: null,
    pais: "",
    sexo: "Hombre",
    acepta:false
  }

  pais = [{
    codigo:"VZL",
    pais:"Venezuela"
  },{
    codigo: 'COP',
    pais : "Colombia"
  }
]

sexos=["Hombre","Mujer","Sin definir"]


  constructor() { }
  guardar(parametro: NgForm) {
    console.log("forma completa",parametro);
    console.log("valor", parametro.value);
    console.log("valor",this.usuario);
    
    
  }


}
