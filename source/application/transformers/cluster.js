import Transformer from './transformer'

export default class ClusterTransformer extends Transformer {

    /**
     * Method used to transform a fetched singleton
     * @param {Object} singleton information in api format
     * @returns {Object} The transformed singleton
     */
    static fetch(singleton) {
        return {
            id: singleton.cluster_name,
            name: singleton.cluster_name,
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
            cluster_name: singleton.id
        }
    }
}
