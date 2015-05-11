iotproject.service('GaugeService',function(){
	this.transform = function(jsonData,key,callback){
		

		var doc_data = []
		jsonData.forEach(function(row){
			doc_data.push(row.doc);
		});

		var final_data = [];
		
		var value = doc_data[0][key];

		final_data.push(['Label','Value']);
		final_data.push([key,value]);

		console.log(JSON.stringify(final_data));
		callback(final_data);
	}

});