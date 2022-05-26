import TableField from "./TableField";

export default class BooleanField extends TableField {
    constructor({nullable = true, default_value = false}) {
        super()
        this.nullable = nullable
        this.default_value = default_value
    }

    getFieldName() {
        return 'BooleanField'
    }

    getFieldParams() {
        return {
            nullable: this.nullable,
            default_value: this.default_value,
        }
    }
}

export function booleanField({nullable, default_value, ...props} = {}) {
    return new BooleanField({nullable, default_value, ...props})
}