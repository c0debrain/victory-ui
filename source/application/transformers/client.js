import Transformer from './transformer'

export default class ClientTransformer extends Transformer {

    /**
     * Method used to transform a fetched singleton
     * @param {Object} singleton information in api format
     * @returns {Object} The transformed singleton
     */
    static fetch(singleton) {
        return {
            id: singleton.id,
            name: singleton.name,
            importance: Math.ceil((singleton.importance + 1) / 2),
            health: false
        }
    }

    /**
     * Method used to transform a send singleton
     * @param {Object} singleton information in vue format
     * @returns {Object} The transformed singleton
     */
    static send(singleton) {
        return {
            id: singleton.id,
            name: singleton.name
        }
    }
}
