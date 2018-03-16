function loadSecondChannel(){

secondChannel = {}
secondChannel.resources = []
// secondChannel.resources = ["img1.jpg","img2.jpg","vid1.mp4","vid2.mp4","vid3.mp4","vid4.mp4","img3.jpg","img4.jpg"];
// window.onload = function(){
	// XMLHttpRequest.prototype.realSend = XMLHttpRequest.prototype.send;
	// XMLHttpRequest.prototype.send = function(value) {
	// 	this.addEventListener('error', function(xx,yy){
			
	// 	}, false);
	// 	this.addEventListener("loadstart", function(xx,yy){
	//     	$("#loadingDiv").show();
	//     }, false);
	//     this.addEventListener("progress", function(xx,yy){
	//     	$("#loadingDiv").show();
	//     	loadedPer = xx.loaded/xx.total*100
	//     	if(isNaN(loadedPer)) $(".ldBar")[0].ldBar.set(0)
	//     	else $(".ldBar")[0].ldBar.set(loadedPer)
	//     }, false);
	//     this.addEventListener("loadend", function(xx,yy){
	//         setTimeout(function(){
	//         	$("#loadingDiv").hide();
	//         	$(".ldBar")[0].ldBar.set(0)
	//         },1300)
	//     }, false);
	//     this.realSend(value);
	// };
	// initialize tooltips
	$('.secondChannelSection [data-toggle="tooltip"]').tooltip();

	// function getAllResources(groupName){
	// 	$.ajax({
	// 		url : commonData.apiurl + "files/" + groupName,
	// 		// url : "data/resources.json",
	// 		async : false,
	// 		datatype : 'json',
	// 		complete : function(jqXHR, textstatus){
	// 			if(textstatus == "success"){
	// 				// groups = _.unique(jqXHR.responseJSON,'groupName')
	// 				// groups = _.pluck(groups,'groupName')
	// 				secondChannel.resources = jqXHR.responseJSON;

	// 			}else if(textstatus == "error"){
	// 				if(jqXHR.responseText)
	// 					$.notify(jqXHR.responseText,'error')
	// 			}
	// 			console.log(jqXHR);
	// 		}
	// 	})
	// }
	

	$(".secondChannelSection input[name='displayTypeRadio']").on('change',function(){
		console.log(this.value)
		if(this.value == "Groups"){
			tabIndex = $(".secondChannelSection #secondChannelTabs").tabs('getTabIndex',$(".secondChannelSection #secondChannelTabs").tabs('getSelected'))
			groupName = $(".secondChannelSection #groupSelectFilter").multipleSelect('getSelects')[0]
			if(tabIndex == 0){
				loadGroupsSecondChannelGeneralTable(groupName)
				secondChannel.visibleTableAPI = secondChannel.groupsSecondChannelGeneralTableAPI;
		    	secondChannel.visibleTableJQ = secondChannel.groupsSecondChannelGeneralTableJQ;
		    	$(".secondChannelSection .clustersSecondChannelGeneralTableDiv").hide();
				$(".secondChannelSection .groupsSecondChannelGeneralTableDiv").show();
		    }else{
		    	loadGroupsSecondChannelPlannedTable(groupName)
				secondChannel.visibleTableAPI = secondChannel.groupsSecondChannelPlannedTableAPI;
		    	secondChannel.visibleTableJQ = secondChannel.groupsSecondChannelPlannedTableJQ;
		    	$(".secondChannelSection .clustersSecondChannelPlannedTableDiv").hide();
				$(".secondChannelSection .groupsSecondChannelPlannedTableDiv").show();
		    }

			$(".secondChannelSection #clusterSelectFilterDiv").parent().hide();
			$(".secondChannelSection #groupSelectFilterDiv").parent().show();
			
		}
		// else if(this.value == "Clusters"){
		// 	tabIndex = $(".secondChannelSection #secondChannelTabs").tabs('getTabIndex',$(".secondChannelSection #secondChannelTabs").tabs('getSelected'))
		// 	clusterName = $(".secondChannelSection #clusterSelectFilter").multipleSelect('getSelects')[0]
		// 	if(tabIndex == 0){
		// 		loadClustersSecondChannelGeneralTable(clusterName)
		// 		secondChannel.visibleTableAPI = secondChannel.clustersSecondChannelGeneralTableAPI;
		//     	secondChannel.visibleTableJQ = secondChannel.clustersSecondChannelGeneralTableJQ;
		//     	$(".secondChannelSection .groupsSecondChannelGeneralTableDiv").hide();
		// 		$(".secondChannelSection .clustersSecondChannelGeneralTableDiv").show();
		//     }else{
		//     	loadClustersSecondChannelPlannedTable(clusterName)
		// 		secondChannel.visibleTableAPI = secondChannel.clustersSecondChannelPlannedTableAPI;
		//     	secondChannel.visibleTableJQ = secondChannel.clustersSecondChannelPlannedTableJQ;
		//     	$(".secondChannelSection .groupsSecondChannelPlannedTableDiv").hide();
		// 		$(".secondChannelSection .clustersSecondChannelPlannedTableDiv").show();
		//     }


		// 	$(".secondChannelSection #groupSelectFilterDiv").parent().hide();
		// 	$(".secondChannelSection #clusterSelectFilterDiv").parent().show();
		// }
	});


	function getAllGroups(){
		if(commonData.userType != 'Society'){

			$.ajax({
				url : commonData.apiurl + "groups",
				async : false,
				datatype : 'json',
				complete : function(jqXHR, textstatus){
					if(textstatus == "success"){
						groups = _.unique(jqXHR.responseJSON,'groupName')
						groups = _.pluck(groups,'groupName')
						var options = ""
						$.each(groups, function(index,value){
							options += `<option value="`+value+`">`+value+`</option>`
						});
						$(".secondChannelSection #groupSelectFilter").empty();
						$(".secondChannelSection #groupSelectFilter").append(options);
						$(".secondChannelSection #groupSelectFilter").attr("disabled",true);
						
						$(".secondChannelSection #groupSelectFilter").multipleSelect({
							placeholder: "Select Group",
							filter: true,
							single : true,
							allSelected : false,
							onClick : function(view){
								tabIndex = $(".secondChannelSection #secondChannelTabs").tabs('getTabIndex',$(".secondChannelSection #secondChannelTabs").tabs('getSelected'))
								groupName = view.value;
								if(tabIndex == 0){
									loadGroupsSecondChannelGeneralTable(groupName)
									secondChannel.visibleTableAPI = secondChannel.groupsSecondChannelGeneralTableAPI;
							    	secondChannel.visibleTableJQ = secondChannel.groupsSecondChannelGeneralTableJQ;
							    }else{
							    	loadGroupsSecondChannelPlannedTable(groupName)
									secondChannel.visibleTableAPI = secondChannel.groupsSecondChannelPlannedTableAPI;
							    	secondChannel.visibleTableJQ = secondChannel.groupsSecondChannelPlannedTableJQ;
							    }
							    // getAllResources(groupName);
							}
						});

					}else if(textstatus == "error"){
						if(jqXHR.responseText)
							$.notify(jqXHR.responseText,'error')
					}
					console.log(jqXHR);
				}
			})
		}else{
			var options = ""
			options += `<option value="`+clientName+`">`+clientName+`</option>`
			$(".secondChannelSection #groupSelectFilter").empty();
			$(".secondChannelSection #groupSelectFilter").append(options);
			$(".secondChannelSection #groupSelectFilter").attr('disabled',true);
			$(".secondChannelSection #groupSelectFilter").multipleSelect({
					placeholder: "Select Group",
					filter: true,
					single : true,
					allSelected : false,
					onClick : function(view){
						tabIndex = $(".secondChannelSection #secondChannelTabs").tabs('getTabIndex',$(".secondChannelSection #secondChannelTabs").tabs('getSelected'))
						groupName = view.value;
						if(tabIndex == 0){
							loadGroupsSecondChannelGeneralTable(groupName)
							secondChannel.visibleTableAPI = secondChannel.groupsSecondChannelGeneralTableAPI;
					    	secondChannel.visibleTableJQ = secondChannel.groupsSecondChannelGeneralTableJQ;
					    }else{
					    	loadGroupsSecondChannelPlannedTable(groupName)
							secondChannel.visibleTableAPI = secondChannel.groupsSecondChannelPlannedTableAPI;
					    	secondChannel.visibleTableJQ = secondChannel.groupsSecondChannelPlannedTableJQ;
					    }
					    // getAllResources(groupName);
					}
				});
		}
	}

	// function getAllClusters(){
	// 	$.ajax({
	// 		url : commonData.apiurl + "clusters",
	// 		// url : "data/clusters.json",
	// 		async : false,
	// 		datatype : 'json',
	// 		complete : function(jqXHR, textstatus){
	// 			if(textstatus == "success"){
	// 				clusters = _.unique(jqXHR.responseJSON,'clusterName')
	// 				clusters = _.pluck(clusters,'clusterName')
	// 				var options = ""
	// 				$.each(clusters, function(index,value){
	// 					options += `<option value="`+value+`">`+value+`</option>`
	// 				});
	// 				$(".secondChannelSection #clusterSelectFilter").empty();
	// 				$(".secondChannelSection #clusterSelectFilter").append(options);
					
	// 				$(".secondChannelSection #clusterSelectFilter").multipleSelect({
	// 					placeholder: "Select Cluster",
	// 					filter: true,
	// 					single : true,
	// 					onClick : function(view){
	// 						tabIndex = $(".secondChannelSection #secondChannelTabs").tabs('getTabIndex',$(".secondChannelSection #secondChannelTabs").tabs('getSelected'))
	// 						groupName = view.value;
	// 						if(tabIndex == 0){
	// 							loadClustersSecondChannelGeneralTable(groupName)
	// 							secondChannel.visibleTableAPI = secondChannel.clustersSecondChannelGeneralTableAPI;
	// 					    	secondChannel.visibleTableJQ = secondChannel.clustersSecondChannelGeneralTableJQ;
	// 					    }else{
	// 					    	loadClustersSecondChannelPlannedTable(groupName)
	// 							secondChannel.visibleTableAPI = secondChannel.clustersSecondChannelPlannedTableAPI;
	// 					    	secondChannel.visibleTableJQ = secondChannel.clustersSecondChannelPlannedTableJQ;
	// 					    }
	// 					    getAllResources(grou);
	// 					}
	// 				});

	// 			}else if(textstatus == "error"){
	// 				if(jqXHR.responseText)
	// 					$.notify(jqXHR.responseText,'error')
	// 			}
	// 			console.log(jqXHR);
	// 		}
	// 	})
	// }

	getAllGroups();
	// getAllClusters();
	groupName = $(".secondChannelSection #groupSelectFilter").multipleSelect('getSelects')[0];
	loadGroupsSecondChannelGeneralTable(groupName)


	function loadGroupsSecondChannelGeneralTable(groupName){
		if(secondChannel.groupsSecondChannelGeneralTableJQ) {
			secondChannel.groupsSecondChannelGeneralTableJQ.fnClearTable();
			secondChannel.groupsSecondChannelGeneralTableJQ.fnDestroy();
		}

		secondChannel.groupsSecondChannelGeneralTableAPI = $('.secondChannelSection #groupsSecondChannelGeneralTable').DataTable({
	        "ajax" : {
				url : commonData.apiurl + "shared/ch2_g/" + "NO" + "/" + groupName,
				// url : "data/ch1_genGrp.json",
				'async': 'false',
				dataSrc : function(data){
					// groupName_temp = data[0].groupName;
					$.each(data, function(index, value){
						value.sno = index + 1;
						// value.groupName = groupName;
					})
					return data;
				},
				complete : function(jqXHR, textStatus){
					if(textStatus == "success"){
						// console.log(jqXHR)
					}	
					else if(textStatus == "error"){
						if(jqXHR.responseText)
							$.notify(jqXHR.responseText,'error')
					}
				},
				error : function(jqXHR, textStatus, errorThrown){
					secondChannel.groupsSecondChannelGeneralTableAPI.clear().draw();
					// secondChannel.visibleTableAPI = undefined;
			  //   	secondChannel.visibleTableJQ = undefined;
			  //   	secondChannel.groupsSecondChannelGeneralTableAPI = undefined;
    	// 			secondChannel.groupsSecondChannelGeneralTableJQ = undefined;
				}
	 		},
	 		keys : true,
	        dataType: "json",
	        // rowReorder: {
	        //     dataSrc: 'sno'
	        // },
	        columns: [
	        	{ data : "sno",
	        		// className: 'reorder'
	        	},
	            { render : function(data, type, row){
	        	  	return `<div class="tableCheckbox">
	        	  				<input type="checkbox">
	        	  			</div>`;
	    	  		}, sortable : false
	    	  	},
	            // { "data": "groupName" },
	            { "data": "resName" },
	            // { "data": "resourceType" },
	            { "data": "duration" },
	            // { "data": "updatedBy" },
	            // { "data": "updatedAt" }
	    	],
	    	drawCallback : function(settings){
	    		// $(".secondChannelSection #secondChannelGeneralTable tbody td:nth-child(1)").prepend('<div class="reorderHandler">::</div>')
	    	}
	    });
	    secondChannel.groupsSecondChannelGeneralTableJQ = $('.secondChannelSection #groupsSecondChannelGeneralTable').dataTable();

	    // secondChannel.visibleTableAPI = secondChannel.groupsSecondChannelGeneralTableAPI;
    	// secondChannel.visibleTableJQ = secondChannel.groupsSecondChannelGeneralTableJQ;
	}

	// function loadClustersSecondChannelGeneralTable(clusterName){
	// 	if(secondChannel.clustersSecondChannelGeneralTableJQ) {
	// 		secondChannel.clustersSecondChannelGeneralTableJQ.fnClearTable();
	// 		secondChannel.clustersSecondChannelGeneralTableJQ.fnDestroy();
	// 	}

	// 	secondChannel.clustersSecondChannelGeneralTableAPI = $('.secondChannelSection #clustersSecondChannelGeneralTable').DataTable({
	//         "ajax" : {
	// 			url : commonData.apiurl + "ch1_genDev/" + clientName + "/" + clusterName,
	// 			// url : "data/ch1_genCluster.json",
	// 			'async': 'false',
	// 			dataSrc : function(data){
	// 				clusterName_temp = data[0].clusterName;
	// 				$.each(data[0].data, function(index, value){
	// 					value.sno = index +1;
	// 					value.clusterName = clusterName_temp;
	// 				})
	// 				return data[0].data;
	// 			},
	// 			complete : function(jqXHR, textStatus){
	// 				if(textStatus == "success"){
	// 					// console.log(jqXHR)
	// 				}	
	// 				else if(textStatus == "error"){
	// 					if(jqXHR.responseText)
	// 						$.notify(jqXHR.responseText,'error')
	// 				}
	// 			},
	// 			error : function(jqXHR, textStatus, errorThrown){
	// 				secondChannel.clustersSecondChannelGeneralTableAPI.clear().draw();
	// 			}
	//  		},
	//  		keys : true,
	//         dataType: "json",
	//         // rowReorder: {
	//         //     dataSrc: 'sno'
	//         // },
	//         columns: [
	//         	{ data : "sno",
	//         		// className: 'reorder'
	//         	},
	//             { render : function(data, type, row){
	//         	  	return `<div class="tableCheckbox">
	//         	  				<input type="checkbox">
	//         	  			</div>`;
	//     	  		}, sortable : false
	//     	  	},
	//             { "data": "clusterName" },
	//             { "data": "resourceName" },
	//             // { "data": "resourceType" },
	//             { "data": "duration" },
	//             // { "data": "updatedBy" },
	//             // { "data": "updatedAt" }
	//     	],
	//     	drawCallback : function(settings){
	//     		// $(".secondChannelSection #secondChannelGeneralTable tbody td:nth-child(1)").prepend('<div class="reorderHandler">::</div>')
	//     	}
	//     });
	//     secondChannel.clustersSecondChannelGeneralTableJQ = $('.secondChannelSection #clustersSecondChannelGeneralTable').dataTable();

	//     // secondChannel.visibleTableAPI = secondChannel.clustersSecondChannelGeneralTableAPI;
 //    	// secondChannel.visibleTableJQ = secondChannel.clustersSecondChannelGeneralTableJQ;
	// }

	function loadGroupsSecondChannelPlannedTable(groupName){
		if(secondChannel.groupsSecondChannelPlannedTableJQ) {
			secondChannel.groupsSecondChannelPlannedTableJQ.fnClearTable();
			secondChannel.groupsSecondChannelPlannedTableJQ.fnDestroy();
		}

	    secondChannel.groupsSecondChannelPlannedTableAPI = $('.secondChannelSection #groupsSecondChannelPlannedTable').DataTable({
	        "ajax" : {
				url : commonData.apiurl + "planned/ch2_p/" + "NO" + "/" + groupName,
				// url : "data/ch1_planGrp.json",
				'async': 'false',
				dataSrc : function(data){
					// groupName_temp = data[0].groupName;
					$.each(data, function(index, value){
						value.sno = index +1;
						// value.groupName = groupName;
					})
					return data;

					function old(){
						startTime = new moment().startOf('day').add(7,'hours')//.format('DD-MM-YYYY hh:mm a')
						endTime = new moment().add(1,'day').startOf('day').subtract(20,'minutes')//.format('DD-MM-YYYY hh:mm a')
						var ctr = 0;
						var newData = [];
						while(ctr<=60){
						    // console.log(startTime.format('DD-MM-YYYY hh:mm a'))
						    obj = {};
						    obj.time = startTime.format('DD-MM-YYYY_hh:mm_A')
						    obj.sno = ctr+1;

						    foundData =_.where(data,{time : obj.time})
						    // groupName_temp1 = data[0].groupName;
						    if(foundData.length != 0){
						    	foundData = foundData[0];
							    obj.resName = foundData.resName;
							    // obj.resourceType = foundData.resourceType;
							    // obj.groupName = groupName;
							    // obj.clientName = clientName;
							    // obj.updatedBy = foundData.updatedBy;
							    // obj.updatedAt = foundData.updatedAt;
							 //    if(foundData.resourceName.split('.')[1].toUpperCase() == "JPG" || foundData.resourceName.split('.')[1].toUpperCase() == "JPEG"){
								// 	obj.resourceType = "image"
								// }else if(foundData.resourceName.split('.')[1].toUpperCase() == "MP4" || foundData.split('.')[1].toUpperCase() == "WEBM"){
									
								// 	obj.resourceType = "video"
								// }
							}else{
								obj.resName = ""
								// obj.resourceType = ""
								// obj.groupName = groupName;
							    // obj.clientName = clientName;
							    // obj.updatedBy = "";
							    // obj.updatedAt = "";
							}

						    
						    startTime.add(20,'minutes').format('DD-MM-YYYY_hh:mm_A')
						    newData.push(obj);
						    ctr++
						}

						// $.each(data, function(index, value){
						// 	value.sno = index +1;
						// })
						return newData;
					}
				},
				complete : function(jqXHR, textStatus){
					if(textStatus == "success"){
						// console.log(jqXHR)
					}	
					else if(textStatus == "error"){
						if(jqXHR.responseText)
							$.notify(jqXHR.responseText,'error')
					}
				},
				error : function(jqXHR, textStatus, errorThrown){
					secondChannel.groupsSecondChannelPlannedTableAPI.clear().draw();
					// irstChannel.visibleTableAPI = undefined;
			  //   	secondChannel.visibleTableJQ = undefined;
			  //   	secondChannel.groupsSecondChannelPlannedTableAPI = undefined;
    	// 			secondChannel.groupsSecondChannelPlannedTableJQ = undefined
				}
	 		},
	 		keys : true,
	        dataType: "json",
	        columns: [
	        	{ data : "sno"},
	            { render : function(data, type, row){
	        	  	return `<div class="tableCheckbox">
	        	  				<input type="checkbox">
	        	  			</div>`;
	    	  		}, sortable : false
	    	  	},
	            // { "data": "groupName" },
	            { "data": "time"
	          //    ,
	        		// render : function(data, type, row){
	        		// 	return new moment(data).format('DD-MM-YYYY hh:mm a')
	        		// }
	        	},
	            { "data": "resName" },
	            // { "data": "resourceType" },
	            // { "data": "updatedBy" },
	            // { "data": "updatedAt" },
	      //       { render : function(data, type, row){
	      //   	  	return `<div class="tableButtons">
	      //   	  				<button class="btn btn-info btn-xs editResource"><i class="fa fa-eraser" style="font-size: 8px;"></i></button>
	      //   	  			</div>`;
	      //   	  				// <button class="btn btn-danger btn-xs deleteCluster"><i class="fa fa-minus" style="font-size: 8px;"></i></button>
	    	 //  		},
	    	 //  		sortable : false
	    		// }
	    	]	    	
	    });
	    secondChannel.groupsSecondChannelPlannedTableJQ = $('.secondChannelSection #groupsSecondChannelPlannedTable').dataTable();

	}

	// function loadClustersSecondChannelPlannedTable(clusterName){
	// 	if(secondChannel.clustersSecondChannelPlannedTableJQ) {
	// 		secondChannel.clustersSecondChannelPlannedTableJQ.fnClearTable();
	// 		secondChannel.clustersSecondChannelPlannedTableJQ.fnDestroy();
	// 	}

	//     secondChannel.clustersSecondChannelPlannedTableAPI = $('.secondChannelSection #clustersSecondChannelPlannedTable').DataTable({
	//         "ajax" : {
	// 			// url : commonData.apiurl + "ch1_planDev/" + clientName + "/" + clusterName,
	// 			url : "data/ch1_planDev.json",
	// 			'async': 'false',
	// 			dataSrc : function(data){
	// 				clusterName_temp = data[0].clusterName;
	// 				$.each(data[0].data, function(index, value){
	// 					value.sno = index +1;
	// 					value.clusterName = clusterName_temp;
	// 				})
	// 				return data[0].data;

	// 				function old(){
	// 					startTime = new moment().startOf('day').add(7,'hours')//.format('DD-MM-YYYY hh:mm a')
	// 					endTime = new moment().add(1,'day').startOf('day').subtract(20,'minutes')//.format('DD-MM-YYYY hh:mm a')
	// 					var ctr = 0;
	// 					var newData = [];
	// 					while(ctr<=60){
	// 					    // console.log(startTime.format('DD-MM-YYYY hh:mm a'))
	// 					    obj = {};
	// 					    obj.startTime = startTime.format('DD-MM-YYYY HH:mm')
	// 					    obj.sno = ctr+1;

	// 					    foundData =_.where(data[0].data,{startTime : obj.startTime})
	// 					    clusterName_temp1 = data[0].clusterName;
	// 					    if(foundData.length != 0){
	// 					    	foundData = foundData[0];
	// 						    obj.resourceName = foundData.resourceName;
	// 						    // obj.resourceType = foundData.resourceType;
	// 						    obj.clusterName = clusterName_temp1;
	// 						    obj.clientName = clientName;
	// 						    // obj.updatedBy = foundData.updatedBy;
	// 						    // obj.updatedAt = foundData.updatedAt;
	// 						 //    if(foundData.resourceName.split('.')[1].toUpperCase() == "JPG" || foundData.resourceName.split('.')[1].toUpperCase() == "JPEG"){
	// 							// 	obj.resourceType = "image"
	// 							// }else if(foundData.resourceName.split('.')[1].toUpperCase() == "MP4" || foundData.split('.')[1].toUpperCase() == "WEBM"){
									
	// 							// 	obj.resourceType = "video"
	// 							// }
	// 						}else{
	// 							obj.resourceName = ""
	// 							// obj.resourceType = ""
	// 							obj.clusterName = clusterName_temp1;
	// 						    obj.clientName = clientName;
	// 						    // obj.updatedBy = "";
	// 						    // obj.updatedAt = "";
	// 						}

						    
	// 					    startTime.add(20,'minutes').format('DD-MM-YYYY HH:mm')
	// 					    newData.push(obj);
	// 					    ctr++
	// 					}

	// 					// $.each(data, function(index, value){
	// 					// 	value.sno = index +1;
	// 					// })
	// 					return newData;
	// 			}
	// 			},
	// 			complete : function(jqXHR, textStatus){
	// 				if(textStatus == "success"){
	// 					// console.log(jqXHR)
	// 				}	
	// 				else if(textStatus == "error"){
	// 					if(jqXHR.responseText)
	// 						$.notify(jqXHR.responseText,'error')
	// 				}
	// 			},
	// 			error : function(jqXHR, textStatus, errorThrown){
	// 				secondChannel.clustersSecondChannelPlannedTableAPI.clear().draw();
	// 				// secondChannel.visibleTableAPI = undefined;
	// 		  //   	secondChannel.visibleTableJQ = undefined;
	// 		  //   	secondChannel.clustersSecondChannelPlannedTableAPI = undefined;
 //    	// 			secondChannel.clustersSecondChannelPlannedTableJQ = undefined
	// 			}
	//  		},
	//  		keys : true,
	//         dataType: "json",
	//         columns: [
	//         	{ data : "sno"},
	//             { render : function(data, type, row){
	//         	  	return `<div class="tableCheckbox">
	//         	  				<input type="checkbox">
	//         	  			</div>`;
	//     	  		}, sortable : false
	//     	  	},
	//             { "data": "clusterName" },
	//             { "data": "startTime"
	//           //    ,
	//         		// render : function(data, type, row){
	//         		// 	return new moment(data).format('DD-MM-YYYY hh:mm a')
	//         		// }
	//         	},
	//             { "data": "resourceName" },
	//             // { "data": "resourceType" },
	//             // { "data": "updatedBy" },
	//             // { "data": "updatedAt" },
	//       //       { render : function(data, type, row){
	//       //   	  	return `<div class="tableButtons">
	//       //   	  				<button class="btn btn-info btn-xs editResource"><i class="fa fa-eraser" style="font-size: 8px;"></i></button>
	//       //   	  			</div>`;
	//       //   	  				// <button class="btn btn-danger btn-xs deleteCluster"><i class="fa fa-minus" style="font-size: 8px;"></i></button>
	//     	 //  		},
	//     	 //  		sortable : false
	//     		// }
	//     	]
	//     });
	//     secondChannel.clustersSecondChannelPlannedTableJQ = $('.secondChannelSection #clustersSecondChannelPlannedTable').dataTable();

	//     // secondChannel.visibleTableAPI = secondChannel.clustersSecondChannelPlannedTableAPI;
 //    	// secondChannel.visibleTableJQ = secondChannel.clustersSecondChannelPlannedTableJQ;
	// }

    secondChannel.visibleTableAPI = secondChannel.groupsSecondChannelGeneralTableAPI;
	secondChannel.visibleTableJQ = secondChannel.groupsSecondChannelGeneralTableJQ;
    $(".secondChannelSection #secondChannelTabs").tabs({
    	onSelect : function(title, index){
    		if(index == 0){
    			// if groups is checked
    			if($(".secondChannelSection input[name='displayTypeRadio']")[0].checked){
    				groupName = $(".secondChannelSection #groupSelectFilter").multipleSelect('getSelects')[0];
    				$(".secondChannelSection .groupsSecondChannelGeneralTableDiv").show();
					$(".secondChannelSection .clustersSecondChannelGeneralTableDiv").hide();
					loadGroupsSecondChannelGeneralTable(groupName)

			    	secondChannel.visibleTableAPI = secondChannel.groupsSecondChannelGeneralTableAPI;
			    	secondChannel.visibleTableJQ = secondChannel.groupsSecondChannelGeneralTableJQ;
    			}else{
    	// 			clusterName = $(".secondChannelSection #clusterSelectFilter").multipleSelect('getSelects')[0];
    	// 			$(".secondChannelSection .groupsSecondChannelGeneralTableDiv").hide();
					// $(".secondChannelSection .clustersSecondChannelGeneralTableDiv").show();
					// loadClustersSecondChannelGeneralTable(clusterName)

    	// 			secondChannel.visibleTableAPI = secondChannel.clustersSecondChannelGeneralTableAPI;
			  //   	secondChannel.visibleTableJQ = secondChannel.clustersSecondChannelGeneralTableJQ;
    			}
		    	// $(".secondChannelSection #clearSelectedslotsButton").hide()
		    	// $(".secondChannelSection #addNewResourceButton").show()
				// $(".secondChannelSection #deleteSelectedresourcesButton").show();
    		}else{
    			// if groups is checked
    			if($(".secondChannelSection input[name='displayTypeRadio']")[0].checked){
			    	groupName = $(".secondChannelSection #groupSelectFilter").multipleSelect('getSelects')[0];
			    	$(".secondChannelSection .groupsSecondChannelPlannedTableDiv").show();
					$(".secondChannelSection .clustersSecondChannelPlannedTableDiv").hide();
					loadGroupsSecondChannelPlannedTable(groupName)

			    	secondChannel.visibleTableAPI = secondChannel.groupsSecondChannelPlannedTableAPI;
			    	secondChannel.visibleTableJQ = secondChannel.groupsSecondChannelPlannedTableJQ;


    			}else{
    				clusterName = $(".secondChannelSection #clusterSelectFilter").multipleSelect('getSelects')[0];
    				$(".secondChannelSection .groupsSecondChannelPlannedTableDiv").hide();
					$(".secondChannelSection .clustersSecondChannelPlannedTableDiv").show();
					loadClustersSecondChannelPlannedTable(clusterName)

    				secondChannel.visibleTableAPI = secondChannel.clustersSecondChannelPlannedTableAPI;
			    	secondChannel.visibleTableJQ = secondChannel.clustersSecondChannelPlannedTableJQ;
    			}

				// $(".secondChannelSection #deleteSelectedresourcesButton").hide()
		    	// $(".secondChannelSection #addNewResourceButton").hide()
				// $(".secondChannelSection #clearSelectedslotsButton").show()
    		}
    	}
    })

    $('.secondChannelSection #groupsSecondChannelGeneralTable tbody').on('click','td:nth-child(3)',function(evt){
		openFieldEditorDialog(secondChannel.visibleTableAPI, secondChannel.visibleTableJQ, evt);
	});

	$('.secondChannelSection #groupsSecondChannelPlannedTable tbody').on('click','td:nth-child(4)',function(evt){
		openFieldEditorDialog(secondChannel.visibleTableAPI, secondChannel.visibleTableJQ, evt);
	});

	$('.secondChannelSection #groupsSecondChannelPlannedTable tbody').on('click','td:nth-child(3)',function(evt){
		openFieldEditorDialog(secondChannel.visibleTableAPI, secondChannel.visibleTableJQ, evt);
	});

	$('.secondChannelSection #groupsSecondChannelGeneralTable tbody').on('click','td:nth-child(4)',function(evt){
		openFieldEditorDialog(secondChannel.visibleTableAPI, secondChannel.visibleTableJQ, evt);
	});


	// $('.secondChannelSection #clustersSecondChannelGeneralTable tbody').on('click','td:nth-child(4)',function(evt){
	// 	openFieldEditorDialog(secondChannel.visibleTableAPI, secondChannel.visibleTableJQ, evt);
	// });

	// $('.secondChannelSection #clustersSecondChannelPlannedTable tbody').on('click','td:nth-child(4)',function(evt){
	// 	openFieldEditorDialog(secondChannel.visibleTableAPI, secondChannel.visibleTableJQ, evt);
	// });

	// $('.secondChannelSection #clustersSecondChannelPlannedTable tbody').on('click','td:nth-child(5)',function(evt){
	// 	openFieldEditorDialog(secondChannel.visibleTableAPI, secondChannel.visibleTableJQ, evt);
	// });

	// $('.secondChannelSection #clustersSecondChannelGeneralTable tbody').on('click','td:nth-child(5)',function(evt){
	// 	openFieldEditorDialog(secondChannel.visibleTableAPI, secondChannel.visibleTableJQ, evt);
	// });

	$(".secondChannelSection #deleteSelectedresourcesButton").off('click').on('click',function(evt){
		if(confirm("Are you you want to delete selected entries permanently and update?")){
			$(".secondChannelSection #loadingDiv").show();
			page = secondChannel.visibleTableAPI.page.info().page;
			checkboxTD = secondChannel.visibleTableAPI.rows().nodes().toJQuery();
			deleteRowsIndexes = []
			$.each(checkboxTD, function(index, value){
				isChecked = $(value).find('td:nth-child(2) input').is(':checked')
				if(isChecked){
					rowNo = parseInt($(value).find('td:nth-child(1)').text()) - 1;
					deleteRowsIndexes.push(rowNo)
				}

			})
			$.each(deleteRowsIndexes, function(index,value){
				secondChannel.visibleTableJQ.fnDeleteRow(value-index, function(lg){
					// console.log(lg)
				});
			})
			commonData.updateSerialNo(secondChannel.visibleTableAPI);
			secondChannel.visibleTableAPI.page( page ).draw( 'page' );
			$(".secondChannelSection #saveResourcesButton").click();
		}
	});

	$(".secondChannelSection #clearSelectedslotsButton").off('click').on('click',function(evt){
		page = secondChannel.visibleTableAPI.page.info().page;
		checkboxTD = secondChannel.visibleTableAPI.rows().nodes().toJQuery();
		clearRowsIndexes = []
		$.each(checkboxTD, function(index, value){
			isChecked = $(value).find('td:nth-child(2) input').is(':checked')
			if(isChecked){
				rowNo = parseInt($(value).find('td:nth-child(1)').text()) - 1;
				clearRowsIndexes.push(rowNo)
			}

		})
		$.each(clearRowsIndexes, function(index,value){
			// secondChannel.visibleTableAPI.cell(value,3).data("")
			secondChannel.visibleTableAPI.cell(value,4).data("")

			$(secondChannel.visibleTableAPI.rows().nodes().toJQuery()[value]).fadeOut();
			$(secondChannel.visibleTableAPI.rows().nodes().toJQuery()[value]).fadeIn();
		})
		// commonData.updateSerialNo(secondChannel.visibleTableAPI);
		secondChannel.visibleTableAPI.page( page ).draw( 'page' );

		$.each(checkboxTD, function(index, value){
			$(value).find('td:nth-child(2) input').attr('checked',false)
		})
	});


	$(".secondChannelSection #groupsSecondChannelGeneralTable").off('keyup').on('keyup', function(event){
		if(event.keyCode == 32){
			trgt = $(".secondChannelSection #groupsSecondChannelGeneralTable tbody td.focus").closest('tr').find('.tableCheckbox input')
			trgt.click();
		}
	});

	// $(".secondChannelSection #clustersSecondChannelGeneralTable").off('keyup').on('keyup', function(event){
	// 	if(event.keyCode == 32){
	// 		trgt = $(".secondChannelSection #clustersSecondChannelGeneralTable tbody td.focus").closest('tr').find('.tableCheckbox input')
	// 		trgt.click();
	// 	}
	// });

	$(".secondChannelSection #groupsSecondChannelPlannedTable").off('keyup').on('keyup', function(event){
		if(event.keyCode == 32){
			trgt = $(".secondChannelSection #groupsSecondChannelPlannedTable tbody td.focus").closest('tr').find('.tableCheckbox input')
			trgt.click();
		}
	});

	// $(".secondChannelSection #clustersSecondChannelPlannedTable").off('keyup').on('keyup', function(event){
	// 	if(event.keyCode == 32){
	// 		trgt = $(".secondChannelSection #clustersSecondChannelPlannedTable tbody td.focus").closest('tr').find('.tableCheckbox input')
	// 		trgt.click();
	// 	}
	// });


	// this will clear the planned tab;le
	// $('.secondChannelSection table tbody').on('click','td:nth-child(6)',function(evt){
 //    	deleteOrEditGroup(secondChannel.visibleTableAPI, secondChannel.visibleTableJQ, evt);
	// });
	
	// // tabel buttons : only edit is working
	// function deleteOrEditGroup(visibleTableAPI, visibleTableJQ, evt){
	// 	trgtTd = $(evt.target).closest('td');
	// 	trgtTr = trgtTd.closest('tr');
	// 	if(evt.target.nodeName != "TD" && trgtTd.index() == 5){
	// 			rowNo = parseInt(trgtTr.find('td').first().text()) -1;
	// 			pageToDraw = visibleTableAPI.page.info().page;
	// 			// visibleTableAPI.cell(rowNo,3).data("")
	// 			visibleTableAPI.cell(rowNo,4).data("")
	// 			visibleTableAPI.page( pageToDraw ).draw( 'page' );

	// 			$(visibleTableAPI.rows().nodes().toJQuery()[rowNo]).fadeOut();
	// 			$(visibleTableAPI.rows().nodes().toJQuery()[rowNo]).fadeIn();
	// 	}
	// }

	function openFieldEditorDialog(visibleTableAPI, visibleTableJQ, evt){
		visibleTableAPI.keys.disable();
		trgtTd = $(evt.target);
		trgtTdValue = trgtTd.text();
		if(trgtTd[0].nodeName == "TD"){
			if((visibleTableJQ[0].id == "groupsSecondChannelPlannedTable" && trgtTd.index() == 2) || (visibleTableJQ[0].id == "clustersSecondChannelPlannedTable" && trgtTd.index() == 2)){
				secondChannel.trgtTd = trgtTd
				$(".secondChannelSection #modifyFieldDialog").dialog({
		            constrain : true,
		            top : trgtTd.offset().top,
		            left : trgtTd.offset().left,
		            border : false,
		            closed: false,
		            padding : "5px",
		            cache: false,
		            title : false,
		            resizable : true,
		            modal: true,
		            shadow : false
				});
				$(".secondChannelSection #modifyFieldDialog div.elementHolder").empty();
				$(".secondChannelSection #modifyFieldDialog div.elementHolder").append('<div class="input-group date" style="width:' + (parseInt(trgtTd.width()) + 7 -39) + 'px">'+
																	'<input class="myDateTimePicker form-control" id="startTime" '+
																	'style="height:' + (parseInt(trgtTd.height()) + 7) + 'px;'+
																	'width : ' + (parseInt(trgtTd.width()) + 7 -39) + 'px"></input>'+
																	'<span class="input-group-addon">'+
		                        										'<span class="glyphicon glyphicon-calendar"></span>'+
		                    										'</span>'+
		                    									'</div>')	
				$(".secondChannelSection #modifyFieldDialog .myDateTimePicker").datetimepicker({format: 'DD-MM-YYYY_hh:mm_A',stepping:20,minDate : new moment(),maxDate : new moment().add(7,'days').endOf('day')});
				$(".secondChannelSection #modifyFieldDialog .myDateTimePicker").data("DateTimePicker").date(new moment(trgtTdValue,"DD-MM-YYYY_hh:mm_A"));
				
				
				$(".secondChannelSection #" + visibleTableJQ[0].id).off('keyup').on('keyup', function(evt){
					// if(evt.keyCode == 13){
					// 	commonData.updateTableWithResource();
					// }else 
					if(evt.keyCode == 27){
						revertTableUpdate(secondChannel.visibleTableAPI, secondChannel.visibleTableJQ);
					}
				});

				$(".secondChannelSection .window-mask").off('click').on('click',function(){
					startTime = $(".secondChannelSection #startTime").data("DateTimePicker").date().format('DD-MM-YYYY_hh:mm_A');
					text = ''
					commonData.updateTableWithResource(secondChannel.visibleTableAPI, secondChannel.visibleTableJQ, startTime, '', 0);
				})
			}else if((visibleTableJQ[0].id == "groupsSecondChannelGeneralTable" && trgtTd.index() == 2) || 
				(visibleTableJQ[0].id == "clustersSecondChannelGeneralTable" && trgtTd.index() == 2) ||
				(visibleTableJQ[0].id == "groupsSecondChannelPlannedTable" && trgtTd.index() == 3) || 
				(visibleTableJQ[0].id == "clustersSecondChannelPlannedTable" && trgtTd.index() == 3)){
				secondChannel.trgtTd = trgtTd
				createPicker();
				
				// $(".secondChannelSection #modifyFieldDialog").dialog({
		  //           constrain : true,
		  //           top : trgtTd.offset().top,
		  //           left : trgtTd.offset().left,
		  //           border : false,
		  //           closed: false,
		  //           padding : "5px",
		  //           cache: false,
		  //           title : false,
		  //           resizable : true,
		  //           modal: true,
		  //           shadow : false
				// });
				// $(".secondChannelSection #modifyFieldDialog div.elementHolder").empty();

				
				// imagesArray = [];
				// videosArray = [];
				// imagesOptGroup = "<optgroup label='Images'>"
				// videosOptGroup = "<optgroup label='Videos'>"
				// $.each(secondChannel.resources,function(index,value){
				// 	if(value.split('.')[1].toUpperCase() == "JPG" || value.split('.')[1].toUpperCase() == "JPEG"){
				// 		// imagesArray.push(value);
				// 		imagesOptGroup += '<option value="' + value + '">' + value +'</option>'
				// 	}else if(value.split('.')[1].toUpperCase() == "MP4" || value.split('.')[1].toUpperCase() == "WEBM"){
				// 		// videosArray.push(value)
				// 		videosOptGroup += '<option value="' + value + '">' + value +'</option>'
				// 	}
				// })

				// imagesOptGroup += '</optgroup>';
				// videosOptGroup += '</optgroup>';

				// resourcesSelect = `<select class='resourceSelect' 
				// 				 	style="height:` + (parseInt(trgtTd.height()) + 30) + `px;
				// 				 	width:` + (parseInt(trgtTd.width()) + 16) + `px">` + 
				// 				 	imagesOptGroup + videosOptGroup + `</select>`

				// $(".secondChannelSection #modifyFieldDialog div.elementHolder").append(resourcesSelect)
				
				// $(".secondChannelSection select.resourceSelect").multipleSelect({
				// 	single: true,
				// 	filter: true,
				// 	placeholder : 'Select Resource',
				// 	onClick: function(view) {
				// 		commonData.updateTableWithResource(secondChannel.visibleTableAPI, secondChannel.visibleTableJQ,'', view.value,0)
				// 		// console.log(view.value)
				// 		// console.log(view.checked)
		  //           }
				// })

				// $(".secondChannelSection select.resourceSelect").multipleSelect("setSelects", [trgtTdValue]);

				// $(".secondChannelSection .ms-choice").focus();
				

				// $(".secondChannelSection .ms-choice").off('keyup').on('keyup', function(evt){
				// 	// if(evt.keyCode == 13){
				// 	// 	commonData.updateTableWithResource();
				// 	// }else 
				// 	if(evt.keyCode == 27){
				// 		revertTableUpdate(secondChannel.visibleTableAPI, secondChannel.visibleTableJQ);
				// 	}
				// });



				// $(".secondChannelSection .window-mask").off('click').on('click',function(){
				// 	resource = $(".secondChannelSection select.resourceSelect").multipleSelect('getSelects').length!=0 ? $(".secondChannelSection select.resourceSelect").multipleSelect('getSelects') : [""] 
				// 	commonData.updateTableWithResource(secondChannel.visibleTableAPI, secondChannel.visibleTableJQ, '', resource[0], 0);
					
				// })
			}else if(trgtTd.index() == 3){
				secondChannel.trgtTd = trgtTd;
				duration = trgtTd.text();
				$(".secondChannelSection #modifyFieldDialog").dialog({
		            constrain : true,
		            top : trgtTd.offset().top,
		            left : trgtTd.offset().left,
		            border : false,
		            closed: false,
		            padding : "5px",
		            cache: false,
		            title : false,
		            resizable : true,
		            modal: true,
		            shadow : false
				});
				$(".secondChannelSection #modifyFieldDialog div.elementHolder").empty();

					durationInput = `<input type="text" id="duration" value="`+ duration +`" style="height:` + (parseInt(trgtTd.height())+7) + `px;
							 	width:` + (parseInt(trgtTd.width()) + 7) + `px">`;

					$(".secondChannelSection #modifyFieldDialog div.elementHolder").append(durationInput)
					
					$(".secondChannelSection #duration").focus();
					$(".secondChannelSection #duration").off('keyup').on('keyup', function(evt){
						if(evt.keyCode == 13){
							duration = $(".secondChannelSection #duration").val();
							commonData.updateTableWithResource(secondChannel.visibleTableAPI, secondChannel.visibleTableJQ,'','',duration);
						}else 
						if(evt.keyCode == 27){
							revertTableUpdate(secondChannel.visibleTableAPI, secondChannel.visibleTableJQ);
						}
					});

					$(".secondChannelSection .window-mask").off('click').on('click',function(){
						duration = $(".secondChannelSection #duration").val();
						commonData.updateTableWithResource(secondChannel.visibleTableAPI, secondChannel.visibleTableJQ,'','',duration);
					})

						$(".secondChannelSection input#duration").off('input propertychange').on('input propertychange', function (xx,yy,zz) {
					        $(".secondChannelSection #duration").val($(this).val().replace(/[A-Z 0a-z.~!@#$%^&*()\-_+=-?></.,":';/\|\{\}\[\]\\]/g, ''))
					    })
			}
		}
	}

	$(".secondChannelSection input").on('input propertychange','#duration', function (xx,yy,zz) {
        $(".secondChannelSection #duration").val($(this).val().replace(/[A-Z 0a-z.~!@#$%^&*()\-_+=-?></.,":';/\|\{\}\[\]\\]/g, ''))
    })

	commonData.updateTableWithResource = function(visibleTableAPI, visibleTableJQ, startTime, resourceName, duration){
		rowNo = parseInt(secondChannel.trgtTd.closest('tr').find('td').first().text()) -1
		// resources.resourcesTableJQ.fnUpdate({resourceName : resourceName, resourceType : 'image'},rowNo);
		

		duration = parseInt(duration)
		if(isNaN(duration)) duration = 5;

		page = visibleTableAPI.page.info().page;
		if(visibleTableJQ[0].id == "groupsSecondChannelGeneralTable"){
			if(resourceName != ""){
				visibleTableAPI.cell(rowNo,2).data(resourceName)
				// visibleTableAPI.cell(rowNo,4).data(duration)
			}
			if(duration != 0)
				visibleTableAPI.cell(rowNo,3).data(duration)
		}else if(visibleTableJQ[0].id == "groupsSecondChannelPlannedTable"){
			if(resourceName != ""){
				visibleTableAPI.cell(rowNo,3).data(resourceName)
				// visibleTableAPI.cell(rowNo,4).data(duration)
			}
			if(startTime != ""){
				visibleTableAPI.cell(rowNo,2).data(startTime)

			}
			// visibleTableAPI.cell(rowNo,4).data(resourceType)
		}
		// else if(visibleTableJQ[0].id == "clustersSecondChannelGeneralTable"){
		// 	if(resourceName != ""){
		// 		visibleTableAPI.cell(rowNo,3).data(resourceName)
		// 		// visibleTableAPI.cell(rowNo,3).data(resourceType)
		// 	}
		// 	if(duration != 0)
		// 		visibleTableAPI.cell(rowNo,4).data(duration)
		// }else if(visibleTableJQ[0].id == "clustersSecondChannelPlannedTable"){
		// 	if(resourceName != ""){
		// 		visibleTableAPI.cell(rowNo,4).data(resourceName)
		// 		// visibleTableAPI.cell(rowNo,4).data(resourceType)
		// 	}
		// 	if(startTime != ""){
		// 		visibleTableAPI.cell(rowNo,3).data(startTime)

		// 	}
		// }

		commonData.updateSerialNo(visibleTableAPI);

		visibleTableAPI.page( page ).draw( 'page' );
		if($(".secondChannelSection #modifyFieldDialog").is(":visible"))
			$(".secondChannelSection #modifyFieldDialog").dialog('close')
		$(visibleTableAPI.rows().nodes().toJQuery()[rowNo]).fadeOut();
		$(visibleTableAPI.rows().nodes().toJQuery()[rowNo]).fadeIn();
		visibleTableAPI.keys.enable();
	}

	function revertTableUpdate(visibleTableAPI, visibleTableJQ){
		$(".secondChannelSection #modifyFieldDialog").dialog('close')
		visibleTableAPI.keys.enable()
	}

	$(".secondChannelSection #addNewResourceButton").off('click').on('click',function(evt){
		recordsTotal = secondChannel.visibleTableAPI.page.info().recordsTotal;

		// if(!secondChannel.resources || secondChannel.resources.length == 0){
		// 	$.notify('No resource available.','error')
		// }else{
			// var resourceType = 'image'
			// if(secondChannel.resources[0].split('.')[1].toUpperCase() == "JPG" || secondChannel.resources[0].split('.')[1].toUpperCase() == "JPEG"){
			// 	resourceType = 'image'
			// }else if(secondChannel.resources[0].split('.')[1].toUpperCase() == "MP4" || secondChannel.resources[0].split('.')[1].toUpperCase() == "WEBM"){
			// 	resourceType = 'video'
			// }
			dt = {};
			if(secondChannel.visibleTableJQ.attr('id') == 'groupsSecondChannelGeneralTable'){
				// groupOrClusterKey = "groupName";
		    	// groupOrCluster = $(".secondChannelSection #groupSelectFilter").multipleSelect('getSelects')[0];
		    	dt = {sno :  recordsTotal + 1,resName : "",  duration : 5};
			}
			// if(secondChannel.visibleTableJQ.attr('id') == 'clustersSecondChannelGeneralTable'){
			// 	groupOrClusterKey = "clusterName";
			// 	groupOrCluster = $(".secondChannelSection #clusterSelectFilter").multipleSelect('getSelects')[0];
			// 	dt = {sno :  recordsTotal + 1,resName : "",  duration : 5};
			// }

			if(secondChannel.visibleTableJQ.attr('id') == 'groupsSecondChannelPlannedTable'){
				// groupOrClusterKey = "groupName";
				// groupOrCluster = $(".secondChannelSection #groupSelectFilter").multipleSelect('getSelects')[0];
				remainder = new moment(new Date()).minutes()%20
				startTime = new moment(new Date()).subtract(remainder,'minutes').add('minutes',20).format('DD-MM-YYYY_hh:mm_A')
				// startTime.add('minutes',20);
				dt = {sno :  recordsTotal + 1,resName : "",  time : startTime};
			}
			// if(secondChannel.visibleTableJQ.attr('id') == 'clustersSecondChannelPlannedTable'){
			// 	groupOrClusterKey = "clusterName";
			// 	groupOrCluster = $(".secondChannelSection #clusterSelectFilter").multipleSelect('getSelects')[0];
			// 	remainder = new moment(new Date()).minutes()%20
			// 	startTime = new moment(new Date()).subtract(remainder,'minutes').format('DD-MM-YYYY HH:mm')
			// 	dt = {sno :  recordsTotal + 1,resName : "",  time : startTime};
			// }


			// dt = {sno :  recordsTotal + 1,resourceName : secondChannel.resources[0], resourceType : resourceType, duration : 15, clientName : clientName, updatedBy : "",updatedAt : ""};
			
			// dt[groupOrClusterKey] = groupOrCluster;

			secondChannel.visibleTableJQ.fnAddData(dt);
			secondChannel.visibleTableAPI.page( 'last' ).draw( 'page' );

			$(secondChannel.visibleTableAPI.rows().nodes().toJQuery()[recordsTotal]).fadeOut();
			$(secondChannel.visibleTableAPI.rows().nodes().toJQuery()[recordsTotal]).fadeIn();
		// }
	})


	$(".secondChannelSection #saveResourcesButton").off('click').on('click',function(evt){
		$(".secondChannelSection #loadingDiv").show();
		secondChannelDataArray = secondChannel.visibleTableJQ.fnGetData();
		// postData = {}
		// groupOrClusterNameFromTable = secondChannelDataArray[0].groupName;
		// if(typeof(groupOrClusterNameFromTable) == 'undefined'){
		// 	groupOrClusterNameFromTable = secondChannelDataArray[0].clusterName;
		// 	// postData.clusterName = groupOrClusterNameFromTable;
		// }else{
		// 	// postData.groupName = groupOrClusterNameFromTable;
		// }
		
		secondChannelDataArray = _.filter(secondChannelDataArray,function(value){
			return value.resName != ""
		})
		if(secondChannel.visibleTableJQ.attr('id') == 'groupsSecondChannelGeneralTable'){
			groupName = $(".secondChannelSection #groupSelectFilter").multipleSelect('getSelects')[0];
			url = commonData.apiurl + 'shared/ch2_g' + "/" + "NO" + "/" + groupName
		}
		// if(secondChannel.visibleTableJQ.attr('id') == 'clustersSecondChannelGeneralTable'){
		// 	clusterName = $(".secondChannelSection #clusterSelectFilter").multipleSelect('getSelects')[0];
		// 	url = commonData.apiurl + 'ch1_genDev' + "/" + clientName + "/" + clusterName
		// }

		if(secondChannel.visibleTableJQ.attr('id') == 'groupsSecondChannelPlannedTable'){
			groupName = $(".secondChannelSection #groupSelectFilter").multipleSelect('getSelects')[0];
			url = commonData.apiurl + 'planned/ch2_p' + "/" + "NO" + "/" + groupName
		}
		// if(secondChannel.visibleTableJQ.attr('id') == 'clustersSecondChannelPlannedTable'){
		// 	clusterName = $(".secondChannelSection #clusterSelectFilter").multipleSelect('getSelects')[0];
		// 	url = commonData.apiurl + 'ch1_planDev' + "/" + clientName + "/" + clusterName
		// }


    	secondChannelDataArray = _.map(secondChannelDataArray, function(model) {
			return _.omit(model, 'sno');
		});
		// postData.data = secondChannelDataArray;

		$.ajax({
			  type: "POST",
			  async : false,
			  url: url,
			  data: JSON.stringify(secondChannelDataArray),
			  success: function(data){
			  	$.notify('Success','success')
			  	secondChannel.visibleTableAPI.ajax.reload();
			  	// checkIfAnyUpdate(function(result){
			  	// 	if(result == true){
			  	// 		$(parent.document.body).find('#updateFirebaseButton').show();
			  	// 		$(parent.document.body).find('#updateFirebaseError').hide();
			  	// 	}else if(result == false){
			  	// 		$(parent.document.body).find('#updateFirebaseButton').hide();
			  	// 		$(parent.document.body).find('#updateFirebaseError').hide();
			  	// 	}else{
			  	// 		$(parent.document.body).find('#updateFirebaseButton').hide();
			  	// 		$(parent.document.body).find('#updateFirebaseError').show();
			  	// 	}
			  	// })
			  	// campaigns.groupsCampaignsTableAPI.ajax.reload(function(){
					// $('.secondChannelSection #addNewResourceDialog').dialog('close');
				  	// recordsTotal = resources.resourcesTableAPI.page.info().recordsTotal;
				  	// resources.resourcesTableAPI.page( 'first' ).draw( 'page' );
				  	// $(clients.clientsTableAPI.rows().nodes().toJQuery()[recordsTotal]).fadeOut();
					// $(clients.clientsTableAPI.rows().nodes().toJQuery()[recordsTotal]).fadeIn();
			  	// });
			  },
			  error : function(jqXHR, textStatus){
		 		if(jqXHR.responseText)
					$.notify(jqXHR.responseText,'error')
			  },
			  dataType: 'json',
			  contentType: "application/json",
			});
	});
	


    commonData.updateSerialNo = function(apiInstance){
		// data = apiInstance.rows().data();
		data = apiInstance.data();
		$.each(data, function(index, value){
			apiInstance.cell(index,0).data(index+1);
		})
		// apiInstance.rows().draw();
		apiInstance.draw();
	}


	// $.fn.dataTable.ext.errMode = 'none';

	
}