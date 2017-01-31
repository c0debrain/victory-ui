import Transformer from './transformer'

export default class ClientTransformer extends Transformer {

    /**
     * Method used to transform a fetched datacenter
     * @param account The fetched datacenter
     * @returns {Object} The transformed datacenter
     */
    static fetch(singleton) {
        return {
            id: singleton.client_id,
            name: singleton.client_name,
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
            client_id: singleton.id,
            client_name: singleton.name,
            health_score: singleton.health
        }
    }
}
