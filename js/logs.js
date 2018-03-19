function loadLog(){
	var dateFormat = 'DD-MM-YYYY'
	// window.onload = function(){
		$('#startDate').datetimepicker({format : dateFormat});
		    $('#endDate').datetimepicker({
		        useCurrent: false, //Important! See issue #1075
		        format : dateFormat
		    });
		    $("#startDate").on("dp.change", function (e) {
		        $('#endDate').data("DateTimePicker").minDate(e.date);
		    });
		    $("#endDate").on("dp.change", function (e) {
		        $('#startDate').data("DateTimePicker").maxDate(e.date);
		    });
		$('#startDate').data("DateTimePicker").date(new moment());
		$('#endDate').data("DateTimePicker").date(new moment().add(1,'days'));

		$("#showRecord").off('click').on('click', function(evt){
			renderTable();
		})


		function getData(callback){
			startDate = $("#startDate").data("DateTimePicker").date().format('YYYY-MM-DD');
			endDate = $("#endDate").data("DateTimePicker").date().format('YYYY-MM-DD');
			$.ajax({
				url : sessionStorage.apiurl + "deviceLogs/" + startDate + "/" + endDate, //2018-02-06/2018-02-26",
				success : function(data, textStatus){			
					callback(data);
				},
				error : function(jqXHR, textStatus){

				}
			})
		}

		function renderTable(){
		    if ( $.fn.DataTable.isDataTable( '#logsTable' ) ) {
			  
			  $('#logsTable').DataTable().clear().draw();
			  $('#logsTable').DataTable().destroy();
			}


			
			getData(function(tableDataArray){
				if(tableDataArray.length != 0){

					$("#noDataAvailableCol").hide();
					$("#logsTableCol").show();


					var columnsArr = []
					function mapNew(key, value){
						var obj = {}
						obj.data = key;
						obj.title = key;
						columnsArr.push(obj)
					}

				    function mapMy(element, index, list){
				        _.map(_.keys(element),mapNew)
				    }

				    tableDataArrayTemp = tableDataArray;
				    _.each([_.first(tableDataArray)], mapMy);

				    $("#logsTable").DataTable({
				        columns : columnsArr,
				        data : tableDataArray,
				        keys : true, 
				    })
				}else{
					$("#noDataAvailableCol").show();
					$("#logsTableCol").hide();
				}
			})
		}
}