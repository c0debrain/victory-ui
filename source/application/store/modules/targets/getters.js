export default {
    /*
        We are getting all of the ID's of singletons from the resource store
        and filtering out a list of ID's that were requested. The 'ids' that
        are requested are cast to strings because hash table keys have to be
        a string, and the ID's coming in are numbers.
     */
    getTargets: state => ids => Object.keys(state.all)
        .filter(key => ids.map(String).includes(key))
        .map(key => state.all[key])
}
