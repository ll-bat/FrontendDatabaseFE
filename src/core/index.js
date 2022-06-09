import {CREATE_TABLE_URL, TABLE_EXISTS_URL} from "./helpers/constants";
import axios from "axios";
import Settings from "../Settings";

class API {
    static getRequestConfig() {
        return {
            headers: {
                Authorization: Settings.getUserToken(),
            },
            baseURL: Settings.getAPIBaseUrl(),
        }
    }

    static async tableExists(name) {
        try {
            const res = await axios.get(TABLE_EXISTS_URL, {
                params: {name},
                ...this.getRequestConfig(),
            });
            return res.data
        } catch (e) {
            // TODO handle error
            throw new DOMException()
        }
    }

    static async createTable(name, fields) {
        try {
            const res = await axios.post(CREATE_TABLE_URL, {
                name,
                fields
            }, this.getRequestConfig());
            return res.data
        } catch (e) {
            // TODO handle error
            throw new DOMException()
        }
    }

    static fetchResult(payload) {

    }

    static fetchResults(payload) {

    }
}

class QuerySet {
    constructor(model) {
        /** @param model {Model} */
        this.model = model
        this.where = []
        this.selectFields = []
    }

    select(fields = []) {
        this.selectFields = fields
        return this;
    }

    find(whereArray = []) {
        // TODO implement logic
        return this;
    }

    _buildWhere(where) {
        // TODO implement logic
        return []
    }

    _getRequestData() {
        const where = this._buildWhere(this.where)
        const select = this.selectFields
        return {
            where,
            select
        }
    }

    _normalizeResult(result) {
        return {}
    }

    async one() {
        await this.model.prepare()
        const result = await API.fetchResult(this._getRequestData())
        return this._normalizeResult(result)
    }

    async all() {
        await this.model.prepare()
        const result = await API.fetchResults(this._getRequestData())
        return this._normalizeResult(result)
    }
}

export default class Model {
    /**
     * this method will be called automatically
     * @returns {Promise<void>}
     */
    static async createTable() {
        try {
            await API.createTable(this.getTableName(), this._prepareFields())
        } catch (e) {
            // TODO handle error
            throw new DOMException(e)
        }
    }

    static _prepareFields() {
        const toReturn = {}
        const fields = this.getFields()
        for (const field in fields) {
            toReturn[field] = fields[field].getFieldInfo()
        }
        return toReturn
    }

    static async prepare() {
        const tableExists = await API.tableExists(this.getTableName())
        if (!tableExists) {
            await this.createTable()
        }
    }

    /**
     * @abstract_method
     */
    static getTableName() {
        throw new DOMException('Override this method in child class')
    }

    /**
     * @abstract_method
     * @return {Object}
     */
    static getFields() {
        throw new DOMException('Override this method in child class')
    }

    /**
     * Use this method to start interacting with database
     * @returns {QuerySet}
     */
    static records() {
        return new QuerySet(this)
    }
}
