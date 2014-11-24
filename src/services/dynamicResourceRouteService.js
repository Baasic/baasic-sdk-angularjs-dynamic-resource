(function (angular, module, undefined) {
    "use strict";
    module.service("baasicDynamicResourceRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
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
