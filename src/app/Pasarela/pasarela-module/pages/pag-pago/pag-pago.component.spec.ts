import { PagPagoComponent } from './pag-pago.component';

describe('PagPagoComponent', () => {
  it('debe detectar el pago aprobado desde el retorno de Mercado Pago', () => {
    const component = new PagPagoComponent({} as any, {} as any, {} as any, {} as any, {} as any);
    const params = new URLSearchParams('collection_id=123456&collection_status=approved&payment_id=123456&status=approved');

    const resultado = (component as any).hayPagoExitoso(params);

    expect(resultado).toBeTrue();
  });
});
