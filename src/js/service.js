"use strict";
angular.module("omdbApp")
    .constant("baseURL","http://www.omdbapi.com/")
    .service('dataService', ['$resource', 'baseURL', function($resource, baseURL) {
            
    }]);