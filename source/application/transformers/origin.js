import Transformer from './transformer'

export default class OriginTransformer extends Transformer {

    /**
     * Method used to transform a fetched singleton
     * @param {Object} singleton information in api format
     * @returns {Object} The transformed singleton
     */
    static fetch(singleton) {
        return {
            id: singleton.id,
            name: singleton.domain,
            health: false,
            importance: Math.ceil((singleton.importance + 1) / 2)
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
            name: singleton.name,
            importance: singleton.importance
        }
    }
}
