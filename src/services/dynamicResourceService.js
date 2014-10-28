(function (angular, module, undefined) {
    "use strict";
    module.service("baasicDynamicResourceService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicDynamicResourceRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, dynamicResourceRouteService) {
            return {
                routeService: dynamicResourceRouteService,
                find: function (resourceName, options) {
                    return baasicApiHttp.get(dynamicResourceRouteService.find.expand(baasicApiService.findParams(angular.extend({ resourceName: resourceName }, options))));
                },
                get: function (resourceName, id, options) {
                    return baasicApiHttp.get(dynamicResourceRouteService.get.expand(baasicApiService.getParams(id, angular.extend({ resourceName: resourceName }, options))));
                },
                create: function (resourceName, data) {
                    var params = baasicApiService.getParams(resourceName, data, 'resourceName');
                    return baasicApiHttp.post(dynamicResourceRouteService.create.expand(params), baasicApiService.createParams(params)[baasicConstants.modelPropertyName]);
                },
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                patch: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('patch').href, params[baasicConstants.modelPropertyName]);
                },
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                }
            };
        }]);
}(angular, module));