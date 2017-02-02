import Transformer from './transformer'

export default class OriginTransformer extends Transformer {

    /**
     * Method used to transform a fetched singleton
     * @param {Object} singleton information in api format
     * @returns {Object} The transformed singleton
     */
    static fetch(singleton) {
        return {
            id: singleton.origin_id,
            name: singleton.origin_live_domain,
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
            origin_id: singleton.id,
            origin_live_domain: singleton.name
        }
    }
}
