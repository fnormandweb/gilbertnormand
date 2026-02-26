import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import crypto from 'crypto'
import initSqlJs from 'sql.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

// Identifiants admin (en production, définir ADMIN_USER et ADMIN_PASSWORD dans .env)
const ADMIN_USER = (process.env.ADMIN_USER || 'admin').trim()
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || 'admin').trim()
const SESSION_COOKIE = 'admin_session'
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000 // 7 jours
const sessions = new Map() // token -> { createdAt }

function parseCookie(header) {
  if (!header) return {}
  return Object.fromEntries(
    header.split(';').map((s) => {
      const i = s.indexOf('=')
      return [s.slice(0, i).trim(), (s.slice(i + 1) || '').trim()]
    }),
  )
}

function requireAuth(req, res, next) {
  const cookie = parseCookie(req.headers.cookie)
  const token = cookie[SESSION_COOKIE]
  const session = token && sessions.get(token)
  if (session) {
    if (Date.now() - session.createdAt > SESSION_MAX_AGE_MS) {
      sessions.delete(token)
      return res.status(401).json({ error: 'Session expirée' })
    }
    return next()
  }
  return res.status(401).json({ error: 'Non autorisé' })
}

app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: '2mb' }))

let db = null

async function getDb() {
  if (db) return db
  const SQL = await initSqlJs()
  const dataDir = join(__dirname, 'data')
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true })
  const dbPath = process.env.DB_PATH || join(dataDir, 'gilbert.db')
  if (existsSync(dbPath)) {
    db = new SQL.Database(readFileSync(dbPath))
  } else {
    db = new SQL.Database()
  }
  db.run(`
    CREATE TABLE IF NOT EXISTS content (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `)
  return db
}

function saveDb() {
  if (!db) return
  const dataDir = join(__dirname, 'data')
  const dbPath = process.env.DB_PATH || join(dataDir, 'gilbert.db')
  writeFileSync(dbPath, Buffer.from(db.export()))
}

function getContent(key) {
  const database = db
  const stmt = database.prepare('SELECT value FROM content WHERE key = ?')
  stmt.bind([key])
  if (!stmt.step()) {
    stmt.free()
    return null
  }
  const val = stmt.get()[0]
  stmt.free()
  if (val == null) return null
  try {
    return JSON.parse(val)
  } catch {
    return val
  }
}

function setContent(key, value) {
  const json = JSON.stringify(value)
  db.run('INSERT OR REPLACE INTO content (key, value) VALUES (?, ?)', [
    key,
    json,
  ])
  saveDb()
}

async function seedIfEmpty() {
  const { defaultTimeline, defaultGallery, defaultTexts, defaultFamille } =
    await import('./seed-defaults.js')
  let seeded = false
  if (
    !getContent('timeline') ||
    (Array.isArray(getContent('timeline')) &&
      getContent('timeline').length === 0)
  ) {
    setContent('timeline', defaultTimeline)
    setContent('gallery', defaultGallery)
    setContent('texts', defaultTexts)
    seeded = true
  }
  const famille = getContent('famille')
  if (!famille || !famille.persons || famille.persons.length === 0) {
    if (defaultFamille) setContent('famille', defaultFamille)
    seeded = true
  }
  if (seeded)
    console.log('Base SQLite initialisée avec les données par défaut.')
}

// --- API routes ---

