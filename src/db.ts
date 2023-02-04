import { Pool } from "pg";

const connectionString = 'postgres://rbvqlehi:5V1cLiNIXfQQ79pWQAf0AabR3KAGLBEA@kesavan.db.elephantsql.com/rbvqlehi';

const db = new Pool({ connectionString });

export default db;