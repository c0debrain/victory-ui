import Transformer from './transformer'

export default class DatacenterTransformer extends Transformer {

    /**
     * Method used to transform a fetched datacenter
     * @param account The fetched datacenter
     * @returns {Object} The transformed datacenter
     */
    static fetch(singleton) {
        return {
            id: singleton.data_center_code,
            name: singleton.data_center_name,
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
            data_center_code: singleton.id,
            data_center_name: singleton.name,
            health_score: singleton.health
        }
    }
}
