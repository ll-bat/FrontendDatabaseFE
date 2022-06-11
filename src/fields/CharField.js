import TableField from "./TableField";

export default class CharField extends TableField {
    constructor({length = 255, nullable = true, default_value = ""}) {
        super()
        this.length = length
        this.nullable = nullable
        this.default_value = default_value
    }

    getFieldName() {
        return 'CharField'
    }

    getFieldParams() {
        return {
            length: this.length,
            nullable: this.nullable,
            default_value: this.default_value
        }
    }
}

export function charField({length, nullable, default_value} = {}) {
    return new CharField({length, nullable, default_value})
}