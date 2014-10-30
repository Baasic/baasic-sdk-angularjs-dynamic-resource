(function (angular, module, undefined) {
    "use strict";
    module.service("baasicDynamicSchemaRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("schemas/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("schemas/{resourceName}/{?embed,fields}"),
                generate: uriTemplateService.parse("schemas/generate"),
                create: uriTemplateService.parse("schemas"),
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));