angular.module('app')
.controller('app.controller.auth.index',
    ['$scope',
        '$rootScope',
        '$state',
        'principal',
        '$http',
        '$timeout',
        function($scope, $rootScope, $state, principal, $http, $timeout) {
   
   
        $scope.signIn = function(valid, events) {
            var $this = $(events.target);
            // webServices/login
            if(valid){
                var $btn = $this.find('[type="submit"]').button('loading');
                $http.post('webServices/login',$scope.login)
                    .success(function(res){
                        if(res.status == 'ok'){
                            principal.authenticate(res.user_details);

                            if($rootScope.returnToState){
                                $state.go($rootScope.returnToState.name, $rootScope.returnToStateParams)
                            }

                            // if current state login then go to defaults state  otherwise finding 'afterAuth' class and trigger  click
                            else if($state.current.name == 'default.login'){
                                $state.go('default.account')
                            }else{
                                //$timeout(function(){
                                //    $("body").find('.afterAuth').trigger('click');
                                //    $scope.$close();
                                //},500) ;
                            }
                            $scope.$close();

                        }else if(res.status == 'error'){
                            $timeout(function(){
                                $scope.message = '';
                            },3000)
                            $scope.message = res.message;
                        }
                    })
                    .error(function(res){

                    }).finally(function(){
                        $btn.button('reset');
                    });
            }

        };

        // when popup sign submit
        $scope.ok = function (registerForm, events) {
            $scope.signUp(registerForm, events);
        };

        // when popup sign cancel
        $scope.cancel = function () {
            $scope.$dismiss('cancel');
        };
}])
.controller('app.controller.auth.register',
    ['$scope',
        '$state',
        'principal',
        '$http',
        '$timeout',
        'ngDialog',
        function($scope, $state, principal, $http, $timeout, ngDialog) {

        // default register model
        $scope.register = {};

        // server side errors
        $scope.server_error = []

        //defaults register setting
        $scope.register.user_prefix="Mr.";
        $scope.register.home_country = "Singapore";

        /* check registeration type */
        $scope.register.type = ($state.current.name == "church") ? "church" : "doner";


        $scope.signUp = function(registerForm, events) {
            var $this = $(events.target);

            $scope.server_error = [];
            if(registerForm.$valid && registerForm.isRecaptch != undefined){
                /* loading*/
                var $btn = $this.find('[type="submit"]').button('loading');
                $http.post('webServices/registration',$scope.register)
                    .success(function(res){

                       if(res.status == 'ok'){
                           
                           // when if  'register' state go to login pages otherwise finding 'afterAuth' class and trigger  click
                           if($state.current.name == 'default.register'){
                               sweetAlert('Register successfully');
                              
                               $state.go('default.login');
                           }else if($scope.register.type == "church"){

                               sweetAlert('church registeration successfully');
                               $state.go('default.login');
                           }
                           else{
                               $scope.$close();
                               $scope.$parent.loginPopup();
                           }
                           
                       }else if(res.status == 'error'){
                            if(res.field_error){
                                $scope.server_error = res.field_error ;
                                $timeout(function(){
                                    $scope.server_error = '';
                                },3000)
                            }else{
                                sweetAlert('Oops!',res.message,'error');
                            }


                        }
                    })
                    .error(function(res){
                        console.log(res);
                    }).finally(function(){
                        $btn.button('reset');
                    })

            }
        }

        // when  register popup submit
        $scope.ok = function (registerForm, events) {
            $scope.signUp(registerForm, events)
            $scope.$close();
        };

         // when  register popup cancel
        $scope.cancel = function () {
            $scope.$dismiss('cancel');
        };

}])