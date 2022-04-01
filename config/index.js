const dotenv = require("dotenv");
const path = require("path");

const SERVER = require("./server");
const DB = require("./db");

const {validateConfig} = require("../utils/validations");
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'production'
if (NODE_ENV !== "docker") {
    let ENV_FILE = ".env"
    const resultEnv = dotenv.config({path: path.resolve(__dirname, `../${ENV_FILE}`)});
    if (resultEnv.error) {
        console.log(resultEnv.error);
    }
}
process.env.NODE_ENV = NODE_ENV

const config = {
    ...SERVER(),
    DB: DB,
    APP_DIR: path.resolve(__dirname, "../"),
    NODE_ENV: NODE_ENV,
};

for (let key in config) {
    if (!validateConfig(config[key])) {
        throw new Error(`Config is not valid by ${key}`);
    }
}

module.exports = config;
