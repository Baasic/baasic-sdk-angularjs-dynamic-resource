/*
 Baasic AngularJS Dynamic Resource v1.0.2
 (c) 2014-2017 Mono Ltd.  http://baasic.com
 License: MIT
*/
(function (angular, undefined) {
    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism. An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.dynamicResource` module functionality it must be added as a dependency to your app.
     * @module baasic.dynamicResource 
     * @example
     (function (Main) {
     'use strict';
     var dependencies = [
     'baasic.api',
     'baasic.membership',
     'baasic.security',
     'baasic.appSettings',
     'baasic.article',
     'baasic.dynamicResource',
     'baasic.keyValue',
     'baasic.valueSet'
     ];
     Main.module = angular.module('myApp.Main', dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module("baasic.dynamicResource", ["baasic.api"]);

    module.config(["$provide", function config($provide) {}]);

    /**
     * @module baasicDynamicResourceRouteService
     * @description Baasic Dynamic Resource Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Dynamic Resource Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicDynamicResourceRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `schemaName` - Name of the dynamic resource schema.
                 * - `searchQuery` - A string referencing dynamic resource properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain dynamic resource subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the dynamic resource property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method      
                 * @example 
                 baasicDynamicResourceRouteService.find.expand({
                 schemaName: '<schema-name>', 
                 searchQuery: '<search-phrase>'
                 });
                 **/
                find: uriTemplateService.parse("resources/{schemaName}/{?searchQuery,page,rpp,sort,embed,fields}"),
                /**
                 * Parses get route which must be expanded with the name of the previously created dynamic resource schema in the system and the Id of the previously created dynamic resource. Additional expand supported items are:
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method      
                 * @example 
                 baasicDynamicResourceRouteService.find.expand({
                 schemaName: '<schema-name>', 
                 id: '<schema-id>'
                 });
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
                 * @example 
                 baasicDynamicResourceRouteService.parse(
                 '<route>/{?embed,fields,options}'
                 ).expand(
                 {embed: '<embedded-resource>'}
                 );
                 **/
                parse: uriTemplateService.parse,
                acl: {
                    /**
                     * Parses get acl route; this URI template should be expanded with the Id of the dynamic resource and name of the dynamic resource schema.					
                     * @method acl.get       
                     * @example 
                     baasicDynamicResourceRouteService.acl.get.expand({
                     id: '<dynamic-resource-id>', 
                     schemaName: '<schema-name>'
                     });
                     **/
                    get: uriTemplateService.parse("resources/{schemaName}/{id}/acl/{?fields}"),
                    /**
                     * Parses update acl route; this URI template should be expanded with the Id of the dynamic resource and name of the dynamic resource schema.			
                     * @method acl.update       
                     * @example 
                     baasicDynamicResourceRouteService.acl.update.expand({
                     id: '<dynamic-resource-id>', 
                     schemaName: '<schema-name>'
                     });
                     **/
                    update: uriTemplateService.parse("resources/{schemaName}/{id}/acl/{?fields}"),
                    /**
                     * Parses deleteByUser acl route which can be expanded with additional options. Supported items are:
                     * - `schemaName` - Name of the dynamic resource schema.
                     * - `id` - Id of the dynamic resource.
                     * - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified user and dynamic resource item.
                     * - `user` - A value which uniquely identifies user for which ACL policy needs to be removed.					
                     * @method acl.deleteByUser       
                     * @example 
                     baasicDynamicResourceRouteService.acl.deleteByUser.expand({
                     schemaName: '<schema-name>', 
                     id: '<dynamic-resource-id>', 
                     accessAction: '<access-action>', 
                     user: '<username>'
                     });
                     **/
                    deleteByUser: uriTemplateService.parse("resources/{schemaName}/{id}/acl/actions/{accessAction}/users/{user}/"),
                    /**
                     * Parses deleteByRole acl route which can be expanded with additional options. Supported items are:
                     * - `schemaName` - Name of the dynamic resource schema.
                     * - `id` - Id of the dynamic resource.
                     * - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified role and dynamic resource item.
                     * - `role` - A value which uniquely identifies role for which ACL policy needs to be removed.					
                     * @method acl.deleteByRole       
                     * @example 
                     baasicDynamicResourceRouteService.acl.deleteByRole.expand({
                     schemaName: '<schema-name>', 
                     id: '<dynamic-resource-id>', 
                     accessAction: '<access-action>', 
                     role: '<role-name>'
                     });
                     **/
                    deleteByRole: uriTemplateService.parse("resources/{schemaName}/{id}/acl/actions/{accessAction}/roles/{role}/")
                }
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */

    /**
     * @module baasicDynamicResourceService
     * @description Baasic Dynamic Resource Service provides an easy way to consume Baasic Dynamic Resource REST API end-points. In order to obtain needed routes `baasicDynamicResourceService` uses `baasicDynamicResourceRouteService`.
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicDynamicResourceService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicDynamicResourceRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, dynamicResourceRouteService) {
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of dynamic resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicDynamicResourceService.find('<schema-name>', {
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : '<field>',
                 orderDirection : '<asc|desc>',
                 search : '<search-phrase>'
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
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified dynamic resource.
                 * @method        
                 * @example 
                 baasicDynamicResourceService.get('<schema-name>', '<dynamic-resource-id>')
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
                 * Returns a promise that is resolved once the create dynamic resource action has been performed; this action creates a new dynamic resource item.
                 * @method        
                 * @example 
                 baasicDynamicResourceService.create('<schema-name>', {
                 id : '',
                 description : '<description>'  
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
                 * Returns a promise that is resolved once the update action has been performed; this action updates a dynamic resource item. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicDynamicResourceRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(dynamicResource);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // dynamicResource is a resource previously fetched using get action.
                 dynamicResource.description = '<description>';
                 baasicDynamicResourceService.update(dynamicResource, {
                 query: "where field = 'value' "
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data, options) {
                    var opt = angular.extend({}, options);
                    var params = baasicApiService.updateParams(data);
                    var url = dynamicResourceRouteService.parse(params[baasicConstants.modelPropertyName].links('put').href).expand(opt);
                    return baasicApiHttp.put(url, params[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the patch action has been performed; this action patches an existing dynamic resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicDynamicResourceRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(dynamicResource);
                 var uri = params['model'].links('patch').href;
                 ```
                 * @method        
                 * @example 
                 // dynamicResource is a resource previously fetched using get action.
                 dynamicResource.description = '<new-description>';
                 dynamicResource.newField = '<newfield-value>';
                 baasicDynamicResourceService.update(dynamicResource, {
                 query: "where field = 'value' "
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                patch: function (data, options) {
                    var opt = angular.extend({}, options);
                    var params = baasicApiService.updateParams(data);
                    var url = dynamicResourceRouteService.parse(params[baasicConstants.modelPropertyName].links('patch').href).expand(opt);
                    return baasicApiHttp.patch(url, params[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a dynamic resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicDynamicResourceRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(dynamicResource);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // dynamicResource is a resource previously fetched using get action.
                 baasicDynamicResourceService.remove(dynamicResource, {
                 query: "where field = 'value' "
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data, options) {
                    var opt = angular.extend({}, options);
                    var params = baasicApiService.removeParams(data);
                    var url = dynamicResourceRouteService.parse(params[baasicConstants.modelPropertyName].links('delete').href).expand(opt);
                    return baasicApiHttp.delete(url);
                },
                /**
                 * Provides direct access to `baasicDynamicResourceRouteService`.
                 * @method        
                 * @example baasicDynamicResourceService.routeService.get.expand(expandObject);
                 **/
                routeService: dynamicResourceRouteService,
                acl: {
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns a list of ACL policies established for the specified dynamic resource.
                     * @method acl.get       
                     * @example 
                     baasicDynamicResourceService.acl.get({id: '<dynamic-resource-id>', schemaName: '<schema-name>'})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (options) {
                        var params = angular.extend({}, options);
                        return baasicApiHttp.get(dynamicResourceRouteService.acl.get.expand(params));
                    },
                    /**
                     * Returns a promise that is resolved once the update acl action has been performed; this action creates new ACL policy for the specified dynamic resource.
                     * @method acl.update      
                     * @example 
                     baasicDynamicResourceService.acl.update({id: '<dynamic-resource-id>', schemaName: '<schema-name>'})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (options) {
                        var params = angular.extend({}, options);
                        return baasicApiHttp.put(dynamicResourceRouteService.acl.get.expand(params), params[baasicConstants.modelPropertyName]);
                    },
                    /**
                     * Returns a promise that is resolved once the removeByUser action has been performed. This action deletes ACL policy assigned to the specified user and dynamic resource.
                     * @method acl.deleteByUser      
                     * @example 
                     // dynamicResource is a resource previously fetched using get action.
                     baasicDynamicResourceService.acl.removeByUser('<access-action>', '<username>', dynamicResource)
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
                        return baasicApiHttp.delete(dynamicResourceRouteService.acl.deleteByUser.expand(params));
                    },
                    /**
                     * Returns a promise that is resolved once the removeByRole action has been performed. This action deletes ACL policy assigned to the specified role and dynamic resource.
                     * @method acl.deleteByRole      
                     * @example 
                     // dynamicResource is a resource previously fetched using get action.
                     baasicDynamicResourceService.acl.removeByRole('<access-action>', '<role-name>', dynamicResource)
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
                        return baasicApiHttp.delete(dynamicResourceRouteService.acl.deleteByRole.expand(params));
                    }
                }
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */

    /**
     * @module baasicDynamicSchemaRouteService
     * @description Baasic Dynamic Schema Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Dynamic Schema Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */

    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicDynamicSchemaRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing dynamic resource schema properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain dynamic resource schema subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the dynamic resource schema property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method      
                 * @example 
                 baasicDynamicSchemaRouteService.find.expand(
                 {searchQuery: '<search-phrase>'}
                 );
                 **/
                find: uriTemplateService.parse("schemas/{?searchQuery,page,rpp,sort,embed,fields}"),
                /**
                 * Parses get route which must be expanded with name of the previously created dynamic resource schema. Additional expand supported items are:
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method      
                 * @example 
                 baasicDynamicSchemaRouteService.find.expand(
                 {name: '<schema-name>'}
                 );
                 **/
                get: uriTemplateService.parse("schemas/{name}/{?embed,fields}"),
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
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicDynamicSchemaRouteService.parse(
                 '<route>/{?embed,fields,options}'
                 ).expand(
                 {embed: '<embedded-resource>'}
                 );
                 **/
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */
    /**
     * @module baasicDynamicSchemaService
     * @description Baasic Dynamic Schema Service provides an easy way to consume Baasic Dynamic Schema REST API end-points. In order to obtain needed routes `baasicDynamicSchemaService` uses `baasicDynamicSchemaRouteService`.
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicDynamicSchemaService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicDynamicSchemaRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, dynamicSchemaRouteService) {
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of dynamic resource schemas matching the given criteria.
                 * @method        
                 * @example 
                 baasicDynamicSchemaService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : '<field>',
                 orderDirection : '<asc|desc>',
                 search : '<search-phrase>'
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
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified dynamic resource schema.
                 * @method        
                 * @example 
                 baasicDynamicSchemaService.get('<schema-name>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (name, options) {
                    return baasicApiHttp.get(dynamicSchemaRouteService.get.expand(baasicApiService.getParams(name, options, 'name')));
                },
                /**
                 * Returns a promise that is resolved once the create action has been performed; this action creates a new dynamic resource schema item.
                 * @method        
                 * @example 
                 baasicDynamicSchemaService.create({
                 schema : {
                 type : 'object',
                 properties : {
                 id : {
                 title : '<unique-identifier-field>',
                 readonly : true,
                 hidden : true,
                 type : 'string'
                 },
                 description : {
                 type: string
                 }
                 }
                 },
                 name : '<schema-name>',
                 description : '<description>',
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
                 * Returns a promise that is resolved once the update dynamic resource schema action has been performed; this action updates a dynamic resource schema item. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicDynamicSchemaRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(dynamicResourceSchema);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // dynamicResourceSchema is a resource previously fetched using get action.
                 dynamicResourceSchema.description = '<description>';
                 baasicDynamicSchemaService.update(dynamicResourceSchema)
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
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a dynamic resource schema item from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicDynamicSchemaRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(dynamicResourceSchema);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // dynamicResourceSchema is a resource previously fetched using get action.
                 baasicDynamicSchemaService.remove(dynamicResourceSchema)
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
                 * Returns a promise that is resolved once the generate schema action has been performed. Success response returns a schema generated based on the json input.
                 * @method        
                 * @example 			 
                 baasicDynamicSchemaService.generate({
                 id : '<schema-Id>',
                 description : '<description>'
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
                },
                /**
                 * Provides direct access to `baasicDynamicSchemaRouteService`.
                 * @method        
                 * @example baasicDynamicSchemaService.routeService.get.expand(expandObject);
                 **/
                routeService: dynamicSchemaRouteService
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */

})(angular);