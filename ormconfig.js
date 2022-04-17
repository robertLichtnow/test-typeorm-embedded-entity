module.exports = {
  name: 'default',
  type: 'postgres',
  host: 'pg_db',
  port: 5432,
  database: 'test',
  username: 'docker',
  password: 'docker',
  ssl: false,
  logging: true,
  entities: [
    './src/entities/*.ts',
  ],
};
