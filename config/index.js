require("dotenv").config();

const { env } = process;
const config = {
    PORT: env.PORT,
    JWT_SECRET: env.JWT_SECRET
}
module.exports = config;