const { Sequileze } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequileze(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
    }
);

