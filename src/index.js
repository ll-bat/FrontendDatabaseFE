import {primaryKeyField} from "./fields/PrimaryKeyField";
import {charField} from "./fields/CharField";
import axios from "axios";
import Settings from "./Settings";
import axiosClient from "./service/HttpService";

const TABLE_EXISTS_URL = 'table-exists'

class HttpRequests {
    static async get(url, payload = {}, headers = {}) {
        return axiosClient.get(url, {
            params: payload
        })
    }

    static post(url, payload, headers) {

    }
}

class API extends HttpRequests {

    constructor() {
        super()
    }

    static async tableExists(name) {
        const res = await this.get(TABLE_EXISTS_URL, {name})
        console.log(res)
        return false;
    }


    static createTable(name, fields) {

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
        if (!await this.model.tableExists()) {
            await this.model.createTable()
        }

        const result = await API.fetchResult(this._getRequestData())
        return this._normalizeResult(result)
    }

    async all() {
        if (!await this.model.tableExists()) {
            await this.model.createTable()
        }

        const result = await API.fetchResults(this._getRequestData())
        return this._normalizeResult(result)
    }
}

class Model {
    /**
     * this method will be called automatically
     * @returns {Promise<void>}
     */
    static async createTable() {
        await API.createTable(this.getTableName(), this._prepareFields())
    }

    static _prepareFields() {
        return Object.values(this.getFields()).map(field => field.getFieldInfo())
    }

    /**
     * @returns {Promise<*>}
     */
    static async tableExists() {
        return API.tableExists(this.getTableName())
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

class User extends Model {
    static getTableName() {
        return "user"
    }

    static getFields() {
        return {
            id: primaryKeyField(),
            username: charField(),
            email: charField(),
            password: charField(),
        }
    }
}

(async function() {
    const firstUser = await User.records().one()
    console.log(firstUser)
})()













