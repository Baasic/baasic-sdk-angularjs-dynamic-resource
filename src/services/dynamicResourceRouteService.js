(function (angular, module, undefined) {
    "use strict";
    module.service("baasicDynamicResourceRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("resources/{resourceName}/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("resources/{resourceName}/{id}/{?embed,fields}"),
                create: uriTemplateService.parse("resources/{resourceName}"),
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));