app.get('/api/timeline', (req, res) => {
  try {
    const data = getContent('timeline')
    res.json(data || [])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/timeline', requireAuth, (req, res) => {
  try {
    const body = Array.isArray(req.body) ? req.body : req.body.data
    if (!Array.isArray(body))
      return res.status(400).json({ error: 'Body must be an array' })
    setContent('timeline', body)
    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/gallery', (req, res) => {
  try {
    const data = getContent('gallery')
    res.json(data || [])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/gallery', requireAuth, (req, res) => {
  try {
    const body = Array.isArray(req.body) ? req.body : req.body.data
    if (!Array.isArray(body))
      return res.status(400).json({ error: 'Body must be an array' })
    setContent('gallery', body)
    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/texts', (req, res) => {
  try {
    const data = getContent('texts')
    res.json(data || {})
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/texts', requireAuth, (req, res) => {
  try {
    const body =
      req.body && typeof req.body === 'object' ? req.body : req.body?.data
    if (!body || typeof body !== 'object')
      return res.status(400).json({ error: 'Body must be an object' })
    setContent('texts', body)
    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/famille', (req, res) => {
  try {
    const data = getContent('famille')
    res.json(data || { generations: [], persons: [] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/famille', requireAuth, (req, res) => {
  try {
    const body =
      req.body && typeof req.body === 'object' ? req.body : req.body?.data
    if (!body || typeof body !== 'object')
      return res.status(400).json({ error: 'Body must be an object' })
    const ok = Array.isArray(body.generations) && Array.isArray(body.persons)
    if (!ok)
      return res
        .status(400)
        .json({
          error: 'Body must have generations (array) and persons (array)',
        })
    setContent('famille', {
      generations: body.generations,
      persons: body.persons,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/health', (req, res) => {
  try {
    if (!db) return res.status(503).json({ ok: false, error: 'DB not ready' })
    res.json({ ok: true, db: 'sqlite' })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
})

// --- Auth (accès admin) ---
app.get('/api/me', (req, res) => {
  const cookie = parseCookie(req.headers.cookie)
  const token = cookie[SESSION_COOKIE]
  const session = token && sessions.get(token)
  if (session && Date.now() - session.createdAt <= SESSION_MAX_AGE_MS) {
    return res.json({ ok: true })
  }
  return res.status(401).json({ error: 'Non connecté' })
})

app.post('/api/login', (req, res) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {}
  const user = typeof body.user === 'string' ? body.user.trim() : ''
  const password = typeof body.password === 'string' ? body.password : ''
  if (user !== ADMIN_USER || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Identifiants incorrects' })
  }
  const token = crypto.randomBytes(24).toString('hex')
  sessions.set(token, { createdAt: Date.now() })
  res.cookie(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE_MS,
    path: '/',
  })
  res.json({ ok: true })
})

app.post('/api/logout', (req, res) => {
  const cookie = parseCookie(req.headers.cookie)
  const token = cookie[SESSION_COOKIE]
  if (token) sessions.delete(token)
  res.clearCookie(SESSION_COOKIE, { path: '/' })
  res.json({ ok: true })
})

// Servir l'admin à /admin/ (build avec VITE_BUILD_FOR_API=1)
const adminDist = join(__dirname, '..', 'site-web-admin', 'dist')
app.use('/admin', (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  next()
})
app.use('/admin', express.static(adminDist))
app.get('/admin', (req, res) => res.sendFile(join(adminDist, 'index.html')))
app.get('/admin/*', (req, res) => res.sendFile(join(adminDist, 'index.html')))

// Servir le site public à / (les routes /api et /admin sont déjà enregistrées au-dessus)
const siteDist = join(__dirname, '..', 'site-web', 'dist')
if (existsSync(siteDist)) {
  app.use(express.static(siteDist))
}

function listen(port) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(server)
    })
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') resolve(null)
      else reject(err)
    })
  })
}

const PORTS_TO_TRY = [3001, 3002, 3003, 3004]

async function start() {
  try {
    await getDb()
    await seedIfEmpty()
  } catch (err) {
    console.error('SQLite:', err.message)
    process.exit(1)
  }
  const preferred = Number(PORT) || 3001
  const ports = [preferred, ...PORTS_TO_TRY.filter((p) => p !== preferred)]
  let server = null
  let port = null
  for (const p of ports) {
    server = await listen(p)
    if (server) {
      port = p
      if (p !== preferred)
        console.log(
          'Port ' + preferred + ' occupé, utilisation du port ' + port + '.',
        )
      break
    }
  }
  if (!server) {
    console.error(
      'Tous les ports ' +
        ports.join(', ') +
        ' sont occupés. Libérez-en un ou définissez PORT dans .env (ex: PORT=3010).',
    )
    process.exit(1)
  }
  console.log(`API Gilbert Normand: http://localhost:${port}`)
  console.log(`  Site public:  http://localhost:${port}/`)
  console.log(`  Admin:       http://localhost:${port}/admin/`)
  console.log(`  Base SQLite: site-api/data/gilbert.db`)
}

start()
