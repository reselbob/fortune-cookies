const host = process.env.REPORT_GEN_DATASOURCE_HOST || '127.0.0.1';
const port = parseInt(process.env.REPORT_GEN_DATASOURCE_PORT) || 3306;
const username = parseInt(process.env.REPORT_GEN_DATASOURCE_USER) || 'root';
const password = parseInt(process.env.REPORT_GEN_DATASOURCE_PASSWORD) || 'password'; // yeah, bad business
const dialect = 'mariadb';
const database = 'fortune_cookies';

const config = {
    host,
    port,
    username,
    password,
    dialect,
    database
}

module.exports = {config}
