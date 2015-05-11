iotproject.controller("HomeCtrl", function($scope,DataService,$location,$window,$rootScope,SteppedAreaChartService,GaugeService,LineChartService,$interval) {

		console.log("in HomeCtrl");

		$scope.initHome = function(user){

			if(! $window.sessionStorage.username){
				console.log("no sessionStorage");
				$window.sessionStorage.username = user;	
			}
			console.log(user);
			$scope.username = $window.sessionStorage.username;

			plotGraphsFunc();
			setInterval(plotGraphsFunc,2000);
			
		};


		function plotGraphsFunc(){

			DataService.getData(urlConstants.DATA,[]).success(function(response){

				/**NH3 Graph**/
				SteppedAreaChartService.transform(response.message,"NH3",function(data){

					var nh3_data = google.visualization.arrayToDataTable(data);

					var options_nh3 = {
          				title: 'Gas Concentrations of NH3 in Air(in ppm)',
          				legend: { position: 'top' },
          				/*backgroundColor : {fill :'transparent'},*/
          				hAxis: {title: 'Time'},
            			vAxis: {title: 'Accumulated Rating',maxValue : 4.5},
          				isStacked: true
        			};

        		var chart_nh3 = new google.visualization.SteppedAreaChart(document.getElementById('nh3_chart_div'));

        		chart_nh3.draw(nh3_data, options_nh3);
				});

				/**CO2 Graph**/
				SteppedAreaChartService.transform(response.message,"CO2",function(data){

        		var co2_data = google.visualization.arrayToDataTable(data);
        		var options_co2 = {
          				title: 'Gas Concentration of CO2 in Air(in ppm)',
					    hAxis: {title: 'Time'},
					    curveType: 'function',
					    legend: { position: 'top' },
					    /*backgroundColor : {fill :'transparent'},*/
					    vAxis: {title: 'PPM Concentration'},
					    hAxis: {title: 'Time'},
					    lineWidth: 4,
           				intervals: { 'style':'line' },
           				legend: 'none'
        			};


        		var chart_co2 = new google.visualization.LineChart(document.getElementById('co2_chart_div'));

        		chart_co2.draw(co2_data, options_co2);

				});

				/**Temp Gauge**/
				GaugeService.transform(response.message,"Temperature",function(data){
					var temp_data = google.visualization.arrayToDataTable(data);
        			var options = {
				          redFrom: 45, redTo: 80,
				          yellowFrom:35, yellowTo: 45,
				          minorTicks: 5
				        };

				        var chart = new google.visualization.Gauge(document.getElementById('temp_gauge_div'));

        				chart.draw(temp_data, options);

        				/*setInterval(function() {
				          temp_data.setValue(0, 1, 79 + Math.round(Math.random()));
				          chart.draw(temp_data, options);
				        }, 3000);*/

				});


				/**Temperature/Humidity**/
				LineChartService.transform(response.message,function(data){
					var line_data = google.visualization.arrayToDataTable(data);
					var options = {
          				title: 'Temperature/Humidity Reading',
          				legend: { position: 'top' },
          				curveType: 'function',
          				/*backgroundColor : {fill :'transparent'},*/
          				hAxis: {
				          title: 'Time'
				        },
				        vAxis: {
				          title: 'Reading'
				          /*logScale: true*/
				        }
        			};
					var chart = new google.visualization.LineChart(document.getElementById('temp_hum_line_chart'));
					chart.draw(line_data, options);
				});

			}).error(function(err){

			});

		}



		$scope.logout = function(){

			delete $window.sessionStorage.username;
			$window.location.href = urlConstants.LOGOUT;

		};
});