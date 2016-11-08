angular.module('app')

	// {{ input | int:option:option2 }}
    .filter('int',function () {
        return function (input,option,option2) {
            return input;
        }
    });