angular
	.module('app')
		.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
			function ($stateProvider, $urlRouterProvider, $locationProvider) {
				$stateProvider	
					.state('default.home', {
						parent: 'default',
						url: '/',
						data: {
							roles: []
						},
						views: {
							'content@default': {
								templateUrl: 'public/web/modules/home/html/index.html',
								controller: 'app.controller.home.index'
							}
						}
					})
					.state('default.advancedSearch', {
						parent: 'default',
						url: '/advanced-search?ngo?cause',
						data: {
							roles: []
						},
						views: {
							'content@default': {
								templateUrl: 'public/web/modules/home/html/advanced-search.html',
								controller: 'app.controller.home.search',
								resolve: {
									searchList : ['advancedSearchService', '$stateParams', function(advancedSearchService,$stateParams){
										return advancedSearchService.save($stateParams).$promise;
									}]
								}
							}
						}
					})
					.state('default.ngoDonation', {
						parent: 'default',
						url: '/ngo/:team',
						data: {
							roles: ['users']
						},
						views: {
							'content@default': {
								templateUrl: 'public/web/modules/home/html/ngo-donation.html',
								controller: 'app.controller.home.ngoDonation',
								resolve:{
									team : ['staffService', '$stateParams', function(staffService,$stateParams){
										return staffService.get({"id":$stateParams.team, 'type': 'ngo' }).$promise;
									}]
								}
							}
						}
					})
					.state('success', {
						parent: 'default',
						url: '/donation/successfully',
						data: {

						},
						views: {
							'content@default': {
								templateUrl: 'public/web/modules/home/html/thanku.html',
								resolve:{

								}
							}
						}
					})
				}])

