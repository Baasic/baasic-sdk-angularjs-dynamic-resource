/**
 * @module baasicDynamicResourceRouteService
**/

/** 
 * @overview Dynamic resource route service.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
    "use strict";
    module.service("baasicDynamicResourceRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
				/**
				* Parses find route which can be expanded with additional options. Supported items are: 
				* - `resourceName` - Name of the dynamic resource.
				* - `searchQuery` - A string referencing resource properties using the phrase or query search.
				* - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
				* - `rpp` - A value used to limit the size of result set per page.
				* - `sort` - A string used to set the role property to sort the result collection by.
				* - `embed` - Comma separated list of resources to be contained within the current representation.
				* @method      
				* @example baasicDynamicResourceRouteService.find.expand({resourceName: "resourceName", searchQuery: "searchTerm"});               
				**/ 			
                find: uriTemplateService.parse("resources/{resourceName}/{?searchQuery,page,rpp,sort,embed,fields}"),
				/**
                * Parses get route which must be expanded with the resource name of the previously created dynamic schema resource in the system and the Id of the previously created dynamic resource. Additional expand supported items are:
				* - `embed` - Comma separated list of resources to be contained within the current representation.
				* @method      
				* @example baasicDynamicResourceRouteService.find.expand({resourceName: "resourceName", id: "uniqueID"});               
				**/ 					
                get: uriTemplateService.parse("resources/{resourceName}/{id}/{?embed,fields}"),
				/**
				* Parses create route, this URI template doesn't expose any additional properties.
				* @method      
				* @example baasicDynamicResourceRouteService.create.expand({});              
				**/  				
                create: uriTemplateService.parse("resources/{resourceName}"),
				/**
				* Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
				* @method
				* @example uriTemplateService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
				**/					
                parse: uriTemplateService.parse,					
                permissions: {
					/**
					* Parses get permissions route, this URI template should be expanded with the Id of the dynamic resource and the dynamic schema name.					
					* @method permissions.get       
					* @example baasicDynamicResourceRouteService.permissions.get.expand({id: "resourceId", resourceName: "resourceName"});               
					**/ 				
                    get: uriTemplateService.parse("resources/{resourceName}/{id}/permissions/{?fields}"),
					/**
					* Parses update permissions route, this URI template should be expanded with the Id of the dynamic resource and the dynamic schema name.			
					* @method permissions.update       
					* @example baasicDynamicResourceRouteService.permissions.update.expand({id: "resourceId", resourceName: "resourceName"});               
					**/ 					
                    update: uriTemplateService.parse("resources/{resourceName}/{id}/permissions/{?fields}"),
					/**
					* Parses deleteByUser permissions route which can be expanded with additional options. Supported items are:
					* - `resourceName` - Name of the dynamic schema resource.
					* - `id` - Id of the dynamic resource.
					* - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified user and article resource.
					* - `user` - A value which uniquely identifies user for which ACL policy needs to be removed.					
					* @method permissions.deleteByUser       
					* @example baasicDynamicResourceRouteService.permissions.deleteByUser.expand({resourceName: "resourceName", id: "resourceId", accessAction: "read", user: "username"});               
					**/ 						
                    deleteByUser: uriTemplateService.parse("resources/{resourceName}/{id}/permissions/actions/{accessAction}/users/{user}/"),
					/**
					* Parses deleteByUser permissions route which can be expanded with additional options. Supported items are:
					* - `resourceName` - Name of the dynamic schema resource.
					* - `id` - Id of the dynamic resource.
					* - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified role and article resource.
					* - `role` - A value which uniquely identifies role for which ACL policy needs to be removed.					
					* @method permissions.deleteByRole       
					* @example baasicArticleRatingsRouteService.permissions.deleteByRole.expand({resourceName: "resourceName", id: "resourceId", accessAction: "read", role: "roleName"});               
					**/ 					
                    deleteByRole: uriTemplateService.parse("resources/{resourceName}/{id}/permissions/actions/{accessAction}/roles/{role}/")
                }
            };
        }]);
}(angular, module));
