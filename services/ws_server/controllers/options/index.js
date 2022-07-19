const {wsHandlerWrapper} = require("../../../../utils/errors");

const optionsData = (data, context, ws, ws_server) => {
    return {}
}
const optionsPromise = (data, context, ws, ws_server, next) => {

}

module.exports = {
    optionsController: wsHandlerWrapper({
        dataFunction: optionsData,
        promiseHandler: optionsPromise
    })
}