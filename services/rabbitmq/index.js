const config = require("../../config")
const {RabbitMQClient} = require("../../utils/rabbitmq")
const {
    serializeToJsonMiddleware,
    validateTriggerServiceStoreMiddleware,
    triggerServiceStoreController
} = require("./handlers")

const rabbitMQClient = new RabbitMQClient({
    baseUrl: config.RABBIT_MQ.BASE_URL,
    exchangeList: Object.values(config.RABBIT_MQ.EXCHANGE),
    queueList: Object.values(config.RABBIT_MQ.QUEUE),
    queueBindingsList: config.RABBIT_MQ.BINDINGS.QUEUE,
    prefetch: config.RABBIT_MQ.PREFETCH
})

const init = async () => {
    rabbitMQClient.use(config.RABBIT_MQ.QUEUE.TRIGGER_SERVICE_STORE.name,
        serializeToJsonMiddleware,
        validateTriggerServiceStoreMiddleware,
        triggerServiceStoreController())
    await rabbitMQClient.connect()
}

module.exports = {
    rabbitMQClient,
    init
}