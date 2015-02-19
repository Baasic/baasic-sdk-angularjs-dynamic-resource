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
    module.service("baasicDynamicResourceService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicDynamicResourceRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, dynamicResourceRouteService) {
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
                find: function (resourceName, options) {
                    return baasicApiHttp.get(dynamicResourceRouteService.find.expand(baasicApiService.findParams(angular.extend({ resourceName: resourceName }, options))));
                },
                 /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the dynamic resource.
                 * @method        
                 * @example 
baasicDynamicResourceService.get("resourceName", "resourceId")
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/ 				
                get: function (resourceName, id, options) {
                    return baasicApiHttp.get(dynamicResourceRouteService.get.expand(baasicApiService.getParams(id, angular.extend({ resourceName: resourceName }, options))));
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
                create: function (resourceName, data) {
                    var params = baasicApiService.getParams(resourceName, data, 'resourceName');
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
baasicDynamicResourceService.permissions.get({id: "uniqueId", resourceName: "resourceName"})
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
