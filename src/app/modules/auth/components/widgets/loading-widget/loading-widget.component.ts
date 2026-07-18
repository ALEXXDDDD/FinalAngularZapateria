import { Component, Input } from '@angular/core';
import { LoadStateEnum } from 'src/app/modules/matenimiento/models/core/utils/load-enum';

@Component({
  selector: 'app-loading-widget',
  templateUrl: './loading-widget.component.html',
  styleUrls: ['./loading-widget.component.css']
})
export class LoadingWidgetComponent {
  @Input() state: LoadStateEnum = LoadStateEnum.None;
  @Input() loadingMessage = 'Procesando...';
  @Input() successMessage = '¡Operación completada correctamente!';
  @Input() errorMessage = 'Ocurrió un error. Inténtalo nuevamente.';

  loadStateEnum = LoadStateEnum;
}
