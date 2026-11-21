const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'ADS STORE' });
});

// Demo only: real orders and payments are not connected yet.
app.post('/api/orders', (_req, res) => {
  res.status(501).json({
    error: 'Заказы и оплата пока не подключены. Это демонстрационная версия.'
  });
});

app.listen(PORT, () => {
  console.log(`ADS STORE is running on port ${PORT}`);
});
