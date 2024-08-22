import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponseRol } from '../../../models/rol/rol-response.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestRol } from '../../../models/rol/rol-request.model';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { HttpClient } from '@angular/common/http';
import { RolService } from '../../../service/rol.service';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';

@Component({
  selector: 'app-mant-rol-register-multiple',
  templateUrl: './mant-rol-register-multiple.component.html',
  styleUrls: ['./mant-rol-register-multiple.component.css']
})
export class MantRolRegisterMultipleComponent implements OnInit {
  form:FormGroup 
  rolesBack:ResponseRol[]=[]
  
  constructor(
    private fb:FormBuilder,
    private _rolService:RolService
  )
  {
    this.form = this.fb.group({ 
      roles:this.fb.array([
        
      ])
    })
  }
  ngOnInit(): void {
    this._rolService.getAll().subscribe(
      {
        next:(data:ResponseRol[])=>{
          this.rolesBack = data
          this.rolesBack.forEach(X=>{
            let rol = this.nuevoRol(X)
            this.rolesArrayForm.push(rol)
          })
        },
        error:()=>{},
        complete:()=>{}
      }
    )
  }
  get rolesArrayForm ():FormArray{return this.form.get("roles") as FormArray}
  addRoles()
  {
    let rol = this.nuevoRol(new ResponseRol())
    this.rolesArrayForm.push(rol)
  }
  
  nuevoRol(rol:ResponseRol)
  {
    return this.fb.group({
      irol: [{value: rol.irol , disabled:true}],
      nombreRol: [ rol.nombreRol,Validators.required],
      descripRol: [rol.descripRol,Validators.required]
    })
  }
  removeRol(i:number)
  {
    this.rolesArrayForm.removeAt(i)
  }
  save()
  {
    console.log(this.form.getRawValue())
  }
}
