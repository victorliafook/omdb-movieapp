"use strict";
angular.module("omdbApp")
    .constant("baseURL","https://www.omdbapi.com/")
    .factory('dataFactory', ['$resource', 'baseURL', function($resource, baseURL) {
        return $resource(baseURL);
    }])
    .service('dataService', function(){
        this.urlParams = {imdbId: 'i', title: 's', type: 'type', year: 'y', plot: 'plot', page: 'page'};
        this.get = function(param){
            return (typeof this.urlParams[param] !== 'undefined') ? this.urlParams[param] : null;
        };
        
        this.getQueryObj = function(arr){
            var len = arr.length;
            var retObj = {};
            if(typeof arr === 'undefined' || len <= 0) return retObj;
            
            var objStr = "{";
            for(var i = 0; i < len; i++){
                if(arr[i].value == "") continue;
                objStr += "\"" + this.get(arr[i].key) + "\": \"" + arr[i].value + "\",";
            }
            
            if(objStr.length > 1){
                objStr = objStr.substring(0, objStr.length - 1) + "}";
            }else{
                objStr = '{}';
            }
            
            try{
                retObj = JSON.parse(objStr);
            }catch(err){
                console.log(err);
                retObj = {};
            }
            return retObj;
        };
        
        
    });