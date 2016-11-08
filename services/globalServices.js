angular
	.module('app')
	.factory('staffService', function($resource) {
		return $resource('webServices/staff/:id',{ id: "@id" },
			{
				'query':  {method:'GET',isArray:false }
			});
	})
	.factory('userDetailsService', function($resource) {
		return $resource('webServices/user-details'	);
	})
	.factory('queryFormService', function($resource) {
		return $resource('webServices/query-form');
	})
	.factory('advancedSearchService' , function($resource){
		return $resource('webServices/search-ngo');
	})
	.factory('competitionService' , function($resource){
		return $resource('webServices/competition/:id', {id:"@id"} ,{
			'query':  { method:'GET', isArray:false }
		});
	})
	.factory('registerService' , function($resource){
		return $resource('webServices/registration');
	})
	
	

