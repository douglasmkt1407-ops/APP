import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

const DB_FILE = path.join(__dirname, 'data', 'database.json');

// Ensure database file and directory exist
function initDb() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      accounts: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

initDb();

function loadDb(): { accounts: any[] } {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.accounts)) {
      return parsed;
    }
  } catch (err) {
    console.error('Erro ao ler banco de dados JSON:', err);
  }
  return { accounts: [] };
}

function saveDb(data: { accounts: any[] }) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Erro ao gravar no banco de dados JSON:', err);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // CORS headers if accessed across domains
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // API ROUTES
  app.get('/api/health', (req, res) => {
    const db = loadDb();
    res.json({
      status: 'ok',
      accountsCount: db.accounts.length,
      timestamp: new Date().toISOString()
    });
  });

  // Get list of public accounts (without passwords)
  app.get('/api/accounts', (req, res) => {
    const db = loadDb();
    const list = db.accounts.map(acc => ({
      id: acc.id,
      email: acc.email,
      name: acc.name,
      targetExam: acc.targetExam,
      avatarUrl: acc.avatarUrl || '',
      lastActive: acc.lastActive
    }));
    res.json(list);
  });

  // Register account
  app.post('/api/auth/register', (req, res) => {
    const { email, password, name, targetExam } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: 'Dados incompletos para cadastro.' });
    }

    const normEmail = String(email).trim().toLowerCase();
    const cleanPassword = String(password).trim();
    const cleanName = String(name).trim();
    const cleanTarget = String(targetExam || '').trim() || 'Concurso Técnico em Enfermagem / EBSERH';

    const db = loadDb();
    const existing = db.accounts.find(a => a.email.toLowerCase() === normEmail);

    if (existing) {
      // If already registered with the same password, perform successful login
      if (String(existing.password).trim() === cleanPassword) {
        existing.lastActive = new Date().toISOString();
        if (cleanName && (!existing.name || existing.name === 'Estudante de Enfermagem')) {
          existing.name = cleanName;
        }
        saveDb(db);
        return res.json({
          success: true,
          account: existing,
          message: 'Conta encontrada no banco de dados. Bem-vindo de volta!'
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Este e-mail já está cadastrado no banco de dados. Por favor, faça login com sua senha na aba Entrar.'
      });
    }

    const newAccount = {
      id: 'user_' + Date.now(),
      email: normEmail,
      password: cleanPassword,
      name: cleanName || 'Estudante de Enfermagem',
      targetExam: cleanTarget,
      avatarUrl: '',
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      stats: {
        cardsReviewedCount: 0,
        questionsAnsweredCount: 0,
        questionsCorrectCount: 0,
        consecutiveDays: 0,
        studyTimeHours: 0.0,
        simuladosAttempts: [],
        reviewedCardIds: [],
        masteredCardIds: [],
        readSummaryIds: [],
        completedDailyTasks: [],
        sprintProgress: {},
        dailyStudyHistory: {}
      },
      dailyGoals: [],
      dailyGoalsDate: new Date().toISOString().slice(0, 10),
      notifications: {}
    };

    db.accounts.push(newAccount);
    saveDb(db);

    return res.json({
      success: true,
      account: newAccount
    });
  });

  // Login account
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Informe o e-mail cadastrado.' });
    }

    const normEmail = String(email).trim().toLowerCase();
    const cleanPassword = String(password || '').trim();
    const db = loadDb();
    const account = db.accounts.find(a => a.email.toLowerCase() === normEmail);

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'E-mail não encontrado no banco de dados central. Crie sua conta na aba Cadastrar.'
      });
    }

    if (!cleanPassword) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, digite sua senha de acesso.'
      });
    }

    if (String(account.password).trim() !== cleanPassword) {
      return res.status(401).json({
        success: false,
        message: 'Senha incorreta. Verifique suas credenciais e tente novamente.'
      });
    }

    account.lastActive = new Date().toISOString();
    saveDb(db);

    return res.json({
      success: true,
      account
    });
  });

  // Lookup saved account by email to restore remembered credentials
  app.post('/api/auth/lookup', (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'E-mail não fornecido.' });
    }

    const normEmail = String(email).trim().toLowerCase();
    const db = loadDb();
    const account = db.accounts.find(a => a.email.toLowerCase() === normEmail);

    if (!account) {
      return res.json({ success: false, found: false });
    }

    return res.json({
      success: true,
      found: true,
      account: {
        id: account.id,
        email: account.email,
        name: account.name,
        targetExam: account.targetExam,
        password: account.password,
        avatarUrl: account.avatarUrl || ''
      }
    });
  });

  // Change / reset password
  app.post('/api/auth/change-password', (req, res) => {
    const { email, newPassword } = req.body;
    if (!email || !newPassword || newPassword.length < 3) {
      return res.status(400).json({ success: false, message: 'Senha inválida ou e-mail ausente.' });
    }

    const normEmail = email.trim().toLowerCase();
    const db = loadDb();
    const index = db.accounts.findIndex(a => a.email.toLowerCase() === normEmail);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Conta não encontrada para este e-mail.' });
    }

    db.accounts[index].password = String(newPassword).trim();
    db.accounts[index].lastActive = new Date().toISOString();
    saveDb(db);

    return res.json({
      success: true,
      message: 'Senha atualizada com sucesso no banco de dados!'
    });
  });

  // Fetch full account by email
  app.get('/api/user/:email', (req, res) => {
    const normEmail = req.params.email.trim().toLowerCase();
    const db = loadDb();
    const account = db.accounts.find(a => a.email.toLowerCase() === normEmail);

    if (!account) {
      return res.status(404).json({ success: false, message: 'Conta não encontrada.' });
    }

    return res.json({ success: true, account });
  });

  // Save / Sync account data
  app.post('/api/user/:email/sync', (req, res) => {
    const normEmail = req.params.email.trim().toLowerCase();
    const payload = req.body;
    const db = loadDb();
    const index = db.accounts.findIndex(a => a.email.toLowerCase() === normEmail);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Conta não encontrada para sincronizar.' });
    }

    const current = db.accounts[index];
    db.accounts[index] = {
      ...current,
      ...payload,
      email: normEmail,
      lastActive: new Date().toISOString()
    };

    saveDb(db);
    return res.json({ success: true, message: 'Dados salvos com sucesso no banco de dados!' });
  });

  // VITE OR STATIC SERVING
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[NEXTENF] Servidor Full-Stack rodando na porta ${PORT} (Prod: ${isProduction})`);
  });
}

startServer().catch(err => {
  console.error('[NEXTENF] Erro fatal ao iniciar o servidor:', err);
});
