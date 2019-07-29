import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Promise, resolve, reject } from 'q';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma: FormGroup;
  usuario: Object = {
    nombreCompleto: {
      nombre: "Jhonny",
      apellido: "Perez"
    },
    correo: "antauri28@gmail.com",
    pasatiempos: ["correr", "dormir", "bailar"]
  }

  constructor() {
    this.forma = new FormGroup({
      nombreCompleto: new FormGroup({
        nombre: new FormControl('', [Validators.required,
        Validators.minLength(3)]),
        apellido: new FormControl('', [Validators.required, this.noJhonny])
      }),
      correo: new FormControl('', [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
      ]),
      pasatiempos: new FormArray([
        new FormControl('correr', Validators.required)
      ]),
      username: new FormControl('', Validators.required, [this.existeusuario]),
      password1: new FormControl('', Validators.required),
      password2: new FormControl()
    });
    // this.forma.setValue(this.usuario);
    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)
    ])

    this.forma.controls['username'].valueChanges
    .subscribe(data =>{
      console.log(data);
    });
    this.forma.controls['username'].statusChanges
    .subscribe(data =>{
      console.log(data);
    });
  }

  guardarCambios() {

    console.log(this.forma.value);
    console.log(this.forma);
    // this.forma.reset();
  }

  noJhonny(control: FormControl): { [s: string]: boolean } {
    if (control.value === "jhonny") {
      return {
        nojhonny: true
      }
      return null
    }
  }
  noIgual(control: FormControl): { [s: string]: boolean } {
    let forma: any = this;
    if (control.value !== this.controls['password2'].value) {
      return {
        noiguales: true
      }
      return null
    }
  }
  existeusuario(control: FormControl): Promise<any> | Observable<any> {
    let promesa = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === "strider") {
            resolve({ existe: true })
          } else {
            resolve(null)
          }
        }, 3000)
      }
    )
    return promesa;
  }

  agregarPasatiempos() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    )
  }



}
