# Baasic Dynamic-Resource AngularJS SDK

Baasic AngularJS Dynamic-Resource library provides access to dynamic-resource resource Baasic Service [REST API](https://api.baasic.com).

## Dependencies

Baasic AngularJS Dynamic-Resource library has the following dependencies:

* [Baasic Core AngularJS SDK](https://github.com/Baasic/baasic-sdk-sdk-angularjs-core)

## Usage

This section will describe how to add the Baasic AngularJS Dynamic-Resource library to your project. If you prefer learning by example please skip to [Demo Section](#demo).

### Adding the Library to your Project

Please add the _Baasic Dynamic-Resource_ include after the _Baasic Angular Core_ include:

```html
<script src='//cdn.net/js/baasic-angular-1.0.0.min.js'></script>
<script src='//cdn.net/js/baasic-angular-dynamic-resource-1.0.0.min.js'></script>
```

The recommended way of serving the library is through a [CDN](http://en.wikipedia.org/wiki/Content_delivery_network) but note that this is not a requirement. If you prefer adding library files directly to your project instead, please modify the includes accordingly.


### Initialization

To be able to use the library you will need to add the Baasic (_baasic.dynamicResource_) dependency to your AngularJS module. This will allow you to use library services described in [Modules Section](#baasic-modules).

```javascript
angular.module('my-module', ["baasic.api", "baasic.dynamicResource"])
```

## Dynamic-Resource Module

Baasic AngularJS Dynamic-Resource services and their functions can be found bellow. For further details please check the [API documentation](#tba)

##### dynamicResourceService

Baasic Dynamic-Resource Service provides an easy way to consume Baasic Dynamic-Resource REST routes.

* `get` - Gets a single dynamic-resource item by Id
* `find` - Finds dynamic-resource items by given criteria
* `create` - Creates a new dynamic-resource item
* `update` - Updates a dynamic-resource item
* `patch` - ??? (TODO)
* `remove` - Deletes a dynamic-resource item
* `permissions.*`
 * `get` - Gets dynamic-resource permissions
 * `update` - Updates dynamic-resource permissions
 * `removeByUser` - ??? (TODO)
 * `removeByRole` - ??? (TODO)
* `routeService` - Provides direct access to `dynamicResourceRouteService`

Here are a few examples on how to use the `dynamicResourceService`:

```javascript
var id = "73a22b5d-e5ef-44f2-9c81-a3fb01063f86";
baasicDynamicResourceService.get(id)
    .success(function(data) {
        // data variable contains a single dynamic-resource object that match the key/id
    });
```

```javascript
var options = { searchQuery: "myQuery", page: 4, rpp: 3 };
baasicDynamicResourceService.find(options)
    .success(function(data) {
        // data variable contains a collection of dynamic-resource objects that match the filtering parameters
    });
```

For functions such as `update` and `remove` that don't use `dynamicResourceRouteService` for obtaining route templates, routes can be obtained from dynamic-resource (HAL enabled) objects like this:

```javascript
var params = baasicApiService.removeParams(dynamicResourceObject);
var uri = params["model"].links('delete').href;
// i.e. if the dynamicResourceObject had the following id: "73a22b5d-e5ef-44f2-9c81-a3fb01063f86"
// the uri would yield "/resources/73a22b5d-e5ef-44f2-9c81-a3fb01063f86"
```

##### dynamicSchemaService

Baasic Dynamic-Schema Service provides an easy way to consume Baasic Dynamic-Schema REST routes. `dynamicSchemaService` functions are not bound to particular dynamic-resource items but are meant to be used on schema resources directly.

* `get` - Gets a single dynamic-schema item by Id
* `find` - Finds dynamic-schema items by given criteria
* `create` - Creates a new dynamic-schema item
* `generate` - ??? (TODO)
* `update` - Updates a dynamic-schema item
* `remove` - Deletes a dynamic-schema item
* `routeService` - Provides direct access to `dynamicSchemaRouteService`

##### RouteServices

Baasic Dynamic-Resource Route Services (`dynamicResourceRouteService`, `dynamicSchemaRouteService`) provide Baasic route templates which can then be expanded to Baasic REST URI's through the [URI Template](https://github.com/Baasic/uritemplate-js) by providing it with an object that contains URI parameters. For example `dynamicResourceService` uses `dynamicResourceRouteService` to obtain a part of needed routes while the other part is obtained through HAL. Route services by convention use the same function names as their corresponding services.

Here is a list of all the `dynamicResourceRouteService` functions:

* __dynamicResourceRouteService__
 * `get`, `find`, `create`
 * `permissions.*` - `get`, `update`, `removeByUser`, `removeByRole`
 * `parse` - Provides direct access to the `uriTemplateService`

* __dynamicSchemaRouteService__
 * `get`, `find`, `create`, `generate`
 * `parse` - Provides direct access to the `uriTemplateService`

URI templates can be expanded manually like this:

```javascript
var params = { searchQuery: "myQuery", page: 4, rpp: 3 };
var uri = dynamicResourceRouteService.find.expand(params);
// uri will yield "/resources/?searchQuery=myQuery&page=4&rpp=3"
```

## Build Process

1. Install [NodeJs](http://nodejs.org/download/)
2. Open Shell/Command Prompt in the Baasic AngularJS folder
3. Run `npm install`
4. Install gulp globally: `npm install -g gulp`
5. Run `gulp`

## Contributing

* [Pull requests are always welcome](https://github.com/Baasic/baasic-sdk-sdk-angularjs-core#pull-requests-are-always-welcome)
* Please [report](https://github.com/Baasic/baasic-sdk-sdk-angularjs-core#issue-reporting) any issues you might  have found
* Help us write the documentation
* Create interesting apps using SDK
* Looking for something else to do? Get in touch..
