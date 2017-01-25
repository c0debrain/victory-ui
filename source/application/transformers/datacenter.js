import Transformer from './transformer'

export default class DatacenterTransformer extends Transformer {

    /**
     * Method used to transform a fetched datacenter
     * @param account The fetched datacenter
     * @returns {Object} The transformed datacenter
     */
    static fetch(datacenter) {
        return {
            id: datacenter.data_center_code,
            name: datacenter.data_center_name,
            health: datacenter.data_center_health || 0
        }
    }

    /**
     * Method used to transform a send datacenter
     * @param account The datacenter to be send
     * @returns {Object} The transformed datacenter
     */
    static send(datacenter) {
        return {
            data_center_code: datacenter.id,
            data_center_name: datacenter.name,
            data_center_health: datacenter.health
        }
    }
}
