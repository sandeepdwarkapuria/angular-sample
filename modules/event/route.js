angular
	.module('app')
		.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
			function ($stateProvider, $urlRouterProvider, $locationProvider) {
				$stateProvider	
					.state('default.event', {
						parent: 'default',
						url: '/event',
						data: {
							roles: []
						},
						views: {
							'content@default': {
								templateUrl: 'public/web/modules/event/html/index.html',
								controller: 'app.controller.event.index',
								resolve:{
									events : ['competitionService', function(competitionService){
										return competitionService.query().$promise;
									}]
								}
							}
						}
					})
					.state('default.eventView', {
						parent: 'default',
						url: '/event/view/:eventId',
						data: {
							roles: []
						},
						views: {
							'content@default': {
								templateUrl: 'public/web/modules/event/html/view.html',
								controller: 'app.controller.event.view',
								resolve:{
									event : ['competitionService','$stateParams', function(competitionService,$stateParams){
										return competitionService.get({id: $stateParams.eventId}).$promise;
									}]
								}
							}
						}
					})
					.state('default.eventRegister', {
						parent: 'default',
						url: '/event/register/:eventId',
						data: {
							roles: []
						},
						views: {
							'content@default': {
								templateUrl: 'public/web/modules/event/html/register.html',
								controller: 'app.controller.event.register',
								resolve:{
									event : ['competitionService','$stateParams', function(competitionService,$stateParams){
										return competitionService.get({id: $stateParams.eventId}).$promise;
									}]
								}
							}
						}
					})
			}
		])