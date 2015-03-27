# Baasic Dynamic-Resource AngularJS SDK

Baasic AngularJS Dynamic-Resource library provides access to dynamic-resource Baasic Service [REST API](https://api.baasic.com/vX).

## Dependencies

Baasic AngularJS Dynamic-Resource library has the following dependencies:

* [Baasic Core AngularJS SDK](../../../baasic-sdk-angularjs-core)

## Usage

This section will describe how to add the Baasic AngularJS Dynamic-Resource library to your project.

### Adding the Library to your Project

Please add the _Baasic Dynamic-Resource_ include after the _Baasic Angular Core_ include:

```html
<script src='//cdn.net/js/baasic-angular-1.0.0.min.js'></script>
<script src='//cdn.net/js/baasic-angular-dynamic-resource-1.0.0.min.js'></script>
```

The recommended way of serving the library is through a [CDN](http://en.wikipedia.org/wiki/Content_delivery_network) but note that this is not a requirement. If you prefer adding library files directly to your project instead, please modify the includes accordingly.


### Initialization

To be able to use the library you will need to add the Baasic (_baasic.dynamicResource_) dependency to your AngularJS module.

```javascript
angular.module('my-module', ["baasic.api", "baasic.dynamicResource"])
```

## Build Process

1. Install [NodeJs](http://nodejs.org/download/)
2. Open Shell/Command Prompt in the Baasic AngularJS folder
3. Run `npm install`
4. Install gulp globally: `npm install -g gulp`
5. Run `gulp`

## Contributing

* [Pull requests are always welcome](../../../baasic-sdk-angularjs-dynamic-resource/pulls)
* Please [report](../../../baasic-sdk-angularjs-dynamic-resource/issues) any issues you might have found
* Help us write the documentation
* Create interesting apps using SDK
* Looking for something else to do? Get in touch..
