const {Router} = require("express");
const config = require("../../config");

const {
    configController
} = require("../../controllers/configController");

const configRouter = Router();

// @access Public
// @data []
configRouter.get("/", configController);

module.exports = configRouter;
