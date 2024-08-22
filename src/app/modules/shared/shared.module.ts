import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CrudService } from './services/crud.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { LoadingWidgetComponent } from '../auth/components/widgets/loading-widget/loading-widget.component';




@NgModule({
  declarations: [

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    HttpClientModule
  ],
  exports:[
    FormsModule,
    ModalModule,
    PaginationModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
