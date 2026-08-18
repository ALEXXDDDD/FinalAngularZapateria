import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { alert_error, alert_sucess, alert_warning } from 'src/app/funcionts/general.funcionts';
import { ResponseVWMaterial } from '../../../models/material/material-responseVW.model';
import { RequestVWProveedor } from '../../../models/proveedor/requestVWProveedor.model';
import { ResponseVWProveedor } from '../../../models/proveedor/responseVWProveedor.model';
import { ResponseUnidad } from '../../../models/unidad/p/unidad-response.model';
import { MaterialService } from '../../../service/material/material.service';
import { ProveedorService } from '../../../service/proveedor/proveedor.service';
import { UnidadService } from '../../../service/unidad/unidad.service';

@Component({
  selector: 'app-mant-register-proveedor',
  templateUrl: './mant-register-proveedor.component.html',
  styleUrls: ['./mant-register-proveedor.component.css']
})
export class MantRegisterProveedorComponent implements OnInit {
  @Input() title: string = '';
  @Input() Proveedor: ResponseVWProveedor = new ResponseVWProveedor();
  @Input() accion: number = 0;
  @Output() closeModalEmmit = new EventEmitter<boolean>();

  myForm: FormGroup;
  envioProveedor: RequestVWProveedor = new RequestVWProveedor();
  materiales: ResponseVWMaterial[] = [];
  unidades: ResponseUnidad[] = [];
  rucConsulta = '';
  buscandoRuc = false;
  proveedorRegistrado = false;

  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private materialService: MaterialService,
    private unidadService: UnidadService
  ) {
    this.myForm = this.fb.group({
      idProvedor: [{ value: 0, disabled: true }],
      idPersona: [{ value: 0, disabled: true }],
      nombrePersona: [{ value: '', disabled: true }, Validators.required],
      tipoPersona: [{ value: 'Juridica', disabled: true }, Validators.required],
      tipoDocumento: [{ value: 'RUC', disabled: true }, Validators.required],
      numeroDocumento: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^\d{11}$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      direccion: ['', [Validators.maxLength(50)]],
      materialEntrega: ['', Validators.required],
      costoMaterialEntrega: [null, [Validators.required, Validators.min(0)]],
      unidadMaterialEntrega: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.listarMateriales();
    this.listarUnidades();

    if (this.accion === AcciontConstants.editar) {
      this.rucConsulta = this.Proveedor.numeroDocumento;
      this.myForm.patchValue({
        ...this.Proveedor,
        telefono: this.Proveedor.telefono.replace(/^\+51/, '')
      });
    }
  }

  buscarRuc(): void {
    if (!/^\d{11}$/.test(this.rucConsulta)) {
      alert_error('Ingrese un RUC valido de 11 digitos.');
      return;
    }

    this.buscandoRuc = true;
    this.proveedorService.buscarProveedorPorRuc(this.rucConsulta).subscribe({
      next: (respuesta) => {
        if (respuesta.api.code !== '200' || respuesta.api.mensaje !== 'OK') {
          alert_error('No se encontro informacion para el RUC ingresado.');
          return;
        }

        if (respuesta.proveedor && respuesta.persona) {
          this.proveedorRegistrado = true;
          this.myForm.patchValue({
            idProvedor: respuesta.proveedor.idProvedor,
            idPersona: respuesta.persona.idPersona,
            nombrePersona: respuesta.persona.nombrePersona,
            tipoPersona: respuesta.persona.tipoPersona,
            tipoDocumento: respuesta.persona.tipoDocumento,
            numeroDocumento: respuesta.persona.numeroDocumento,
            telefono: respuesta.persona.telefono.replace(/^\+51/, ''),
            direccion: respuesta.persona.direccion,
            materialEntrega: respuesta.proveedor.materialEntrega,
            costoMaterialEntrega: respuesta.proveedor.costoMaterialEntrega,
            unidadMaterialEntrega: respuesta.proveedor.unidadMaterialEntrega
          });
          this.bloquearRegistro();
          alert_warning('Proveedor ya creado', undefined, respuesta.message);
          return;
        }

        this.proveedorRegistrado = false;
        this.habilitarRegistro();
        this.myForm.patchValue({
          idProvedor: 0,
          idPersona: 0,
          nombrePersona: respuesta.api.razon_social,
          tipoPersona: 'JURIDICA',
          tipoDocumento: 'RUC',
          numeroDocumento: respuesta.api.ruc,
          telefono: '',
          direccion: respuesta.api.direccion ?? '',
          materialEntrega: '',
          costoMaterialEntrega: null,
          unidadMaterialEntrega: ''
        });
        alert_sucess('Proveedor no creado', 2500, respuesta.message);
      },
      error: () => alert_error('No se pudo consultar el RUC.'),
      complete: () => this.buscandoRuc = false
    });
  }

  listarMateriales(): void {
    this.materialService.getAll().subscribe({
      next: materiales => this.materiales = materiales,
      error: () => alert_error('No se pudieron cargar los materiales.')
    });
  }

  private bloquearRegistro(): void {
    ['telefono', 'direccion', 'materialEntrega', 'costoMaterialEntrega', 'unidadMaterialEntrega']
      .forEach(campo => this.myForm.get(campo)?.disable());
  }

  private habilitarRegistro(): void {
    ['telefono', 'direccion', 'materialEntrega', 'costoMaterialEntrega', 'unidadMaterialEntrega']
      .forEach(campo => this.myForm.get(campo)?.enable());
  }

  listarUnidades(): void {
    this.unidadService.getAll().subscribe({
      next: unidades => this.unidades = unidades,
      error: () => alert_error('No se pudieron cargar las unidades.')
    });
  }

  guardar(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const formulario = this.myForm.getRawValue();
    this.envioProveedor = {
      ...formulario,
      telefono: `+51${formulario.telefono}`
    } as RequestVWProveedor;

    if (this.accion === AcciontConstants.crear) {
      this.crearProveedor();
    } else if (this.accion === AcciontConstants.editar) {
      this.editarProveedor();
    }
  }

  crearProveedor(): void {
    this.proveedorService.create(this.envioProveedor).subscribe({
      next: () => {
        alert_sucess('Proveedor registrado correctamente.');
        this.cerrarModal(true);
      },
      error: () => alert_error('No se pudo registrar el proveedor.')
    });
  }

  editarProveedor(): void {
    this.proveedorService.update(this.envioProveedor).subscribe({
      next: () => {
        alert_sucess('Proveedor actualizado correctamente.');
        this.cerrarModal(true);
      },
      error: () => alert_error('No se pudo guardar el proveedor.')
    });
  }

  cerrarModal(resultado: boolean): void {
    this.closeModalEmmit.emit(resultado);
  }
}
