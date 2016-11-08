angular.module('app')
    .controller('app.controller.event.index',
        ['$scope',
            '$state',
            'principal',
            '$http',
            '$timeout',
            'events',
            function($scope, $state, principal, $http, $timeout, events) {

                $scope.events = [];
                if(events.status == 'ok'){
                    $scope.events = events.events;
                }else if(events.status == 'error'){

                }
    }])
    .controller('app.controller.event.view',
        ['$scope',
            '$state',
            'principal',
            '$http',
            '$timeout',
            'event',
            function($scope, $state, principal, $http, $timeout, event) {

                if(event.status == 'ok'){
                    $scope.event = event.data;

                }
                // if record not found or error state then redirect to events 
                else if(event.status == 'error'){
                    $scope.event = null;
                    $state.go('default.event');
                }   
    }])
    .controller('app.controller.event.register',
        ['$scope',
            '$state',
            'principal',
            '$http',
            '$timeout',
            'countries',
            'event',
            'dateFormat',
            'competitionService',
            function($scope, $state, principal, $http, $timeout, countries, event, dateFormat, competitionService) {

                // default specialties value
                $scope.specialties = [];

                $scope.register = {};

                //default register value
                $scope.register.prefix = 'Mr.';
                $scope.register.country = countries[0].value;
                $scope.register.education = "Under Graduate";
               //$scope.register.specialties = [];

                $scope.isRegister = true;

                if(event.status == 'ok'){
                    $scope.event = event.data;

                    var endDate = moment(event.data.registration_date);

                    if (moment() > endDate && moment().format("YYYY-MM-DD") != event.data.registration_date ) {
                        swal({ 
                                title: "Registation closed ",
                                text: "Bye Bye ...",
                                type: "error",
                               // showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Ok Fine",
                                //cancelButtonText: "No, cancel plx!",
                                closeOnConfirm: true,   closeOnCancel: false 
                            }, 
                            function(isConfirm){
                               $state.go('default.event');
                            });
                    } 
                }
                // if record not found or error state then redirect to events 
                else if(event.status == 'error'){
                    $scope.event = null;
                    $state.go('default.event');
                }

                $scope.isRegisterForEvent = function(){

                    $scope.isRegister = true;
                     // Contition  country
                    if($scope.register.country){
                        if($scope.event.codition_country && $scope.register.country != $scope.event.codition_country){
                            $scope.isRegister = false;
                        }
                    }

                    if($scope.register.dob && $scope.event.condition_age ){

                        var start = moment($scope.register.dob,dateFormat.styleMoment).format('YYYY-MM-DD');
                        var end = moment(new Date());

                        var age = moment.duration(end.diff(start));
                        
                        if( $scope.event.condition_age && age.years() >= $scope.event.condition_age){
                            $scope.isRegister = false;
                        }
                    }

                    if($scope.event.coditions_gender){
                        if($scope.register.gender && $scope.event.coditions_gender != $scope.register.gender){
                             $scope.isRegister = false;
                        }
                    }

                    if(!$scope.isRegister){
                       sweetAlert('','Only '+ $scope.event.codition_country + ' ' + $scope.event.coditions_gender +' under ' + $scope.event.condition_age + ' can register',"error") 
                    }
                    

                    return $scope.isRegister;
                }

                $scope.$watch('register', function(newVal, oldVal){

                   $scope.isRegisterForEvent();
                    
                }, true);

                $scope.validateLimitation = function(value){
                    console.log(value);
                }
                   
                $scope.eventRegister =  function(registerForm, event){

                    var $form = $(event.target);
                    if(registerForm.$valid && $scope.isRegisterForEvent()){
                        
                        $scope.register.event_id = $scope.event.id;
                        //loading btn
                    var $btn = $form.find('[type="submit"]').button('loading');
                        competitionService.save($scope.register).$promise
                                .then(function(res){
                                    if(res.status == 'ok'){
                                        sweetAlert(res.message);

                                        $scope.register = {};
                                        $scope.registerForm.$setPristine();
                                        $state.go('default.event');
                                    }else{
                                        sweetAlert('Oops!',res.message,'error');
                                        $scope.register = {};
                                        $scope.registerForm.$setPristine();
                                    }
                                    $btn.button('reset');

                                })
                    }

                }


     }])