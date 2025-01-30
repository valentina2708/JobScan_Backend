module.exports = {
  development: {
    client: 'pg', // PostgreSQL
    connection: {
      host: '127.0.0.1', // O la IP del servidor PostgreSQL
      user: 'postgres', // Cambia esto por tu usuario de PostgreSQL
      password: 'postgres', // Cambia esto por tu contraseña
      database: 'jobsearch' ,
      port: 5432,  
    },
    migrations: {
      directory: './migrations' // Asegurar que este directorio existe
    },
    seeds: {
      directory: './seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
