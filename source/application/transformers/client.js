import Transformer from './transformer'

export default class ClientTransformer extends Transformer {

    /**
     * Method used to transform a fetched singleton
     * @param {Object} singleton information in api format
     * @returns {Object} The transformed singleton
     */
    static fetch(singleton) {
        return {
            id: singleton.client_id,
            name: singleton.client_name,
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
            client_id: singleton.id,
            client_name: singleton.name
        }
    }
}
