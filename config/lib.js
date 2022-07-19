module.exports = () => {
    return {
        LIB: {
            NODE_ENV: {
                DEV: "development",
                PROD: "production"
            },
            METHOD: {
                OPTIONS: "options",
                ERROR: "error"
            },
            RESPONSE_MESSAGE: {
                SERVER_ERROR: () => "Server error.",
                METHOD_NOT_VALID: () => "Method is not valid.",
                CONNECTION_SUCCESS: () => "Connection is alive.",
                CONNECTION_FAILED: () => "Connection is failed.",
                PING: () => "ping"
            }
        }
    };
};
