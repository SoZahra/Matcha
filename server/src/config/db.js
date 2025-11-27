import pkg from 'pg';
const { Pool } = pkg;

// utilisation des variablesd'environnement chargées par dotenv

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

pool.on('connect', () =>{
    console.log('✅ Connect to PostgreSQL !')
});


pool.on('error', (err) => {
    console.error('❌ Unexpected error on idle client :', err);
    process.exit(-1);
});


export default pool
