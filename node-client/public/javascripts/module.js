/**Angular module**/
var iotproject = angular.module("iotproject", [ 'ngRoute', 'ui.bootstrap','ngTable'])
.config(function($routeProvider, $locationProvider) {
	/*$routeProvider.when('/', {
		templateUrl : '/partials/login',
		controller : 'LoginCtrl'
	}).when('/home', {
		templateUrl : '/partials/home',
		controller : 'HomeCtrl'
	}).otherwise({
		redirectTo : '/'
	});*/
	
	/**to remove hash in the URL**/
	$locationProvider.html5Mode({
		enabled : true,
		requireBase : false
	});

}).run(['$rootScope','$window' ,'$location','$http','$templateCache','DataService',function($rootScope,$window, $location,$http,$templateCache,DataService) {
	
	/*$rootScope.$on('$routeChangeStart', function(event,next, current) {
		
		if (typeof(current) !== 'undefined'){
            $templateCache.remove(current.templateUrl);
        }

        DataService.getData('/checkValidity',[]).success(function(resp){
        	console.log(resp);
        	$location.path('/home');

        }).error(function(err){
        	$location.path('/');
        });

		
		/*if($window.sessionStorage.token){
			$http.defaults.headers.common.Authorization = $window.sessionStorage.token;
			$location.path('/home');
		}else{
			$location.path('/');
		}*/



	//});*/

}]);