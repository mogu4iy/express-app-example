const config = require("../../../config")
const {store} = require("../../store");

const serializeToJsonMiddleware = (data, context, channel, next) => {
    const content = data.content
    context["data"] = JSON.parse(content.toString())
    return next()
}

const validateTriggerServiceStoreMiddleware = (data, context, channel, next) => {
    const contextData = context["data"]
    if (!contextData["store_id"] || !Array.isArray(contextData["store_id"])) {
        throw new Error("Key 'store_id' is absent ot invalid.")
    }
    if (!contextData["store_key"] || typeof contextData["store_key"] !== "string") {
        throw new Error("Key 'store_key' is absent ot invalid.")
    }
    if (!store[contextData["store_key"]]){
        return
    }
    return next()
}

const triggerServiceStoreController = () => async (data, context, channel, next) => {
    const contextData = context["data"]
    await store[contextData["store_key"]].update({store_id: contextData["store_id"]})
}

module.exports = {
    serializeToJsonMiddleware,
    validateTriggerServiceStoreMiddleware,
    triggerServiceStoreController
}