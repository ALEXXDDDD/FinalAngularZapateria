import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponseProducto } from '../../../models/producto/producto-response.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestProducto } from '../../../models/producto/producto-request.model';
import { ProductoService } from '../../../service/producto/producto.service';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';
import { RequestVProducto } from '../../../models/producto/requestVProducto.model';
import { ModeloService } from '../../../service/modelo/modelo.service';
import { ResponseModelo } from '../../../models/modelo/modelo-response.model';
import { UnidadService } from '../../../service/unidad/unidad.service';
import { ResponseUnidad } from '../../../models/unidad/p/unidad-response.model';
import { ResponseDetalleProducto } from '../../../models/producto/producto-responseDetalleProducto.model';
import { ResponseVDetalleProducto } from '../../../models/producto/producto-responseVDetalle.model';

@Component({
  selector: 'app-mant-producto-register',
  templateUrl: './mant-producto-register.component.html',
  styleUrls: ['./mant-producto-register.component.css']
})
export class MantProductoRegisterComponent implements OnInit {
  
  /**
   * TODO: Declaracion INPUT SALIDAS
   */

  @Input () title : string = ""
  @Input ( ) producto : ResponseProducto = new ResponseProducto()
  @Input () accion : number = 0
  /**
   * TODO: Declaracion OUPUT ENTRADAS 
   */
  @Output () closeModalEmmit  = new EventEmitter<boolean>()
  /**
   * TODO: Declaracion PARA EL FORMULARIO
   */
  myForm : FormGroup

  responseProducto : ResponseProducto [] =[]
  responseModelo : ResponseModelo[]=[]  
  responseUnidad : ResponseUnidad []= [] 
  responseUnidadPares : ResponseUnidad []=[];
  envioProducto : RequestProducto = new RequestProducto()
  envioSelectProducto : RequestProducto = new RequestProducto()
  detalleProducto: ResponseVDetalleProducto | null = null;
  previewImagen: string | null = null;

  constructor
  (
    private fb:FormBuilder,
    private _productoService : ProductoService,
    private _modeloService : ModeloService,
    private _unidadService:UnidadService
  )
  {
    this.myForm = this.fb.group
    (
      {
      idProducto: [{value:0,disabled:true}],
      idModelo: [{value:0,disabled:true}],
      nombreProd:[null],
      codigoProd:[{value:'',disabled:true}],
      nombreUnidad:[null],
      nombreModelo:[null],
      precioUnitario: [null],
      stock: [0],
      estadoProducto: [null],
      idUnidad: [null,],
      fotografia:["null"],
      color:[null],
      categoria:[null],
      talla: [null],
      descripcion:[null],
      idDetalleProducto: [{value:0,disabled:true}],
      }
    )
  }

