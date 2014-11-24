(function (angular, undefined) {
    var module = angular.module("baasic.dynamicResource", ["baasic.api"]);

    module.config(["$provide", function config($provide) {}]);

    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicDynamicResourceRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("resources/{resourceName}/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("resources/{resourceName}/{id}/{?embed,fields}"),
                create: uriTemplateService.parse("resources/{resourceName}"),
                parse: uriTemplateService.parse,
                permissions: {
                    get: uriTemplateService.parse("resources/{resourceName}/{id}/permissions/{?fields}"),
                    update: uriTemplateService.parse("resources/{resourceName}/{id}/permissions/{?fields}"),
                    deleteByUser: uriTemplateService.parse("resources/{resourceName}/{id}/permissions/actions/{accessAction}/users/{user}/"),
                    deleteByRole: uriTemplateService.parse("resources/{resourceName}/{id}/permissions/actions/{accessAction}/roles/{role}/")
                }
            };
        }]);
    }(angular, module));

    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicDynamicResourceService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicDynamicResourceRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, dynamicResourceRouteService) {
            return {
                routeService: dynamicResourceRouteService,
                find: function (resourceName, options) {
                    return baasicApiHttp.get(dynamicResourceRouteService.find.expand(baasicApiService.findParams(angular.extend({
                        resourceName: resourceName
                    }, options))));
                },
                get: function (resourceName, id, options) {
                    return baasicApiHttp.get(dynamicResourceRouteService.get.expand(baasicApiService.getParams(id, angular.extend({
                        resourceName: resourceName
                    }, options))));
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
                },
                permissions: {
                    get: function (options) {
                        var params = angular.extend({}, options);
                        return baasicApiHttp.get(dynamicResourceRouteService.permissions.get.expand(params));
                    },
                    update: function (options) {
                        var params = angular.extend({}, options);
                        return baasicApiHttp.put(dynamicResourceRouteService.permissions.get.expand(params), params[baasicConstants.modelPropertyName]);
                    },
                    removeByUser: function (action, user, data) {
                        var params = baasicApiService.removeParams(data);
                        params.user = user;
                        params.accessAction = action;
                        return baasicApiHttp.delete(dynamicResourceRouteService.permissions.deleteByUser.expand(params));
                    },
                    removeByRole: function (action, role, data) {
                        var params = baasicApiService.removeParams(data);
                        params.role = role;
                        params.accessAction = action;
                        return baasicApiHttp.delete(dynamicResourceRouteService.permissions.deleteByRole.expand(params));
                    }
                }
            };
        }]);
    }(angular, module));

    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicDynamicSchemaRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("schemas/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("schemas/{resourceName}/{?embed,fields}"),
                generate: uriTemplateService.parse("schemas/generate"),
                create: uriTemplateService.parse("schemas"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicDynamicSchemaService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicDynamicSchemaRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, dynamicSchemaRouteService) {
            return {
                routeService: dynamicSchemaRouteService,
                find: function (options) {
                    return baasicApiHttp.get(dynamicSchemaRouteService.find.expand(baasicApiService.findParams(options)));
                },
                get: function (resourceName, options) {
                    return baasicApiHttp.get(dynamicSchemaRouteService.get.expand(baasicApiService.getParams(resourceName, options, 'resourceName')));
                },
                create: function (data) {
                    return baasicApiHttp.post(dynamicSchemaRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                generate: function (data) {
                    return baasicApiHttp.post(dynamicSchemaRouteService.generate.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                }
            };
        }]);
    }(angular, module));
})(angular);