// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  dgraphUrl: 'http://a810bf34250614537b70a9076266fc1b-801809582.us-west-2.elb.amazonaws.com/dgraph-alpha-http',
  dgraphBasicAuthEnabled: true,
  dgraphBasicAuth: 'Basic YWRtaW46YWRtaW4=',
  f1EndpointUrl: 'http://localhost:8043/http://52.22.89.56:5408',
  airEndpointUrl: 'http://a810bf34250614537b70a9076266fc1b-801809582.us-west-2.elb.amazonaws.com',
  remoteGatewayUrl: 'http://localhost:8043',
  localGatewayUrl: 'https://localhost:8443'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
