module.exports = () => {
    return {
        INFLUX_DB: {
            BASE_URL: process.env.INFLUX_DB_BASE_URL ?? `${process.env.INFLUX_DB_PROTOCOL}://${process.env.INFLUX_DB_HOST}:${process.env.INFLUX_DB_PORT}`,
            USERNAME: process.env.INFLUX_DB_USERNAME,
            PASSWORD: process.env.INFLUX_DB_PASSWORD,
            MEASUREMENT: {
                SYSLOG: "syslog"
            },
            WRITE_API: {
                GRAFANA: {
                    name: "syslog_api",
                    org: "example_org",
                    bucket: "grafana"
                }
            }
        }
    };
};
