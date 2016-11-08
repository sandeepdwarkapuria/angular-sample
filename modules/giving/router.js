angular
	.module('app')
		.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
			function ($stateProvider, $urlRouterProvider, $locationProvider) {
				$stateProvider	
					.state('default.giveToStaff', {
						parent: 'default',
						url: '/giving/give-to-staff',
						data: {
							roles: []
						},
						views: {
							'content@default': {
								templateUrl: 'public/web/modules/giving/html/index.html',
								controller: 'app.controller.giving.index',
								resolve:{
									staffs : ['staffService', function(staffService){
										return staffService.query().$promise;
									}]
								}
							}
						}
					}).state('default.staffDonation', {
						parent: 'default',
						url: '/team/:team',
						data: {
							roles: ['users']
						},
						views: {
							'content@default': {
								templateUrl: 'public/web/modules/giving/html/staff-donation.html',
								controller: 'app.controller.giving.staffDonation',
								resolve:{
									team : ['staffService', '$stateParams', function(staffService,$stateParams){
										return staffService.get({"id":$stateParams.team}).$promise;
									}]
								}
							}
						}
					}).state('default.giveToMinistryOrProjects', {
						parent: 'default',
						url: '/giving/give-to-ministries-projects',
						data: {
							roles: ['users']
						},
						views: {
							'content@default': {
								templateUrl: 'public/web/modules/giving/html/ministers_or_projects.html',
								controller: 'app.controller.giving.ministryOrProject'
							}
						}
					});
				}])

