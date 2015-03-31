/**
 * @module baasicDynamicResourceService
 * @description Baasic Dynamic Resource Service provides an easy way to consume Baasic Dynamic Resource REST API.
 * @copyright (c) 2015 Mono
 * @license MIT
 * @author Mono
*/
(function (angular, module, undefined) {
    "use strict";
    module.service("baasicDynamicResourceService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicDynamicResourceRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, dynamicResourceRouteService) {
            return {
                /**
                * Provides direct access to `baasicDynamicResourceRouteService`.
                * @method        
                * @example baasicDynamicResourceRouteService.routeService.get.expand(expandObject);
                **/              
                routeService: dynamicResourceRouteService,
                 /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of dynamic resources matching the given criteria.
                 * @method        
                 * @example 
baasicDynamicResourceService.find({
  pageNumber : 1,
  pageSize : 10,
  orderBy : "<dateCreated>",
  orderDirection : "<desc>",
  search : "<search-phrase>"
})
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                **/ 				
                find: function (schemaName, options) {
                    return baasicApiHttp.get(dynamicResourceRouteService.find.expand(baasicApiService.findParams(angular.extend({ schemaName: schemaName }, options))));
                },
                 /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified dynamic resource.
                 * @method        
                 * @example 
baasicDynamicResourceService.get("<schema-Nnme>", "<dynamic-resource-id>")
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/ 				
                get: function (schemaName, id, options) {
                    return baasicApiHttp.get(dynamicResourceRouteService.get.expand(baasicApiService.getParams(id, angular.extend({ schemaName: schemaName }, options))));
                },
                 /**
                 * Returns a promise that is resolved once the create dynamic resource action has been performed, this action creates a new dynamic resource item.
                 * @method        
                 * @example 
baasicDynamicResourceService.create({
  id : "",
  description : "<description>"  
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
                 * Returns a promise that is resolved once the update action has been performed, this action updates a dynamic resource item. This function doesn't use `baasicDynamicResourceRouteService` for obtaining route templates, however `update` route can be obtained from dynamic resource (HAL enabled) objects like this:
```
var params = baasicApiService.removeParams(dynamicResourceObject);
var uri = params["model"].links('put').href;
```
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.
existingResource.description = '<description>';
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
                 * Returns a promise that is resolved once the patch action has been performed, this action patches an existing dynamic resource. This function doesn't use `baasicDynamicResourceRouteService` for obtaining route templates, however `patch` route can be obtained from dynamic resource (HAL enabled) objects like this:
```
var params = baasicApiService.removeParams(dynamicResourceObject);
var uri = params["model"].links('patch').href;
```
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.
existingResource.description = '<new-description>';
existingResource.newField = '<newfield-value>';
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
                 * Returns a promise that is resolved once the remove action has been performed. This action removes a dynamic resource from the system if successfully completed. This function doesn't use `baasicDynamicResourceRouteService` for obtaining route templates, however `remove` route can be obtained from dynamic resource (HAL enabled) objects like this:
```
var params = baasicApiService.removeParams(dynamicResourceObject);
var uri = params["model"].links('delete').href;
```
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
                    * Returns a promise that is resolved once the get action has been performed. Success response returns a list of dynamic resource permissions.
                    * @method permissions.get       
                    * @example 
baasicDynamicResourceService.permissions.get({id: "<dynamic-resource-id>", schemaName: "<schema-name>"})
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
                    * Returns a promise that is resolved once the update permissions action has been performed, this action updates dynamic resource permissions.
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
baasicDynamicResourceService.permissions.removeByUser("<access-action>", "<username>", existingResource)
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
baasicDynamicResourceService.permissions.removeByRole("<access-action>", "<role-name>", existingResource)
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
