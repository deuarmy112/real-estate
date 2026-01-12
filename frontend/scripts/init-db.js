#!/usr/bin/env node
// Load dotenv only if .env.local exists (for local dev)
const path = require('path')
const fs = require('fs')
const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath })
}

const { initDb } = require(path.resolve(process.cwd(), 'lib', 'db.js'))

async function run() {
  if (!process.env.DATABASE_URL) {
    console.log('No DATABASE_URL set — skipping DB init (app will use mock data).')
    process.exit(0)
  }
  try {
    console.log('Initializing DB...')
    await initDb()
    console.log('DB initialized successfully.')
    process.exit(0)
  } catch (err) {
    console.error('DB init failed:', err && err.message)
    console.log('Continuing build — app will use mock data.')
    process.exit(0) // Don't fail build
  }
}

run()
