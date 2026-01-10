#!/usr/bin/env node
const path = require('path')
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') })

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
