const db = require("../../../db/models");
const {Store} = require("../../../utils/store")

const STORE_KEY = "i18n_translation"

const init = async (store) => {
    const recordList = await db.i18n_translation.findAll({
        where: {},
        include: [],
        logging: false,
        raw: true
    })
    for (const record of recordList) {
        const keyList = [
            record["id"],
        ]
        for (let key of keyList) {
            let recordObj = store.get(key) ?? {}
            recordObj["i18n_key_id"] = record["i18n_key_id"]
            recordObj["i18n_language_id"] = record["i18n_language_id"]
            recordObj["value"] = record["value"]
            recordObj["id"] = record["id"]
            store.set(key, {...recordObj})
        }
    }
}

const update = async (store, {store_id = []}) => {
    const whereClause = {}
    if (store_id.length !== 0) {
        whereClause["id"] = store_id
    }
    const storeIdObj = {}
    const recordList = await db.i18n_translation.findAll({
        where: whereClause,
        include: [],
        logging: false,
        raw: true
    })
    for (const record of recordList) {
        const keyList = [
            record["id"],
        ]
        storeIdObj[record["id"]] = keyList
        for (let key of keyList) {
            let recordObj = store.get(key) ?? {}
            recordObj["i18n_key_id"] = record["i18n_key_id"]
            recordObj["i18n_language_id"] = record["i18n_language_id"]
            recordObj["value"] = record["value"]
            recordObj["id"] = record["id"]
            store.set(key, {...recordObj})
        }
    }
    for (let storeId of store_id.filter(x => !Object.keys(storeIdObj).includes(x))){
        for (let key of storeIdObj[storeId]){
            store.remove(key)
        }
    }
}

const store = new Store({key: STORE_KEY, init: init, update: update})

module.exports = {
    store,
}