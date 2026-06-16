require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const winston = require('winston');

// Logger Configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({ format: winston.format.simple() })
  ],
});

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  logger.error('CRITICAL: JWT_SECRET environment variable is not defined.');
  process.exit(1);
}

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDB() {
  const client = await pool.connect();
  try {
    logger.info('Initializing PostgreSQL tables...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        worker_id VARCHAR(50) NOT NULL,
        name VARCHAR(255)
      );
      CREATE TABLE IF NOT EXISTS onboarding (
        user_id INTEGER PRIMARY KEY REFERENCES users(id),
        airline VARCHAR(255),
        role VARCHAR(50),
        compliance INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    logger.info('Database tables verified.');
  } catch (err) {
    logger.error('Database initialization failed:', err);
  } finally {
    client.release();
  }
}

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Auth token missing' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid session' });
    req.user = user;
    next();
  });
};

// Routes
app.get('/health', (req, res) => res.json({ status: 'healthy', database: 'connected' }));

app.post('/api/auth/signup', async (req, res) => {
  const { email, password, workerId, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password, worker_id, name) VALUES ($1, $2, $3, $4) RETURNING id, email, name, worker_id',
      [email, hashedPassword, workerId, name]
    );
    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '7d' });
    res.status(201).json({ token, user });
  } catch (err) {
    logger.error('Signup error:', err);
    res.status(400).json({ error: 'User registration failed (likely email already exists)' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '7d' });
    const { password: _, ...safeUser } = user;
    res.json({ token, user: safeUser });
  } catch (err) {
    logger.error('Login error:', err);
    res.status(500).json({ error: 'Authentication service error' });
  }
});

app.post('/api/user/onboarding', authenticateToken, async (req, res) => {
  const { airline, role, compliance } = req.body;
  try {
    await pool.query(
      'INSERT INTO onboarding (user_id, airline, role, compliance) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id) DO UPDATE SET airline = $2, role = $3, compliance = $4',
      [req.user.id, airline, role, compliance]
    );
    res.json({ success: true });
  } catch (err) {
    logger.error('Onboarding error:', err);
    res.status(500).json({ error: 'Failed to save onboarding data' });
  }
});

app.get('/api/wellness/metrics', authenticateToken, (req, res) => {
  // Deterministic metrics for demo
  const score = 70 + (req.user.id % 25);
  res.json({
    score,
    heartRate: 65 + (req.user.id % 10),
    sleepHours: 7.5,
    steps: 8200,
    history: [
      { date: 'Mon', score: 75 }, { date: 'Tue', score: 72 }, { date: 'Wed', score: 80 },
      { date: 'Thu', score: 68 }, { date: 'Fri', score: 85 }, { date: 'Sat', score: 82 },
      { date: 'Sun', score: score }
    ],
    insights: ["✨ Optimal condition for flight duty.", "🛌 Sleep cycle is within healthy range."]
  });
});

initDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    logger.info(`Production API started on port ${PORT}`);
  });
});
