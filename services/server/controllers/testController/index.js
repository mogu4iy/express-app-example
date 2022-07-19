const config = require("../../../../config");
const errors = require("../../../../utils/errors");
const path = require("path");

// @route GET api/test/websocket
// @desc Test websocket connection
// @access Public
// @data []
const testWebsocketData = (req) => {
    return {};
};
const testWebsocketPromise = async (req, res, next, data) => {
    return res.sendFile(path.join(__dirname, '/websocket.html'));
};

module.exports = {
    testWebsocketController: errors.httpHandlerWrapper({
        dataFunction: testWebsocketData,
        promiseHandler: testWebsocketPromise,
    }),
};
