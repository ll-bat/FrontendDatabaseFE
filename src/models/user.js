import {primaryKeyField} from "../fields/PrimaryKeyField";
import {charField} from "../fields/CharField";
import Model from "../core";

export default class User extends Model {
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