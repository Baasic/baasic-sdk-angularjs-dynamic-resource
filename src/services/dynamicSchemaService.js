﻿/**
 * @module baasicDynamicSchemaService
 * @description Baasic Dynamic Schema Service provides an easy way to consume Baasic Dynamic-Schema REST routes. `baasicDynamicSchemaService` functions are not bound to particular dynamic resource schema items but are meant to be used on dynamic resources directly. In order to obtain a needed routes `baasicDynamicSchemaService` uses `baasicDynamicSchemaRouteService`.
*/
(function (angular, module, undefined) {
    "use strict";
    module.service("baasicDynamicSchemaService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicDynamicSchemaRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, dynamicSchemaRouteService) {
            return {
                /**
                * Provides direct access to `baasicDynamicSchemaRouteService`.
                * @method        
                * @example baasicDynamicSchemaService.routeService.get.expand(expandObject);
                **/                
                routeService: dynamicSchemaRouteService,
                 /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of dynamic resource schemas matching the given criteria.
                 * @method        
                 * @example 
baasicDynamicSchemaService.find({
  pageNumber : 1,
  pageSize : 10,
  orderBy : '<name>',
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
                * Returns a promise that is resolved once the create action has been performed, this action creates a new dynamic resource schema item.
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
                 * Returns a promise that is resolved once the update dynamic resource schema action has been performed, this action updates a dynamic resource schema item. This route uses HAL enabled objects to obtain routes and therefore it doesn't use `baasicDynamicSchemaRouteService` route template, here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(dynamicSchemaResource);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.
dynamicSchemaResource.description = '<description>';
baasicDynamicSchemaService.update(dynamicSchemaResource)
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
                * Returns a promise that is resolved once the remove action has been performed. This action removes a dynamic resource schema item from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't use `baasicDynamicSchemaRouteService` route template, here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(dynamicSchemaResource);
var uri = params['model'].links('delete').href;
```
                * @method        
                * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicDynamicSchemaService.remove(dynamicSchemaResource)
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
                }
            };
        }]);
}(angular, module));
/**
 * @copyright (c) 2015 Mono
 * @license MIT
 * @author Mono
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/
