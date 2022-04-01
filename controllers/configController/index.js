const config = require("../../config");
const errors = require("../../utils/errors");
const db = require("../../models");

// @route GET api/config
// @desc Get config
// @access Public
// @data []
const configData = (req) => {
    return {};
};
const configPromise = async (req, res, next, data) => {
    return await new Promise(async (resolve, reject) => {
        try {
            let translationList = await db.i18n_translation.findAll({
                where: {},
                include: [
                    {
                        model: db.i18n_key,
                        required: true,
                    },
                    {
                        model: db.i18n_language,
                        required: true,
                    },
                ],
                logging: false,
                raw: true
            })
            const translationObj = translationList.map(translation => {
                return {
                    key: translation["i18n_key.key"],
                    value: translation["value"],
                    language: translation["i18n_language.key"],
                }
            }).reduce((prev, translation) => {
                const newTranslation = JSON.parse(JSON.stringify(prev))
                if (!newTranslation[translation["language"]]) {
                    newTranslation[translation["language"]] = {}
                }
                newTranslation[translation["language"]][translation["key"]] = translation["value"]
                return newTranslation
            }, {})
            return resolve({
                translationObj,
            });
        } catch (e) {
            return reject(e);
        }
    })
        .then(({translationObj}) => {
            return {
                translations: translationObj,
            }
        })
        .then(data => {
            return res.status(200).json({
                success: true,
                data: data,
                message: ""
            });
        })
};

module.exports = {
    configController: errors.handlerWrapper({
        dataFunction: configData,
        promiseHandler: configPromise,
    }),
};
