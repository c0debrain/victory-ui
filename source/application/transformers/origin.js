import Transformer from './transformer'

export default class OriginTransformer extends Transformer {

    /**
     * Method used to transform a fetched datacenter
     * @param account The fetched datacenter
     * @returns {Object} The transformed datacenter
     */
    static fetch(singleton) {
        return {
            id: singleton.origin_id,
            name: singleton.origin_live_domain,
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
            origin_id: singleton.id,
            origin_live_domain: singleton.name,
            health_score: singleton.health
        }
    }
}
