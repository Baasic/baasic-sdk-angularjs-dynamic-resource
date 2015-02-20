(function (angular, undefined) {
    /** 
     * @overview The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */

    /**
     * An angular module is a container for the different parts of your app - services, directives etc. In order to use baasic.dynamicResource module functionality it must be added as a dependency to your app.
     * @module baasic.dynamicResource 
     * @example
     (function (Main) {
     "use strict";
     var dependencies = [
     "baasic.api",
     "baasic.membership",
     "baasic.security",
     "baasic.appSettings",
     "baasic.article",
     "baasic.dynamicResource",
     "baasic.keyValue",
     "baasic.valueSet"
     ];
     Main.module = angular.module("myApp.Main", dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module("baasic.dynamicResource", ["baasic.api"]);

    module.config(["$provide", function config($provide) {}]);

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
        module.service("baasicDynamicResourceRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `schemaName` - Name of the dynamic resource.
                 * - `searchQuery` - A string referencing resource properties using the phrase or query search.
                 * - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the role property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method      
                 * @example baasicDynamicResourceRouteService.find.expand({schemaName: "schemaName", searchQuery: "searchTerm"});               
                 **/
                find: uriTemplateService.parse("resources/{schemaName}/{?searchQuery,page,rpp,sort,embed,fields}"),
                /**
                 * Parses get route which must be expanded with the resource name of the previously created dynamic schema resource in the system and the Id of the previously created dynamic resource. Additional expand supported items are:
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method      
                 * @example baasicDynamicResourceRouteService.find.expand({schemaName: "schemaName", id: "uniqueID"});               
                 **/
                get: uriTemplateService.parse("resources/{schemaName}/{id}/{?embed,fields}"),
                /**
                 * Parses create route, this URI template doesn't expose any additional properties.
                 * @method      
                 * @example baasicDynamicResourceRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse("resources/{schemaName}"),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example uriTemplateService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
                 **/
                parse: uriTemplateService.parse,
                permissions: {
                    /**
                     * Parses get permissions route; this URI template should be expanded with the Id of the dynamic resource and the dynamic schema name.					
                     * @method permissions.get       
                     * @example baasicDynamicResourceRouteService.permissions.get.expand({id: "resourceId", schemaName: "schemaName"});               
                     **/
                    get: uriTemplateService.parse("resources/{schemaName}/{id}/permissions/{?fields}"),
                    /**
                     * Parses update permissions route; this URI template should be expanded with the Id of the dynamic resource and the dynamic schema name.			
                     * @method permissions.update       
                     * @example baasicDynamicResourceRouteService.permissions.update.expand({id: "resourceId", schemaName: "schemaName"});               
                     **/
                    update: uriTemplateService.parse("resources/{schemaName}/{id}/permissions/{?fields}"),
                    /**
                     * Parses deleteByUser permissions route which can be expanded with additional options. Supported items are:
                     * - `schemaName` - Name of the dynamic schema resource.
                     * - `id` - Id of the dynamic resource.
                     * - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified user and article resource.
                     * - `user` - A value which uniquely identifies user for which ACL policy needs to be removed.					
                     * @method permissions.deleteByUser       
                     * @example baasicDynamicResourceRouteService.permissions.deleteByUser.expand({schemaName: "schemaName", id: "resourceId", accessAction: "read", user: "username"});               
                     **/
                    deleteByUser: uriTemplateService.parse("resources/{schemaName}/{id}/permissions/actions/{accessAction}/users/{user}/"),
                    /**
                     * Parses deleteByUser permissions route which can be expanded with additional options. Supported items are:
                     * - `schemaName` - Name of the dynamic schema resource.
                     * - `id` - Id of the dynamic resource.
                     * - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified role and article resource.
                     * - `role` - A value which uniquely identifies role for which ACL policy needs to be removed.					
                     * @method permissions.deleteByRole       
                     * @example baasicArticleRatingsRouteService.permissions.deleteByRole.expand({schemaName: "schemaName", id: "resourceId", accessAction: "read", role: "roleName"});               
                     **/
                    deleteByRole: uriTemplateService.parse("resources/{schemaName}/{id}/permissions/actions/{accessAction}/roles/{role}/")
                }
            };
        }]);
    }(angular, module));

    /**
     * @module baasicDynamicResourceService
     **/

    /** 
     * @overview Dynamic resource service.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicDynamicResourceService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicDynamicResourceRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, dynamicResourceRouteService) {
            return {
                routeService: dynamicResourceRouteService,
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of dynamic resources.
                 * @method        
                 * @example 
                 baasicDynamicResourceService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : "dateCreated",
                 orderDirection : "desc",
                 search : "searchTerm"
                 })
                 .success(function (collection) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                find: function (schemaName, options) {
                    return baasicApiHttp.get(dynamicResourceRouteService.find.expand(baasicApiService.findParams(angular.extend({
                        schemaName: schemaName
                    }, options))));
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the dynamic resource.
                 * @method        
                 * @example 
                 baasicDynamicResourceService.get("schemaName", "resourceId")
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (schemaName, id, options) {
                    return baasicApiHttp.get(dynamicResourceRouteService.get.expand(baasicApiService.getParams(id, angular.extend({
                        schemaName: schemaName
                    }, options))));
                },
                /**
                 * Returns a promise that is resolved once the create dynamic resource action has been performed.
                 * @method        
                 * @example 
                 baasicDynamicResourceService.create({
                 id : "",
                 description : "test"  
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (schemaName, data) {
                    var params = baasicApiService.getParams(schemaName, data, 'schemaName');
                    return baasicApiHttp.post(dynamicResourceRouteService.create.expand(params), baasicApiService.createParams(params)[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the update action has been performed.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 existingResource.description = 'updated description';
                 baasicDynamicResourceService.update(existingResource)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the patch action has been performed.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 existingResource.description = 'updated description';
                 existingResource.newField = 'new field added';
                 baasicDynamicResourceService.update(existingResource)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                patch: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('patch').href, params[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. If the action is successfully completed the dynamic resource is permanently removed from the system.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 baasicDynamicResourceService.remove(existingResource)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                permissions: {
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns a list of permissions.
                     * @method permissions.get       
                     * @example 
                     baasicDynamicResourceService.permissions.get({id: "uniqueId", schemaName: "schemaName"})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (options) {
                        var params = angular.extend({}, options);
                        return baasicApiHttp.get(dynamicResourceRouteService.permissions.get.expand(params));
                    },
                    /**
                     * Returns a promise that is resolved once the update permissions action has been performed.
                     * @method permissions.update      
                     * @example 
                     // Existing resource is a resource previously fetched using get action.
                     baasicDynamicResourceService.permissions.update(existingResource)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (options) {
                        var params = angular.extend({}, options);
                        return baasicApiHttp.put(dynamicResourceRouteService.permissions.get.expand(params), params[baasicConstants.modelPropertyName]);
                    },
                    /**
                     * Returns a promise that is resolved once the removeByUser action has been performed. This action deletes all ACL assigned to the specified user and dynamic resource.
                     * @method permissions.update      
                     * @example 
                     // Existing resource is a resource previously fetched using get action.
                     baasicDynamicResourceService.permissions.removeByUser("read", "userName", existingResource)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    removeByUser: function (action, user, data) {
                        var params = baasicApiService.removeParams(data);
                        params.user = user;
                        params.accessAction = action;
                        return baasicApiHttp.delete(dynamicResourceRouteService.permissions.deleteByUser.expand(params));
                    },
                    /**
                     * Returns a promise that is resolved once the removeByRole action has been performed. This action deletes all ACL assigned to the specified role and dynamic resource.
                     * @method permissions.update      
                     * @example 
                     // Existing resource is a resource previously fetched using get action.
                     baasicDynamicResourceService.permissions.removeByRole("read", "role name", existingResource)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
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

    /**
     * @module baasicDynamicSchemaRouteService
     **/

    /** 
     * @overview Dynamic schema route service.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */

    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicDynamicSchemaRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing resource properties using the phrase or query search.
                 * - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the role property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method      
                 * @example baasicDynamicSchemaRouteService.find.expand({searchQuery: "searchTerm"});               
                 **/
                find: uriTemplateService.parse("schemas/{?searchQuery,page,rpp,sort,embed,fields}"),
                /**
                 * Parses get route which must be expanded with the resource name of the previously created resource in the system. Additional expand supported items are:
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method      
                 * @example baasicDynamicSchemaRouteService.find.expand({schemaName: "schemaName"});               
                 **/
                get: uriTemplateService.parse("schemas/{schemaName}/{?embed,fields}"),
                /**
                 * Parses create route; this URI template doesn't expose any additional properties.
                 * @method      
                 * @example baasicDynamicSchemaRouteService.create.expand({});              
                 **/
                generate: uriTemplateService.parse("schemas/generate"),
                /**
                 * Parses create route; this URI template doesn't expose any additional properties.
                 * @method      
                 * @example baasicDynamicSchemaRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse("schemas"),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example uriTemplateService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
                 **/
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    /**
     * @module baasicDynamicSchemaService
     **/

    /** 
     * @overview Dynamic schema service.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicDynamicSchemaService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicDynamicSchemaRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, dynamicSchemaRouteService) {
            return {
                routeService: dynamicSchemaRouteService,
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of dynamic resources.
                 * @method        
                 * @example 
                 baasicDynamicSchemaService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : "schemaName",
                 orderDirection : "desc",
                 search : "searchTerm"
                 })
                 .success(function (collection) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                find: function (options) {
                    return baasicApiHttp.get(dynamicSchemaRouteService.find.expand(baasicApiService.findParams(options)));
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the dynamic resource.
                 * @method        
                 * @example 
                 baasicDynamicSchemaService.get("schemaName")
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (schemaName, options) {
                    return baasicApiHttp.get(dynamicSchemaRouteService.get.expand(baasicApiService.getParams(schemaName, options, 'schemaName')));
                },
                /**
                 * Returns a promise that is resolved once the create action has been performed.
                 * @method        
                 * @example 
                 baasicDynamicSchemaService.create({
                 schema : {
                 type : "object",
                 properties : {
                 id : {
                 title : "Unique Identifier Field",
                 readonly : true,
                 hidden : true,
                 type : "string"
                 },
                 description : {
                 type: string
                 }
                 }
                 },
                 schemaName : "schemaName",
                 description : "test",
                 enforceSchemaValidation : true
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApiHttp.post(dynamicSchemaRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the update dynamic resource action has been performed.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 existingResource.description = "updated description";
                 baasicDynamicSchemaService.update(existingResource)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. If the action is successfully completed the resource is permanently removed from the system.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 baasicDynamicSchemaService.remove(existingResource)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                 * Returns a promise that is resolved once the generate schema action has been performed. Success response returns a schema generated based on json input.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 baasicDynamicSchemaService.generate({
                 id : "Unique identifier is handled automatically by the Baasic back - end",
                 description : "Dynamic Schema"
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                generate: function (data) {
                    return baasicApiHttp.post(dynamicSchemaRouteService.generate.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                }
            };
        }]);
    }(angular, module));
})(angular);