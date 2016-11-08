angular.module('app')
    /*.directive("menu", function () {
        return {
            templateUrl: "public/web/directives/menu/html/index.html",
            replace: true,  // if true replace direactive element otherwise adding childNodes
            restrict: 'AECM',
			transclude: true, //  when you want to create a directive that wraps  content. ng-transclude  attr use to wrap data in directive content
            scope: {
                title : "=menu",  // = means scope, @  means string, & means function  
                menus : "="
            },
            link: function (scope, element, attrs) {
				
            }
        }
    })*/
    .directive('customSmoothScrollTo', function($state, duScrollDuration, duScrollOffset, scrollContainerAPI, $timeout){
        var go = function($attr, $scope){
            var offset    = $attr.offset ? parseInt($attr.offset, 10) : duScrollOffset;
            var duration  = $attr.duration ? parseInt($attr.duration, 10) : duScrollDuration;
            var container = scrollContainerAPI.getContainer($scope);
            var target = document.getElementById($attr.href.replace(/.*(?=#[^\s]+$)/, '').substring(1));
            if(!target || !target.getBoundingClientRect) return;
            container.duScrollToElement(
                angular.element(target),
                isNaN(offset) ? 0 : offset,
                isNaN(duration) ? 0 : duration
            );
        };
        return {
            link: function($scope, $element, $attr){
                $element.on('click', function(e){
                    if(!$attr.href || $attr.href.indexOf('#') === -1) return;

                    if (e.stopPropagation) e.stopPropagation();
                    if (e.preventDefault) e.preventDefault();

                    if($state.current.name == 'default.home'){
                        go($attr, $scope);
                    } else {
                        $state.go('default.home').then(function(){
                            $timeout(function(){go($attr, $scope);}, 0);
                        });
                    }
                });
            }
        };
    })
    .directive("header", function () {
        return {
            templateUrl: "public/web/directives/header/html/index.html",
            replace: true,  // if true replace direactive element otherwise adding childNodes
            restrict: 'E',
            link: function (scope, element, attrs) {

            }
        }
    })
    .directive("footer", function () {
        return {
            templateUrl: "public/web/directives/footer/html/index.html",
            replace: true,  // if true replace direactive element otherwise adding childNodes
            restrict: 'E',
            link: function (scope, element, attrs) {

            }
        }
    })
	.directive("imgLoader", function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.parent().addClass('is-loading');
				element.bind('load', function(){
					element.parent().removeClass('is-loading');
				})
			}
		}
	})
    .directive("datepicker",function(){
        return {
            restrict : "A",
            controller : function($scope, $element, $attrs, dateFormat){
                $element.datepicker({ format : dateFormat.style1 });
            }
        }
    })