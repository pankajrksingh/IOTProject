iotproject.controller("LoginCtrl", function($scope,DataService,$location,$window,LineChartService,$interval) { 

		$scope.getInitData = function(){
			plotLineChart();
			$interval(plotLineChart,2000);
	};

	/**Function to fetch data and plot**/
	function plotLineChart(){
		DataService.getData(urlConstants.DATA,[]).success(function(response){
					LineChartService.transform(response.message,function(data){
					var line_data = google.visualization.arrayToDataTable(data);
					var options = {
          				title: 'Temperature/Humidity Reading',
          				legend: { position: 'bottom' },
          				backgroundColor : {fill :'transparent'},
          				hAxis: {
				          title: 'Time',
				        },
				        vAxis: {
				          title: 'Reading'
				          /*logScale: true*/
				        }
        			};
					var chart = new google.visualization.LineChart(document.getElementById('line_chart'));
					chart.draw(line_data, options);
				});
			}).error(function(err){
				$scope.alerts = err;
				});
	}

		/**Login button callback**/
		$scope.login = function(){
			$window.location.href = "/auth/google";
		};
});