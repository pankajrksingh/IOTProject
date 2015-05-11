iotproject.service('SteppedAreaChartService',function(){
	this.transform = function(jsonData,key,callback){
		

		var doc_data = []
		jsonData.forEach(function(row){
			doc_data.push(row.doc);
		});

		/*console.log(doc_data);*/
	
		/*var arr_of_keys = ['Humidity','Temperature'];*/



		var final_data = [];
		/*value_arr.push()*/
		/*var final_data = [];*/


		doc_data.forEach(function(row){

				var date = Date.parse(row.timestamp);
				/*console.log(date);*/
				var time = d3.time.format('%H:%M')(new Date(date));
				final_data.push([time,row[key]]);

			});	


		final_data.push(['Time',key+' Concentration']);


		final_data.reverse();
		console.log(JSON.stringify(final_data));
		callback(final_data);
	}

});