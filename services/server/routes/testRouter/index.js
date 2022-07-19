const {Router} = require("express");
const config = require("../../../../config");

const {
    testWebsocketController
} = require("../../controllers/testController");

const testRouter = Router();

// @access Public
// @data []
testRouter.get("/websocket", testWebsocketController);

module.exports = testRouter;
