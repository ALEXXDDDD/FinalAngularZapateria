import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../enviorements/enviorements';
import { HttpClient } from '@angular/common/http';

declare global {
  interface Window {
    Stripe?: any;
  }
}



@Component({
  selector: 'app-pag-pago',
  templateUrl: './pag-pago.component.html',
  styleUrls: ['./pag-pago.component.css']
})

export class PagPagoComponent implements OnInit {
  paymentForm: FormGroup;
  showInfo: boolean = false;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}-\d{4}-\d{4}$/)]],
      cardName: ['', [Validators.required]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  processPayment(): void {
    if (this.paymentForm.valid) {
      const paymentDetails = this.paymentForm.value;
      console.log('Processing payment with details:', paymentDetails);
      // Aquí deberías integrar con tu API de pagos real.
    } else {
      console.log('Formulario inválido');
    }
  }
 
  toggleInfo(): void {
    this.showInfo = !this.showInfo;
  }

}