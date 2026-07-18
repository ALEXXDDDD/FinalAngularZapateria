const http = require('http');

const PORT = process.env.PORT || 3000;
const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || 'APP_USR-8616992314923590-071020-832fbc16e1ef2df68629c19f566ac582-1982564973';

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/api/Orden/mercadoPago' && req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');

        const preferencePayload = {
          items: [
            {
              title: 'Compra en Zapatería',
              quantity: 1,
              unit_price: Number(payload.precioFinal || 0),
            },
          ],
          payer: {
            email: payload.email || 'comprador@example.com',
            name: payload.name || 'Comprador',
            surname: payload.lastname || 'Comprador',
          },
          payment_methods: {
            installments: 6,
          },
          back_urls: {
            success: 'http://localhost:4200/pasarela',
            failure: 'http://localhost:4200/pasarela',
            pending: 'http://localhost:4200/pasarela',
          },
          auto_return: 'approved',
        };

        const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          body: JSON.stringify(preferencePayload),
        });

        const data = await mpResponse.json();

        if (!mpResponse.ok) {
          res.writeHead(mpResponse.status, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: data.message || 'Error creando preferencia', error: data }));
          return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify([{ id: data.id }]))
      } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error interno del servidor', error: error.message }));
      }
    });

    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
});

server.listen(PORT, () => {
  console.log(`Backend de Mercado Pago escuchando en http://localhost:${PORT}`);
});
