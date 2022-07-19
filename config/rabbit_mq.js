const EXCHANGE = () => ({
    SERVICE: {
        name: "service_exchange",
        type: "topic",
        options: {durable: true}
    }
})

const TOPIC = ({server_id}) => ({
    TRIGGER_SERVICE_STORE: () => `trigger_service_store.${server_id}`,
    TRIGGER_SERVICE_STORE_ALL: () => `trigger_service_store.*`
})

const ROUTING_KEY = () => ({})

const QUEUE = ({server_id}) => ({
    TRIGGER_SERVICE_STORE: {
        name: `trigger_service_store_${server_id}`,
        options: {durable: false, autoDelete: true}
    },
})

module.exports = ({server_id}) => ({
    RABBIT_MQ: {
        PREFETCH: 200,
        BASE_URL: process.env.RABBIT_MQ_BASE_URL ?? `${process.env.RABBIT_MQ_PROTOCOL}://${process.env.RABBIT_MQ_USERNAME}:${process.env.RABBIT_MQ_PASSWORD}@${process.env.RABBIT_MQ_HOST}:${process.env.RABBIT_MQ_PORT}${process.env.RABBIT_MQ_VHOST}`,
        EXCHANGE: EXCHANGE(),
        TOPIC: TOPIC({server_id}),
        ROUTING_KEY: ROUTING_KEY(),
        QUEUE: QUEUE({server_id}),
        BINDINGS: {
            QUEUE: [
                [QUEUE({server_id}).TRIGGER_SERVICE_STORE.name, EXCHANGE().SERVICE.name, TOPIC({server_id}).TRIGGER_SERVICE_STORE()],
                [QUEUE({server_id}).TRIGGER_SERVICE_STORE.name, EXCHANGE().SERVICE.name, TOPIC({server_id}).TRIGGER_SERVICE_STORE_ALL()],
            ]
        }
    }
})
