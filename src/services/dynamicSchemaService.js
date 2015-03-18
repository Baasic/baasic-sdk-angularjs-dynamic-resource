/**
 * @module baasicDynamicSchemaService
 * @description Baasic Dynamic-Schema Service provides an easy way to consume Baasic Dynamic-Schema REST routes. `baasicDynamicSchemaService` functions are not bound to particular dynamic-resource items but are meant to be used on schema resources directly.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
    "use strict";
    module.service("baasicDynamicSchemaService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicDynamicSchemaRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, dynamicSchemaRouteService) {
            return {
                routeService: dynamicSchemaRouteService,
                 /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of dynamic resource shemas.
                 * @method        
                 * @example 
baasicDynamicSchemaService.find({
  pageNumber : 1,
  pageSize : 10,
  orderBy : "name",
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
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the dynamic resource shema.
                 * @method        
                 * @example 
baasicDynamicSchemaService.get("name")
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
  name : "name",
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
                 * Returns a promise that is resolved once the update dynamic resource shema action has been performed.
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