export class RequestVWEmpleado {
    idEmpleado: number= 0;// public int IdEmpleado { get; set; }
    apellidoEmp: string ="";
    salario: number= 0;
    nombrePersona: string="";
    usuario1:string="";
    password:string="";
    email:string="";
    estado:boolean=false;
    tipoPersona: string="";
    tipoDocumento: string="";
    numeroDocumento: string="";
    telefono: string="";
    codigoUbigeo: string="" ;
    direccion: string="" ;
    imagenEmpleado: string="ddd" ;
    
}
export interface RequestVEmpleado {
    idEmpleado: number;
    apellidoEmp: string | null;
    salario: number;
    nombrePersona: string;
    usuario1: string;
    password: string;
    email: string;
    estado: boolean;
    tipoPersona: string;
    tipoDocumento: string;
    numeroDocumento: string;
    telefono: string;
    codigoUbigeo: string | null;
    direccion: string | null;
    imagenEmpleado: string | null;
}
// [StringLength(30)]
// 

// [Column(TypeName = "money")]
// public decimal Salario { get; set; }

// [StringLength(50)]
// public string NombrePersona { get; set; } = null!;

// public string Usuario1 { get; set; } = null!;

// [StringLength(100)]
// public string Password { get; set; } = null!;

// [StringLength(50)]
// public string Email { get; set; } = null!;

// public bool Estado { get; set; }

// [StringLength(30)]
// public string TipoPersona { get; set; } = null!;

// [StringLength(15)]
// public string TipoDocumento { get; set; } = null!;

// [StringLength(20)]
// public string NumeroDocumento { get; set; } = null!;

// [StringLength(15)]
// public string Telefono { get; set; } = null!;

// [StringLength(10)]
// public string? CodigoUbigeo { get; set; }

// [StringLength(50)]
// public string? Direccion { get; set; }

// [StringLength(100)]
// public string? ImagenEmpleado { get; set; }
