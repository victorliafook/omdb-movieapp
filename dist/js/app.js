/*global angular*/
'use strict';
//application written by Victor Lia Fook victorliafook@gmail.com
angular.module('omdbApp', ['ngResource']);
/*
global angular
global $
*/
"use strict";
//application written by Victor Lia Fook victorliafook@gmail.com
angular.module("omdbApp")
    .controller("mainController", ['$scope', 'dataFactory', 'dataService', function($scope, dataFactory, dataService) {
        $scope.resultList = [];
        $scope.feature = {};
        
		$scope.title = "";
		$scope.year = "";
		$scope.type = "";
        $scope.imdbId = "";
        $scope.totalResults = 0;
        $scope.pagination = 1;
        $scope.page = 1;
        $scope.sort = 'Title';
        $scope.alert = "";
        
        $scope.setPage = function(page){
            $scope.page = page;
        };
        
        $scope.cleanSearch = function(){
            $scope.title = "";
    		$scope.year = "";
    		$scope.type = "";
            $scope.imdbId = "";
            
        };
        
        $scope.doSearch = function(){
            
            if($scope.imdbId != ""){
                $scope.findById();
            }else{
                $scope.findByProp();
            }
            
        };
        
        $scope.getFeature = function(id){
            $('#page-loading').fadeIn('fast');
            $scope.findById(id);
        };
        
        $scope.findById = function(id){
             var params = [
                 {key: 'imdbId', value: (id != null) ? id : $scope.imdbId},
                 {key: 'plot', value: 'full'}
            ];
            dataFactory.get(dataService.getQueryObj(params))
            .$promise.then(function(result){
                //console.log(result);
                if(result.Response == 'True'){
                    $scope.feature = result;
                    $scope.feature.rating = null;
                    //search for rotten tomatoes rating and set new properties
                    if($scope.feature.Ratings != null && $scope.feature.Ratings.length > 0){
                        for(var i = 0; i < $scope.feature.Ratings.length; i++){
                            if($scope.feature.Ratings[i].Source == 'Rotten Tomatoes'){
                                var ratVal = parseInt($scope.feature.Ratings[i].Value);
                                $scope.feature.rating = ratVal;
                                if(ratVal < 20) $scope.feature.ratingClass ='danger';
                                else if(ratVal < 50) $scope.feature.ratingClass ='warning';
                                else if(ratVal < 80) $scope.feature.ratingClass ='info';
                                else $scope.feature.ratingClass ='success';
                            }
                        }
                    }
                    //this function is only called without an id directly from the search.
                    if(id == null)
                        $('#detailsModal').modal();
                    $('#page-loading').fadeOut('slow');
                    
                }else{
                    $scope.feature = {};
                    $scope.alert = result.Error;
                    
                }
            });
        };
        
        $scope.findByProp = function(){
            var params = [
                {key: 'title', value: $scope.title},
                {key: 'type', value: $scope.type},
                {key: 'year', value: $scope.year},
                {key: 'page', value: $scope.page}
            ];
            dataFactory.get(dataService.getQueryObj(params)).$promise.then(function(results){
                $scope.alert = "";
                if(results.Response == 'True'){
                    $scope.resultList = results.Search;
                    $scope.totalResults = results.totalResults;
                    $scope.pagination = Math.ceil(results.totalResults / 10);
                    
                }else{
                    $scope.resultList = [];
                    $scope.totalResults = 0;
                    $scope.pagination = 1;
                    $scope.alert = "No results found with this criteria.";
                }
                if($scope.alert == ""){
                    $('#searchModal').modal('hide');
                }
            });
        };
        
        $scope.getTypeClass = function(type){
            if(type == 'movie') return "film";
            if(type == 'series') return "television";
            if(type == 'episode') return "video-camera";
            //default
            return "film";
        };
    }]);
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