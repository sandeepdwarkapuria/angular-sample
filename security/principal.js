angular.module('app')

    .factory('principal', ['$q', '$http', '$timeout','userDetailsService',
        function ($q, $http, $timeout, userDetailsService) {
            var _identity = undefined,
                _authenticated = false;

            return {
                getUser: function () {
                    return _identity;
                },
                isIdentityResolved: function () {
                    return angular.isDefined(_identity);
                },
                isAuthenticated: function () {
                    return _authenticated;
                },
                isInRole: function (role) {
                    if (!_authenticated || !_identity.roles) return false;

                    return _identity.roles.indexOf(role) != -1;
                },
                isInAnyRole: function (roles) {
                    if (!_authenticated || !_identity.roles) return false;

                    for (var i = 0; i < roles.length; i++) {
                        if (this.isInRole(roles[i])) return true;
                    }

                    return false;
                },
                authenticate: function (identity) {
                    _identity = identity;
                    _authenticated = identity != null;
                },
                identity: function (force) {
                    var deferred = $q.defer();

                    if (force === true) _identity = undefined;

                    if (angular.isDefined(_identity)) {
                        deferred.resolve(_identity);
                        return deferred.promise;
                    }

                    var self = this;    

                    userDetailsService.get().$promise.then(function (res) {
                            if (res.status == "ok") {
                                _identity = res.user_details;
                            } else if (res.status == "error") {
                                _identity = null;
                            }
                            self.authenticate(_identity);
                            deferred.resolve(_identity);
                        },function () {
                        _identity = null;
                        deferred.resolve(_identity);
                    })
                    
                    return deferred.promise;
                },

            };
        }
    ])