angular.module('app', ['ui.router', 'ngResource', 'duScroll', 'ngDialog', 'ui.bootstrap', 'vcRecaptcha', 'ngTable', 'ui.select', 'ui.validate'])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
            //$locationProvider.hashPrefix('!');

            $urlRouterProvider.otherwise('/');

            $stateProvider.state('auth', {
                'abstract': true,
                resolve: {
                    authorize: ['authorization',
                        function (authorization) {
                            return authorization.authorize();
                        }
                    ]
                }
            }).state('default', {
                parent: 'auth',
                templateUrl: 'public/web/layouts/default.html',
                views: {
                    '@': {
                        templateUrl: 'public/web/layouts/default.html',
                    }
                }
            }).state('default.account', {
                parent: 'default',
                url: '/account',
                data: {
                    roles: ['users','administrators']
                },
                views: {
                    'content@default': {
                        templateUrl: 'public/web/modules/account/html/index.html',
                        controller: function () {

                        }
                    }
                }
            });

        }
    ])

    .run(['$rootScope', '$state', '$stateParams', 'authorization', 'principal','$document',
        function ($rootScope, $state, $stateParams, authorization, principal, $document) {

            $rootScope.loading = false;

            $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
                $rootScope.event = event;
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;
                if(principal.isIdentityResolved())
                    authorization.authorize();

                if(angular.isUndefined($state.current.abstract) && toState.data.roles.length > 0 && !principal.isAuthenticated()){
                    event.preventDefault();
                }
            });

            $rootScope.$on('$stateChangeSuccess', function () {
                $rootScope.loading = false;
            });

            $rootScope.$on('$stateChangeError', function () {
                $rootScope.loading = false;
            });

            $rootScope.$on('$stateAccessPassed', function () {
                $rootScope.loading = true;
                $document.scrollTopAnimated(0, 400);
            });

            $rootScope.$on('$stateAccessDenied', function () {
                console.log('Error code: 403');
                $rootScope.loading = false;
            });

            $rootScope.$on('$stateRestricted', function () {
                console.log('Error code: 401');
                $rootScope.loading = false;

                if($state.current.abstract){
                    $state.go('default.login');
                }else{
                    $rootScope.registerPopup();
                }
            });
        }
    ])

    /* main app controller */
    .controller('app.controller.main',
        ['$scope','$rootScope', '$state', 'principal', '$http', '$uibModal', '$sce','dateFormat','countries',
        function ($scope, $rootScope, $state, principal, $http, $uibModal, $sce,dateFormat,countries) {


            $scope.recaptchaKey = '6LcsLygTAAAAAJCMS3R292kS8n2k94zXL0aKyK--';
            $scope.dateFormat = dateFormat;
            $scope.countries = countries;

            /* alert */
            $scope.alerts = [];

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

            $scope.trustAsHtml = function (value) {
                return $sce.trustAsHtml(value);
            }

            $scope.principal = principal;

            $scope.logout = function () {
                $http.get('logout', {ignoreErrors: true})
                    .success(function (res) {
                        principal.authenticate(null);
                        $state.go('default.home');

                        /*if(res.status = "ok"){
                         principal.authenticate(null);
                         $state.go('default.home');
                         }else if(res.status = "error"){

                         }*/

                    })
                    .error(function () {

                    });


            };

            $rootScope.registerPopup = function(){
              // $('body').find('.afterAuth').removeClass('afterAuth');
               //angular.element($event.target).addClass('afterAuth');
                var modalInstance = $uibModal.open({
                  //  animation: true,
                    scope : $scope,
                    templateUrl: 'register.html',
                    controller: 'app.controller.auth.register',
                    size: 'lg',
                    resolve: {

                    }
                });

                modalInstance.result.then(function () {

                }, function () {
                    // $log.info('Modal dismissed at: ' + new Date());
                });
            }

            $rootScope.loginPopup = function(){
                var modalInstance = $uibModal.open({
                   // animation: true,
                    scope : $scope,
                    templateUrl: 'login.html',
                    controller: 'app.controller.auth.index',
                    size: 'lg',
                    resolve: {

                    }
                });

                modalInstance.result.then(function () {
                }, function () {
                    // $log.info('Modal dismissed at: ' + new Date());
                });
            }

        }
    ])
    // date foramt
    .constant('dateFormat', { style1 : 'mm/dd/yyyy', styleMoment : "MM/DD/YYYY"})

    .constant('countries', 
        [
         { "name" : "Singapore" ,"value":"Singapore"},
         { "name" : "Malaysia" ,"value":"Malaysia"},
         { "name" : "China" ,"value":"China"},
         { "name" : "USA" ,"value":"USA"},
         { "name" : "Afghanistan" ,"value":"Afghanistan"},
         { "name" : "Albania" ,"value":"Albania"},
         { "name" : "Algeria" ,"value":"Algeria"},
         { "name" : "Andorra" ,"value":"Andorra"},
         { "name" : "Angola" ,"value":"Angola"},
         { "name" : "Antigua &amp; Deps" ,"value":"Antigua &amp; Deps"},
         { "name" : "Argentina" ,"value":"Argentina"},
         { "name" : "Armenia" ,"value":"Armenia"},
         { "name" : "Austria" ,"value":"Austria"},
         { "name" : "Azerbaijan" ,"value":"Azerbaijan"},
         { "name" : "Bahamas" ,"value":"Bahamas"},
         { "name" : "Bahrain" ,"value":"Bahrain"},
         { "name" : "Bangladesh" ,"value":"Bangladesh"},
         { "name" : "Barbados" ,"value":"Barbados"},
         { "name" : "Belarus" ,"value":"Belarus"},
         { "name" : "Belgium" ,"value":"Belgium"},
         { "name" : "Belize" ,"value":"Belize"},
         { "name" : "Benin" ,"value":"Benin"},
         { "name" : "Bhutan" ,"value":"Bhutan"},
         { "name" : "Bolivia" ,"value":"Bolivia"},
         { "name" : "Bosnia Herzegovina" ,"value":"Bosnia Herzegovina"},
         { "name" : "Botswana" ,"value":"Botswana"},
         { "name" : "Brazil" ,"value":"Brazil"},
         { "name" : "Brunei" ,"value":"Brunei"},
         { "name" : "Bulgaria" ,"value":"Bulgaria"},
         { "name" : "Burkina" ,"value":"Burkina"},
         { "name" : "Burundi" ,"value":"Burundi"},
         { "name" : "Cambodia" ,"value":"Cambodia"},
         { "name" : "Cameroon" ,"value":"Cameroon"},
         { "name" : "Canada" ,"value":"Canada"},
         { "name" : "Cape Verde" ,"value":"Cape Verde"},
         { "name" : "Central African Rep" ,"value":"Central African Rep"},
         { "name" : "Chad" ,"value":"Chad"},
         { "name" : "Chile" ,"value":"Chile"},
         { "name" : "Colombia" ,"value":"Colombia"},
         { "name" : "Comoros" ,"value":"Comoros"},
         { "name" : "Congo" ,"value":"Congo"},
         { "name" : "Congo {Democratic Rep}" ,"value":"Congo {Democratic Rep}"},
         { "name" : "Costa Rica" ,"value":"Costa Rica"},
         { "name" : "Croatia" ,"value":"Croatia"},
         { "name" : "Cuba" ,"value":"Cuba"},
         { "name" : "Cyprus" ,"value":"Cyprus"},
         { "name" : "Czech Republic" ,"value":"Czech Republic"},
         { "name" : "Denmark" ,"value":"Denmark"},
         { "name" : "Djibouti" ,"value":"Djibouti"},
         { "name" : "Dominica" ,"value":"Dominica"},
         { "name" : "Dominican Republic" ,"value":"Dominican Republic"},
         { "name" : "East Timor" ,"value":"East Timor"},
         { "name" : "Ecuador" ,"value":"Ecuador"},
         { "name" : "Egypt" ,"value":"Egypt"},
         { "name" : "El Salvador" ,"value":"El Salvador"},
         { "name" : "Equatorial Guinea" ,"value":"Equatorial Guinea"},
         { "name" : "Eritrea" ,"value":"Eritrea"},
         { "name" : "Estonia" ,"value":"Estonia"},
         { "name" : "Ethiopia" ,"value":"Ethiopia"},
         { "name" : "Fiji" ,"value":"Fiji"},
         { "name" : "Finland" ,"value":"Finland"},
         { "name" : "France" ,"value":"France"},
         { "name" : "Gabon" ,"value":"Gabon"},
         { "name" : "Gambia" ,"value":"Gambia"},
         { "name" : "Georgia" ,"value":"Georgia"},
         { "name" : "Germany" ,"value":"Germany"},
         { "name" : "Ghana" ,"value":"Ghana"},
         { "name" : "Greece" ,"value":"Greece"},
         { "name" : "Grenada" ,"value":"Grenada"},
         { "name" : "Guatemala" ,"value":"Guatemala"},
         { "name" : "Guinea" ,"value":"Guinea"},
         { "name" : "Guinea-Bissau" ,"value":"Guinea-Bissau"},
         { "name" : "Guyana" ,"value":"Guyana"},
         { "name" : "Haiti" ,"value":"Haiti"},
         { "name" : "Honduras" ,"value":"Honduras"},
         { "name" : "Hungary" ,"value":"Hungary"},
         { "name" : "Iceland" ,"value":"Iceland"},
         { "name" : "India" ,"value":"India"},
         { "name" : "Iran" ,"value":"Iran"},
         { "name" : "Iraq" ,"value":"Iraq"},
         { "name" : "Ireland {Republic}" ,"value":"Ireland {Republic}"},
         { "name" : "Israel" ,"value":"Israel"},
         { "name" : "Italy" ,"value":"Italy"},
         { "name" : "Ivory Coast" ,"value":"Ivory Coast"},
         { "name" : "Jamaica" ,"value":"Jamaica"},
         { "name" : "Japan" ,"value":"Japan"},
         { "name" : "Jordan" ,"value":"Jordan"},
         { "name" : "Kazakhstan" ,"value":"Kazakhstan"},
         { "name" : "Kenya" ,"value":"Kenya"},
         { "name" : "Kiribati" ,"value":"Kiribati"},
         { "name" : "Korea North" ,"value":"Korea North"},
         { "name" : "Korea South<" ,"value":"Korea South"},
         { "name" : "Kosovo" ,"value":"Kosovo"},
         { "name" : "Kuwait" ,"value":"Kuwait"},
         { "name" : "Kyrgyzstan" ,"value":"Kyrgyzstan"},
         { "name" : "Laos" ,"value":"Laos"},
         { "name" : "Latvia" ,"value":"Latvia"},
         { "name" : "Lebanon" ,"value":"Lebanon"},
         { "name" : "Lesotho" ,"value":"Lesotho"},
         { "name" : "Liberia" ,"value":"Liberia"},
         { "name" : "Libya" ,"value":"Libya"},
         { "name" : "Liechtenstein" ,"value":"Liechtenstein"},
         { "name" : "Lithuania" ,"value":"Lithuania"},
         { "name" : "Luxembourg" ,"value":"Luxembourg"},
         { "name" : "Macedonia" ,"value":"Macedonia"},
         { "name" : "Madagascar" ,"value":"Madagascar"},
         { "name" : "Malawi" ,"value":"Malawi"},
         { "name" : "Mali" ,"value":"Mali"},
         { "name" : "Malta" ,"value":"Malta"},
         { "name" : "Marshall Islands" ,"value":"Marshall Islands"},
         { "name" : "Mauritania" ,"value":"Mauritania"},
         { "name" : "Mauritius" ,"value":"Mauritius"},
         { "name" : "Mexico" ,"value":"Mexico"},
         { "name" : "Micronesia" ,"value":"Micronesia"},
         { "name" : "Moldova" ,"value":"Moldova"},
         { "name" : "Monaco" ,"value":"Monaco"},
         { "name" : "Mongolia" ,"value":"Mongolia"},
         { "name" : "Montenegro" ,"value":"Montenegro"},
         { "name" : "Morocco" ,"value":"Morocco"},
         { "name" : "Mozambique" ,"value":"Mozambique"},
         { "name" : "Myanmar, {Burma}" ,"value":"Myanmar, {Burma}"},
         { "name" : "Namibia" ,"value":"Namibia"},
         { "name" : "Nauru" ,"value":"Nauru"},
         { "name" : "Nepal" ,"value":"Nepal"},
         { "name" : "Netherlands" ,"value":"Netherlands"},
         { "name" : "New Zealand" ,"value":"New Zealand"},
         { "name" : "Nicaragua" ,"value":"Nicaragua"},
         { "name" : "Niger" ,"value":"Niger"},
         { "name" : "Nigeria" ,"value":"Nigeria"},
         { "name" : "Norway" ,"value":"Norway"},
         { "name" : "Oman" ,"value":"Oman"},
         { "name" : "Pakistan" ,"value":"Pakistan"},
         { "name" : "Palau" ,"value":"Palau"},
         { "name" : "Panama" ,"value":"Panama"},
         { "name" : "Papua New Guinea" ,"value":"Papua New Guinea"},
         { "name" : "Paraguay" ,"value":"Paraguay"},
         { "name" : "Peru" ,"value":"Peru"},
         { "name" : "Philippines" ,"value":"Philippines"},
         { "name" : "Poland" ,"value":"Poland"},
         { "name" : "Portugal" ,"value":"Portugal"},
         { "name" : "Qatar" ,"value":"Qatar"},
         { "name" : "Romania" ,"value":"Romania"},
         { "name" : "Russian Federation" ,"value":"Russian Federation"},
         { "name" : "Rwanda" ,"value":"Rwanda"},
         { "name" : "St Kitts &amp; Nevis" ,"value":"St Kitts &amp; Nevis"},
         { "name" : "St Lucia" ,"value":"St Lucia"},
         { "name" : "Saint Vincent &amp; the Grenadines" ,"value":"Saint Vincent &amp; the Grenadines"},
         { "name" : "Samoa" ,"value":"Samoa"},
         { "name" : "San Marino" ,"value":"San Marino"},
         { "name" : "Sao Tome &amp; Principe" ,"value":"Sao Tome &amp; Principe"},
         { "name" : "Saudi Arabia" ,"value":"Saudi Arabia"},
         { "name" : "Senegal" ,"value":"Senegal"},
         { "name" : "Serbia" ,"value":"Serbia"},
         { "name" : "Seychelles" ,"value":"Seychelles"},
         { "name" : "Sierra Leone" ,"value":"Sierra Leone"},
         { "name" : "Slovakia" ,"value":"Slovakia"},
         { "name" : "Slovenia" ,"value":"Slovenia"},
         { "name" : "Solomon Islands" ,"value":"Solomon Islands"},
         { "name" : "Somalia" ,"value":"Somalia"},
         { "name" : "South Africa" ,"value":"South Africa"},
         { "name" : "South Sudan" ,"value":"South Sudan"},
         { "name" : "Spain" ,"value":"Spain"},
         { "name" : "Sri Lanka" ,"value":"Sri Lanka"},
         { "name" : "Sudan" ,"value":"Sudan"},
         { "name" : "Suriname" ,"value":"Suriname"},
         { "name" : "Swaziland" ,"value":"Swaziland"},
         { "name" : "Sweden" ,"value":"Sweden"},
         { "name" : "Switzerland" ,"value":"Switzerland"},
         { "name" : "Syria" ,"value":"Syria"},
         { "name" : "Taiwan" ,"value":"Taiwan"},
         { "name" : "Tajikistan" ,"value":"Tajikistan"},
         { "name" : "Tanzania" ,"value":"Tanzania"},
         { "name" : "Thailand" ,"value":"Thailand"},
         { "name" : "Togo" ,"value":"Togo"},
         { "name" : "Tonga" ,"value":"Tonga"},
         { "name" : "Trinidad &amp; Tobago" ,"value":"Trinidad &amp; Tobago"},
         { "name" : "Tunisia" ,"value":"Tunisia"},
         { "name" : "Turkey" ,"value":"Turkey"},
         { "name" : "Turkmenistan" ,"value":"Turkmenistan"},
         { "name" : "Tuvalu" ,"value":"Tuvalu"},
         { "name" : "Uganda" ,"value":"Uganda"},
         { "name" : "Ukraine" ,"value":"Ukraine"},
         { "name" : "United Arab Emirates" ,"value":"United Arab Emirates"},
         { "name" : "United Kingdom" ,"value":"United Kingdom"},
         { "name" : "Uruguay" ,"value":"Uruguay"},
         { "name" : "Vanuatu" ,"value":"Vanuatu"},
         { "name" : "Vatican City" ,"value":"Vatican City"},
         { "name" : "Venezuela" ,"value":"Venezuela"},
         { "name" : "Vietnam" ,"value":"Vietnam"},
         { "name" : "Singapore" ,"value":"Yemen"},
         { "name" : "Zambia" ,"value":"Zambia"},
         { "name" : "Zimbabwe" ,"value":"Zimbabwe"}
        ])