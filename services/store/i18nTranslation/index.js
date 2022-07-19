const db = require("../../../db/models");
const {parseStream} = require("../../../utils/server");
const {logger} = require("../../logger");
const {Store} = require("../../../utils/store")

const STORE_KEY = "ws_stream"

const init = async (store) => {
    const recordList = await db.ws_stream.findAll({
        where: {},
        include: [],
        logging: false,
        raw: true
    })
    for (const record of recordList) {
        const keyList = [
            record["id"],
            record["stream"]
        ]
        for (let key of keyList) {
            let recordObj = store.get(key) ?? {}
            let parsedStream = {}
            try {
                parsedStream = parseStream(record["stream"])
            } catch (e) {
                logger.warning(e)
                continue
            }
            recordObj["id"] = record["id"]
            store.set(key, {...recordObj, ...parsedStream})
        }
    }
}

const update = async (store, {store_id = []}) => {
    const whereClause = {}
    if (store_id.length !== 0) {
        whereClause["id"] = store_id
    }
    const storeIdObj = {}
    const recordList = await db.ws_stream.findAll({
        where: whereClause,
        include: [],
        logging: false,
        raw: true
    })
    for (const record of recordList) {
        const keyList = [
            record["id"],
            record["stream"]
        ]
        storeIdObj[record["id"]] = keyList
        for (let key of keyList) {
            let recordObj = store.get(key) ?? {}
            let parsedStream = {}
            try {
                parsedStream = parseStream(record["stream"])
            } catch (e) {
                logger.warning(e)
                continue
            }
            recordObj["id"] = record["id"]
            store.set(key, {...recordObj, ...parsedStream})
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