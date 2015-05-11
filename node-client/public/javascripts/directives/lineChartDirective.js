iotproject.directive("lineChart", function () {
	return {
		restrict: 'E',
		replace: false,         
		link: function (scope, element, attr) {
				scope.$watch("loginData",function(newValue,oldValue) {
					if(!newValue){
						return;
					}
						plotLineChart(scope,element,attr);
				});
		} 
	};
});


function plotLineChart(scope,element,attr){

	var elementId = element[0].parentElement;
	/*console.log(element);*/
	d3.selectAll('#' + elementId.id + " svg").remove();


	nv.addGraph(function() {
    var chart = nv.models.lineChart()
    			.useInteractiveGuideline(true)
    			.width(600).height(400);

     chart.xAxis
     	.axisLabel('Time')
        .tickFormat(function(d) {
			/*console.log(d);*/
			/*var date = Date.parse(d);*/
			/*console.log(new Date(date));*/
            return d3.time.format('%H:%M')(new Date(d));
          });

    chart.yAxis
    	.axisLabel('Count')
        .tickFormat(function(d){
        	return d;
        });

        chart.forceY([0]);

    /*chart.isArea(false);*/

        /*chart.forceY([0,200]);*/

    d3.select(elementId).append('svg')
        .datum(scope.loginData)
        .transition().duration(500).call(chart).style({ 'width': 600, 'height': 400 });

    //TODO: Figure out a good way to do this automatically
    nv.utils.windowResize(chart.update);

    return chart;
  });
					
					

}//function ends here