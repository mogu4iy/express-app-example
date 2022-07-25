const config = require("./config")
const db = require("./db/models");

const {init: initLogger, logger} = require("./services/logger")
const {init: initStore} = require("./services/store")
const {init: initServer} = require("./services/server")
const {init: initWss} = require("./services/ws_server")
const {init: initCron} = require("./services/cron")
const {init: initRabbitMq} = require("./services/rabbitmq")
const {init: initRedis} = require("./services/redis")

async function start() {
    try {
        await db.sequelize.authenticate()
        await initLogger()
        await initStore()
        await initServer()
        await initRedis()
        await initWss()
        await initRabbitMq()
        await initCron()
        await logger.debug(`APP is initialized.`)
        config.SERVER.HEALTH = true
    } catch (e) {
        await initLogger()
        await logger.critical(e)
        process.exit(0)
    }
}

start()
