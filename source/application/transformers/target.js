import Transformer from './transformer'

export default class TargetTransformer extends Transformer {

    /**
     * Method used to transform a fetched singleton
     * @param {Object} singleton information in api format
     * @returns {Object} The transformed singleton
     */
    static fetch(singleton) {
        return {
            id: singleton.target_id,
            name: singleton.target_live_domain || singleton.target_staging_domain,
            health: singleton.health_score || 0
        }
    }

    /**
     * Method used to transform a send singleton
     * @param {Object} singleton information in vue format
     * @returns {Object} The transformed singleton
     */
    static send(singleton) {
        return {
            target_id: singleton.id,
            target_live_domain: singleton.name,
            health_score: singleton.health
        }
    }
}
