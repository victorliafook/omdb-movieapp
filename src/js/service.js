/*global angular*/
"use strict";
angular.module("omdbApp")
    .constant("baseURL","https://www.omdbapi.com/")
    .factory('dataFactory', ['$resource', 'baseURL', function($resource, baseURL) {
        return $resource(baseURL);
    }])
    .service('dataService', function(){
        
        this.apiKey = 'de4d6fa3'; //my OMDB api key http://www.omdbapi.com/apikey.aspx
        this.urlParams = {imdbId: 'i', title: 's', type: 'type', year: 'y', plot: 'plot', page: 'page'};
        this.getParam = function(param){
            return (this.urlParams[param] !== undefined) ? this.urlParams[param] : null;
        };
        
        this.getQueryObj = function(arr){
            var len = arr.length;
            var retObj = {};
            if(arr === undefined || len <= 0) return retObj;
            
            for(var i = 0; i < len; i++){
                if(arr[i].value == "") continue;
                var paramName = this.getParam(arr[i].key);
                retObj[paramName] = arr[i].value;
            }
            retObj['apikey'] = this.apiKey;
            return retObj;
        };
        
        
    });