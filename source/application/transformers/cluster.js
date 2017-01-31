import Transformer from './transformer'

export default class ClusterTransformer extends Transformer {

    /**
     * Method used to transform a fetched datacenter
     * @param account The fetched datacenter
     * @returns {Object} The transformed datacenter
     */
    static fetch(singleton) {
        return {
            id: singleton.cluster_name,
            name: singleton.cluster_name,
            health: singleton.health_score || 0
        }
    }

    /**
     * Method used to transform a send datacenter
     * @param account The datacenter to be send
     * @returns {Object} The transformed datacenter
     */
    static send(singleton) {
        return {
            cluster_name: singleton.id,
            health_score: singleton.health
        }
    }
}
