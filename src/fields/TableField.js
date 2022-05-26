
export default class TableField {
    getFieldName() {
        throw new DOMException('Implement this method in child class')
    }

    getFieldParams() {
        throw new DOMException('Implement this method in child class')
    }

    getFieldInfo() {
        return {
            name: this.getFieldName(),
            params: this.getFieldParams(),
        }
    }
}
