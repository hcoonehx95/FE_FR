var app = angular.module("myApp", []);
app.directive("article", function(){
	return {
		restrict : 'AE',
		scope: {},
		templateUrl: "./template/qizz-xayDungTrangWeb.html",
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.inProgess = true;
			}
			scope.reset = function() {
				scope.inProgess = false;
			}
			scope.reset();
		}
	}
});