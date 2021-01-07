const host = process.env.FORTUNE_COOKIES_DATASOURCE_HOST || '172.26.0.2';
const port = parseInt(process.env.FORTUNE_COOKIES_DATASOURCE_PORT) || 3306;
const username = parseInt(process.env.FORTUNE_COOKIES_DATASOURCE_USER) || 'root';
const password = parseInt(process.env.FORTUNE_COOKIES_DATASOURCE_PASSWORD) || 'password'; // yeah, bad business
const dialect = 'mariadb';
const database = 'fortune_cookies';

const config = {
    host,
    port,
    username,
    password,
    dialect,
    database,
}

module.exports = {config}
