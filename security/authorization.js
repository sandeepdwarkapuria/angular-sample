angular.module('app')

.factory('authorization', ['$rootScope', '$state', 'principal',
  function($rootScope, $state, principal) {
    return {
      authorize: function() {
        return principal.identity()
          .then(function() {
            var isAuthenticated = principal.isAuthenticated();
            if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !principal.isInAnyRole($rootScope.toState.data.roles)) {
              if (isAuthenticated){
                $rootScope.$emit('$stateAccessDenied', {});
                $state.go('default.home');
              }
              else {
                $rootScope.returnToState = $rootScope.toState;
                $rootScope.returnToStateParams = $rootScope.toStateParams;
                $rootScope.$emit('$stateRestricted', {});
                //$state.go('default.login');
              }
            }else{
              $rootScope.$emit('$stateAccessPassed', {});
            }
          });
      }
    };
  }
])