const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_ROOT = path.resolve(__dirname, '../../');

app.use(helmet());
app.use(cors());

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.use('/main', express.static(path.join(FRONTEND_ROOT, 'mainpage')));
app.use('/auth', express.static(path.join(FRONTEND_ROOT, 'logreg')));
app.use('/assets/img', express.static(path.join(FRONTEND_ROOT, 'img')));
app.use('/assets/fonts', express.static(path.join(FRONTEND_ROOT, 'fonts')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(FRONTEND_ROOT, 'mainpage', 'index.html'));
});

app.get('/login', (_req, res) => {
  res.sendFile(path.join(FRONTEND_ROOT, 'logreg', 'login.html'));
});

app.get('/register', (_req, res) => {
  res.sendFile(path.join(FRONTEND_ROOT, 'logreg', 'register.html'));
});

app.listen(PORT, () => {
  console.log(`ParKing backend server is running on http://localhost:${PORT}`);
});