  // En tu componente Angular al seleccionar el archivo <input type="file" (change)="onFileSelected($event)">
onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const mimeType = dataUrl.split(';')[0].split(':')[1] || 'image/png';
      const base64String = dataUrl.split(',')[1];
      const normalizedImage = `data:${mimeType};base64,${base64String}`;
      this.previewImagen = normalizedImage;
      this.myForm.patchValue({
        fotografia: normalizedImage
      });
    };
    reader.readAsDataURL(file);
  }
}

  private convertirImagenABinary(dataUrl: string): string {
    if (!dataUrl) {
      return '';
    }

    if (typeof dataUrl === 'string' && dataUrl.startsWith('data:image')) {
      return dataUrl.split(',')[1] || '';
    }

    if (typeof dataUrl === 'string' && /^[A-Za-z0-9+/=]+$/.test(dataUrl.trim())) {
      return dataUrl.trim();
    }

    return '';
  }
  /**
   * Auto generar código de producto: PRODUCT-CAT-COLOR
   * Ej: PRODUCT-ZAP-ROJO
   */
  generarCodigoProducto() {
    const categoria = this.myForm.get('nombreModelo')?.value || '';
    const color = this.myForm.get('color')?.value || '';
    
    if (categoria && color) {
      // Tomar 3 primeras letras de categoría en mayúscula
      const catAbreviada = categoria.substring(0, 3).toUpperCase();
      const colorAbreviado = color.substring(0, 3).toUpperCase();
      const codigoGenerado = `PRODUCT-${catAbreviada}-${colorAbreviado}`;
      
      // Establecer el código sin emitir eventos para evitar bucles
      this.myForm.get('codigoProd')?.setValue(codigoGenerado, { emitEvent: false });
    }
  }
  listarModelos()
  {

      this._modeloService.getAll().subscribe(
        {
          next:(data:ResponseModelo[])=>{
            this.responseModelo = data
            console.log("Modelo",data)
          },
          error:()=>{},
          complete:()=>{}
        }
      )
  }
  crearProducto(payload: RequestProducto)
  {
    const categoria = this.myForm.get('nombreModelo')?.value || '';
    payload.categoria = categoria;
    payload.estadoProducto = true;
    payload.nombreUnidad = 'PARES';
    payload.idUnidad = payload.idUnidad || 0;
    this._productoService.create(payload).subscribe
    (
      {
        next:() => {
          alert_sucess("Se ha Actualizado correctamente");
          this.cerrarModal(true);
        },
        error:() => {},
        complete:() => {}
      }
    )
  }
  editarProducto(payload: RequestProducto)
  {
    this._productoService.update(payload).subscribe
    (
      {
        next:() => {
          alert_sucess("Se ha Actualizado correctamente");
          this.cerrarModal(true);
        },
        error:() => {
          alert_error("No se pudo guardar el producto")
        },
        complete:() => {
          window.location.reload();
        }
      }
    )
  }
  construirPayloadParaGuardar(): RequestProducto {
    const formValue = this.myForm.getRawValue();
    const payload = new RequestProducto();

    const stock = this.accion === AcciontConstants.crear
      ? 0
      : (this.normalizarNumero(formValue.stock, this.producto?.stock) ?? 0);

    const precioUnitario = this.normalizarNumero(formValue.precioUnitario, this.producto?.precioUnitario) ?? 0;
    const idUnidad = this.normalizarNumero(formValue.idUnidad, this.producto?.idUnidad) ?? 0;

    payload.idProducto = this.accion === AcciontConstants.editar ? (this.producto?.idProducto ?? formValue.idProducto ?? 0) : (formValue.idProducto ?? 0);
    payload.nombreProd = formValue.nombreProd || this.producto?.nombreProd || '';
    payload.codigoProd = formValue.codigoProd || this.producto?.codigoProd || '';
    payload.precioUnitario = precioUnitario;
    payload.nombreModelo = formValue.nombreModelo || this.producto?.nombreModelo || '';
    payload.stock = stock;
    payload.estadoProducto = this.accion === AcciontConstants.crear ? true : (this.producto?.estadoProducto ?? formValue.estadoProducto ?? true);
    payload.idUnidad = idUnidad;
    payload.nombreUnidad = formValue.nombreUnidad || this.producto?.nombreUnidad || '';
    payload.categoria = formValue.categoria || formValue.nombreModelo || this.producto?.categoria || this.producto?.nombreModelo || '';

    const fotografiaValue = formValue.fotografia || this.producto?.fotografia || '';
    payload.fotografia = this.convertirImagenABinary(fotografiaValue);

    const color = this.normalizarTexto(formValue.color, this.detalleProducto?.color);
    const talla = this.normalizarTexto(formValue.talla, this.detalleProducto?.talla);
    const descripcion = this.normalizarTexto(formValue.descripcion, this.detalleProducto?.descripcion);

    if (color !== null) {
      payload.color = color;
    }
    if (talla !== null) {
      payload.talla = talla;
    }
    if (descripcion !== null) {
      payload.descripcion = descripcion;
    }

    if (this.detalleProducto?.idDetalleProducto) {
      payload.idDetalleProducto = this.detalleProducto.idDetalleProducto;
    } else if (formValue.idDetalleProducto) {
      payload.idDetalleProducto = formValue.idDetalleProducto;
    }

    return payload;
  }

  private normalizarNumero(valor: any, fallback: number | undefined): number | null {
    if (valor === null || valor === undefined || valor === '') {
      return fallback ?? null;
    }

    const numero = Number(valor);
    return Number.isNaN(numero) ? (fallback ?? null) : numero;
  }

  private normalizarTexto(valor: any, fallback?: string | null): string | null {
    if (valor === null || valor === undefined || valor === '') {
      return fallback ?? null;
    }

    return String(valor).trim();
  }

  private configurarModoFormulario() {
    if (this.accion === AcciontConstants.editar) {
      this.myForm.get('nombreModelo')?.disable({ emitEvent: false });
      this.myForm.get('talla')?.disable({ emitEvent: false });
      this.myForm.get('idUnidad')?.disable({ emitEvent: false });
      this.myForm.get('color')?.disable({ emitEvent: false });
      // this.myForm.get('stock')?.disable({ emitEvent: false });
      this.myForm.get('descripcion')?.disable({ emitEvent: false });
      this.previewImagen = this.getImagenUrl(this.producto?.fotografia);
    } else {
      this.myForm.get('nombreModelo')?.enable({ emitEvent: false });
      this.myForm.get('talla')?.enable({ emitEvent: false });
      this.myForm.get('idUnidad')?.enable({ emitEvent: false });
      this.myForm.get('descripcion')?.enable({ emitEvent: false });
      this.previewImagen = null;
    }
  }

  getImagenUrl(fotografia: string | null | undefined): string {
    if (!fotografia) {
      return 'assets/img/img_Template/no-image.png';
    }

    if (typeof fotografia === 'string') {
      let valor = fotografia.trim().replace(/^['"]|['"]$/g, '');

      if (!valor) {
        return 'assets/img/img_Template/no-image.png';
      }

      if (valor.startsWith('data:image')) {
        return valor;
      }

      if (valor.startsWith('http://') || valor.startsWith('https://')) {
        return valor;
      }

      if (valor.includes('base64,')) {
        return valor;
      }

      if (valor.startsWith('/9j/') || valor.startsWith('9j/')) {
        const payload = valor.replace(/^\/+/, '');
        return `data:image/jpeg;base64,${payload}`;
      }

      if (valor.startsWith('iVBOR')) {
        return `data:image/png;base64,${valor}`;
      }

      if (valor.startsWith('/assets') || valor.startsWith('/img') || valor.startsWith('assets/')) {
        return valor;
      }

      const cleaned = valor.replace(/\s+/g, '');
      if (/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(cleaned) && cleaned.length > 20) {
        const mime = cleaned.startsWith('iVBOR') ? 'image/png' : 'image/jpeg';
        return `data:${mime};base64,${cleaned}`;
      }

      return '/assets/img/img_Template/no-image.png';
    }

    return 'assets/img/img_Template/no-image.png';
  }

  guardar()
  {
    if (this.accion === 2) {
      const stock = Number(this.myForm.get('stock')?.value);
      if (stock <= 0) {
        alert_error("El stock debe ser mayor a 0 en edición");
        return;
      }
    }

    if (this.accion === 1) {
      this.myForm.get('stock')?.setValue(0, { emitEvent: false });
    }

    const payload = this.construirPayloadParaGuardar();
    console.log("✅ Datos a enviar:", payload);
    
    switch(this.accion)
    {
      case AcciontConstants.crear :
        this.crearProducto(payload)
      break;
      case AcciontConstants.editar :
        this.editarProducto(payload)
      break;
      case AcciontConstants.eliminar :
        
      break;
    }
  }
  ngOnInit(): void {
    this.listarUnidad()
    this.listarModelos()
    
    if (this.accion === AcciontConstants.crear) {
      this.myForm.get('stock')?.setValue(0, { emitEvent: false });
    } else {
      this.myForm.patchValue(this.producto);
      this.cargarDatosDetalleProducto();
    }

    this.configurarModoFormulario();

    // Escuchar cambios de categoría para auto generar código
    this.myForm.get('nombreModelo')?.valueChanges.subscribe(() => {
      this.generarCodigoProducto();
    });

    // Escuchar cambios de color para auto generar código
    this.myForm.get('color')?.valueChanges.subscribe(() => {
      this.generarCodigoProducto();
    });

    // Generar código inicial
    this.generarCodigoProducto();
  }
  cerrarModal(res:boolean)
  {
    this.closeModalEmmit.emit(res)
    //true Hubo modificacion en la base de datos
    

    //false => No hubo modificacion de la base de datos
  }
  cargarDatosDetalleProducto() {
    if (!this.producto?.idProducto) {
      return;
    }

    this._productoService.getById(this.producto.idProducto).subscribe({
      next: (data: ResponseDetalleProducto[]) => {
        const detalle = data?.[0]?.detalleProducts?.[0];
        if (!detalle) {
          return;
        }

        this.detalleProducto = detalle;
        this.myForm.patchValue({
          color: detalle.color || null,
          categoria: detalle.categoria || null,
          talla: detalle.talla || null,
          descripcion: detalle.descripcion || null,
          idDetalleProducto: detalle.idDetalleProducto || 0,
          nombreModelo: detalle.categoria || this.producto?.nombreModelo || null,
          idModelo: detalle.idModelo || null
        }, { emitEvent: false });

        if (!this.myForm.get('codigoProd')?.value) {
          this.myForm.get('codigoProd')?.setValue(this.producto.codigoProd || '', { emitEvent: false });
        }
      },
      error: () => {}
    });
  }

  listarUnidad ()
  {
    this._unidadService.getAll().subscribe(
      {
        next:(data:ResponseUnidad[])=>{
          this.responseUnidad=data;
          // Filtrar solo unidades con ID par
          this.responseUnidadPares = data.filter(u => u.idUnidad % 2 === 0);
        }
      }
    )
  }
}
