angular.module('app.services')
    .factory('services.api', ApiService);

ApiService.$inject = ['services.client', 'services.datacenter'];

function ApiService(ClientService, DatacenterService) {
    return {
        client:         ClientService,
        datacenter:     DatacenterService
    };
}
