/**
 * @module baasicDynamicResourceRouteService
 * @description Baasic Dynamic Resource Route Service provides Baasic route templates which can be expanded to Baasic REST URI's through the [URI Template](https://github.com/Baasic/uritemplate-js) by providing it with an object that contains URI parameters. For example `baasicDynamicResourceService` uses `baasicDynamicResourceRouteService` to obtain a part of needed routes while the other part is obtained through HAL. Route services by convention use the same function names as their corresponding services.
 * @copyright (c) 2015 Mono
 * @license MIT
 * @author Mono
*/
(function (angular, module, undefined) {
    "use strict";
    module.service("baasicDynamicResourceRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
				/**
				* Parses find route which can be expanded with additional options. Supported items are: 
				* - `schemaName` - Name of the dynamic resource schema.
				* - `searchQuery` - A string referencing resource properties using the phrase or query search.
				* - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
				* - `rpp` - A value used to limit the size of result set per page.
				* - `sort` - A string used to set the role property to sort the result collection by.
				* - `embed` - Comma separated list of resources to be contained within the current representation.
				* @method      
				* @example baasicDynamicResourceRouteService.find.expand({schemaName: "<schema-name>", searchQuery: "<search-phrase>"});
				**/ 			
                find: uriTemplateService.parse("resources/{schemaName}/{?searchQuery,page,rpp,sort,embed,fields}"),
				/**
                * Parses get route which must be expanded with the resource name of the previously created dynamic resource schema in the system and the Id of the previously created dynamic resource. Additional expand supported items are:
				* - `embed` - Comma separated list of resources to be contained within the current representation.
				* @method      
				* @example baasicDynamicResourceRouteService.find.expand({schemaName: "<schema-name>", id: "<schema-id>"});               
				**/ 					
                get: uriTemplateService.parse("resources/{schemaName}/{id}/{?embed,fields}"),
				/**
				* Parses create route, this URI template doesn't expose any additional properties.
				* @method      
				* @example baasicDynamicResourceRouteService.create.expand({});              
				**/  				
                create: uriTemplateService.parse("resources/{schemaName}"),
				/**
				* Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
				* @method
				* @example baasicDynamicResourceRouteService.parse("route/{?embed,fields,options}").expand({embed: "<embedded-resource>"});
				**/					
                parse: uriTemplateService.parse,					
                permissions: {
					/**
					* Parses get permissions route; this URI template should be expanded with the Id of the dynamic resource and the dynamic resource schema name.					
					* @method permissions.get       
					* @example baasicDynamicResourceRouteService.permissions.get.expand({id: "<dynamic-resource-id>", schemaName: "<schema-name>"});               
					**/ 				
                    get: uriTemplateService.parse("resources/{schemaName}/{id}/permissions/{?fields}"),
					/**
					* Parses update permissions route; this URI template should be expanded with the Id of the dynamic resource and the dynamic resource schema name.			
					* @method permissions.update       
					* @example baasicDynamicResourceRouteService.permissions.update.expand({id: "<dynamic-resource-id>", schemaName: "<schema-name>"});
					**/ 					
                    update: uriTemplateService.parse("resources/{schemaName}/{id}/permissions/{?fields}"),
					/**
					* Parses deleteByUser permissions route which can be expanded with additional options. Supported items are:
					* - `schemaName` - Name of the dynamic resource schema.
					* - `id` - Id of the dynamic resource.
					* - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified user and article resource.
					* - `user` - A value which uniquely identifies user for which ACL policy needs to be removed.					
					* @method permissions.deleteByUser       
					* @example baasicDynamicResourceRouteService.permissions.deleteByUser.expand({schemaName: "<schema-name>", id: "<dynamic-resource-id>", accessAction: "<access-action>", user: "<username>"});
					**/ 						
                    deleteByUser: uriTemplateService.parse("resources/{schemaName}/{id}/permissions/actions/{accessAction}/users/{user}/"),
					/**
					* Parses deleteByUser permissions route which can be expanded with additional options. Supported items are:
					* - `schemaName` - Name of the dynamic resource schema.
					* - `id` - Id of the dynamic resource.
					* - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified role and article resource.
					* - `role` - A value which uniquely identifies role for which ACL policy needs to be removed.					
					* @method permissions.deleteByRole       
					* @example baasicDynamicResourceRouteService.permissions.deleteByRole.expand({schemaName: "<schema-name>", id: "<dynamic-resource-id>", accessAction: "<access-action>", role: "<role-name>"});
					**/ 					
                    deleteByRole: uriTemplateService.parse("resources/{schemaName}/{id}/permissions/actions/{accessAction}/roles/{role}/")
                }
            };
        }]);
}(angular, module));
