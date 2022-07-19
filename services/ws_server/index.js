const http = require("http")
const config = require("../../config")
const {WsServer} = require("../../utils/socket")
const {
    optionsController,
} = require("./controllers/options")
const {
    server,
} = require("../server")

const ws_server = new WsServer({
    port: config.SERVER.PORT,
    server: server,
})

ws_server.use(config.LIB.METHOD.OPTIONS, optionsController)

const init = async () => {
    await ws_server.listen("/websocket");
}

module.exports = {init, ws_server}
