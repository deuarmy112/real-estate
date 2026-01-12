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
    console.warn('No DATABASE_URL set — skipping init.')
    process.exit(0)
  }
  try {
    console.log('Initializing DB...')
    await initDb()
    console.log('DB initialized')
    process.exit(0)
  } catch (err) {
    console.error('DB init failed:', err && err.message)
    process.exit(1)
  }
}

run()
