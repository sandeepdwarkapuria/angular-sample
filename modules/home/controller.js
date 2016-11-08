angular
    .module('app')
        .controller('app.controller.home.index',['$scope', '$state','queryFormService', function($scope, $state, queryFormService){
            $scope.advanced = {};
            $scope.advanced.cause = '';
            $scope.advanced.ngo = '';
            $('.carousel').carousel();

            $scope.advancedSearch = function(){
               if($scope.advanced.cause != '' || $scope.advanced.ngo != '' ){
                  $state.go('default.advancedSearch',$scope.advanced);
               }
            }

            $scope.querySubmit = function(queryForm, event){
                if(queryForm.$valid){
                    queryFormService
                        .save($scope.query).$promise
                        .then(function(res){
                            $scope.query = {};
                            $scope.queryForm.$setPristine();
                            $scope.$parent.alerts.push({msg: 'Query Form submitted successfully!! We contact as soon as possible !'});
                        })
                }
            }

        }])
        .controller('app.controller.home.search',['$scope', '$state','searchList','NgTableParams', function($scope, $state, searchList, NgTableParams){
            
          //  $scope.ngos = [];
            if(searchList.status == 'ok'){
               // $scope.ngos = searchList.ngo;
                $scope.tableParams = new NgTableParams({}, {
                    dataset: searchList.ngo
                });
                $scope.tableParams.settings({ counts: 10});

            }else if(searchList.status == 'error'){
                $scope.tableParams = new NgTableParams({}, {
                    dataset: []
                });
            }

        }])
        .controller('app.controller.home.ngoDonation',
            ['$scope',
                '$state',
                '$stateParams',
                'principal',
                '$http',
                '$timeout',
                'team',
                function($scope, $state, $stateParams, principal, $http, $timeout, team) {

                    // $scope.teamSlug = $stateParams.team;
                    $scope.staff = null;

                    // get all staff
                    if(team.status == 'ok'){
                        $scope.staff = team.staffs;
                    }else if(team.status == 'error'){
                        $state.go('^.giveToStaff');
                    }

                }])