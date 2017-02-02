import Transformer from './transformer'

export default class DatacenterTransformer extends Transformer {

    /**
     * Method used to transform a fetched singleton
     * @param {Object} singleton information in api format
     * @returns {Object} The transformed singleton
     */
    static fetch(singleton) {
        return {
            id: singleton.data_center_code,
            name: singleton.data_center_name,
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
            data_center_code: singleton.id,
            data_center_name: singleton.name
        }
    }
}
