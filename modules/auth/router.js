angular
	.module('app')
		.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
			function ($stateProvider, $urlRouterProvider, $locationProvider) {
				$stateProvider	
					.state('default.login', {
						parent: 'default',
						url: '/donor/login',
						data: {
							roles: []
						},
						views: {
							'content@default': {
								templateUrl: 'public/web/modules/auth/html/index.html',
								controller: 'app.controller.auth.index'
							}
						}
					}).state('default.register', {
						parent: 'default',
						url: '/donor/register',
						data: {
							roles: []
						},
						views: {
							'content@default': {
								templateUrl: 'public/web/modules/auth/html/register.html',
								controller: 'app.controller.auth.register'
							}
						}
					})
					.state('church', {
						parent: 'default',
						url: '/church/register',
						data: {
							roles: []
						},
						views: {
							'content@default': {
								templateUrl: 'public/web/modules/auth/html/church.html',
								controller: 'app.controller.auth.register'
							}
						}
					})
				}])

