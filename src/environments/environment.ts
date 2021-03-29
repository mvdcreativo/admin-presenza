// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API: "http://presenza_api_v1.test/api/",
  APIAuth: "http://presenza_api_v1.test/api/auth/",

  API_KEY_GM : "AIzaSyBgkTr7pr2hwsa4Gkk499GLfcm01j0CsvQ",

  ////ROUTES API
  routesCRUD: {
    products: "properties",
    states: "provinces",
    cities: "cities",
    countries: "countries",
    features: "features",
    municipalities: "municipalities",
    neighborhoods: "neighborhoods",
    categories: "property_types",
    transactionTypes: "transaction_types",
    publications: "publications",
    currencies: "currencies",
    users: "users",
    expenses: "expenses",
    transactions: "transactions",
    properties_user: "properties_user"

  }


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
