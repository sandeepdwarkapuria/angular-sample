angular.module('app')
    .controller('app.controller.giving.index',
        ['$scope',
            '$state',
            'principal',
            '$http',
            '$timeout',
            'staffs',
            function($scope, $state, principal, $http, $timeout, staffs) {

                $scope.staffs = [];

                if(staffs.status == 'ok'){
                    $scope.staffs = staffs.staffs;
                }else if(staffs.status == 'error'){

                }
                $scope.selectedStaff = null;

                $scope.setStaff = function(staff){
                    $scope.selectedStaff = staff;
                }

                $scope.nextStaff = function(){
                    var $index = $scope.staffs.indexOf($scope.selectedStaff);
                    $scope.selectedStaff = ($scope.staffs.length -1 > $index) ? $scope.staffs[$index + 1] : $scope.staffs[0]
                }
                $scope.prevStaff = function(){
                    $index = $scope.staffs.indexOf($scope.selectedStaff);
                    $scope.selectedStaff = ($index == 0) ? $scope.staffs[$scope.staffs.length - 1] : $scope.staffs[$index -1]
                }

     }])

    .controller('app.controller.giving.staffDonation',
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

    .controller('app.controller.giving.ministryOrProject',
        ['$scope',
            '$stateParams',
            'principal',
            '$http',
            '$timeout',
            function($scope, $stateParams, principal, $http, $timeout ) {



            }])

