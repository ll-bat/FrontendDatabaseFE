import TableField from "./TableField";

export default class PrimaryKeyField extends TableField {
    constructor({}) {
        super()
    }

    getFieldName() {
        return 'PrimaryKeyField'
    }

    getFieldParams() {
        return {
        }
    }
}

export function primaryKeyField({} = {}) {
    return new PrimaryKeyField({})
}