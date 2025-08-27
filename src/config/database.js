require('dotenv').config();

module.exports = {
    dialect: 'mysql',
    host:process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username:process.env.DATABASE_USERNAME,
    database:process.env.DATABASE,
    password:process.env.DATABASE_PASSWORD,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
    dialectOptions: {
        timezone: '-03:00'
    },
    timezone: '-03:00'
}
