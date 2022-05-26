import TableField from "./TableField";

export default class PrimaryKeyField extends TableField {
    constructor({length = 11, }) {
        super()
        this.length = length
    }

    getFieldName() {
        return 'PrimaryKeyField'
    }

    getFieldParams() {
        return {
            length: this.length,
        }
    }
}

export function primaryKeyField({length, ...props} = {}) {
    return new PrimaryKeyField({length, ...props})
}