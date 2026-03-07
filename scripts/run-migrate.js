/**
 * Run products schema migration.
 * Usage: node --env-file=.env scripts/run-migrate.js
 * Or: DATABASE_URL="..." node scripts/run-migrate.js
 */
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, "utf8");
  env.split("\n").forEach((line) => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  });
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const sql = `
ALTER TABLE products DROP COLUMN IF EXISTS categories;
ALTER TABLE products ADD COLUMN IF NOT EXISTS main_category text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS sub_type text;
`;

async function run() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("ALTER TABLE products DROP COLUMN IF EXISTS categories");
    await client.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS main_category text");
    await client.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS sub_type text");
    await client.query("COMMIT");
    console.log("Migration completed: products table now has main_category and sub_type.");
  } catch (e) {
    await client.query("ROLLBACK");
    console.error("Migration failed:", e.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
