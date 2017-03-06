export default {
    /*
        We are getting all of the ID's of singletons from the resource store
        in array format.
     */
    getAccountsArray: state => () => Object.keys(state.all)
        .map(key => state.all[key])
}
