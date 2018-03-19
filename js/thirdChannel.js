thirdChannel = {}
thirdChannel.resources = []

function loadThirdChannel(){
// thirdChannel.resources = ["img1.jpg","img2.jpg","vid1.mp4","vid2.mp4","vid3.mp4","vid4.mp4","img3.jpg","img4.jpg"];
// window.onload = function(){
	// XMLHttpRequest.prototype.realSend = XMLHttpRequest.prototype.send;
	// XMLHttpRequest.prototype.send = function(value) {
	// 	this.addEventListener('error', function(xx,yy){
			
	// 	}, false);
	// 	this.addEventListener("loadstart", function(xx,yy){
	//     	$(".thirdChannelSection #loadingDiv").show();
	//     }, false);
	//     this.addEventListener("progress", function(xx,yy){
	//     	$(".thirdChannelSection #loadingDiv").show();
	//     	loadedPer = xx.loaded/xx.total*100
	//     	if(isNaN(loadedPer)) $(".thirdChannelSection .ldBar")[0].ldBar.set(0)
	//     	else $(".thirdChannelSection .ldBar")[0].ldBar.set(loadedPer)
	//     }, false);
	//     this.addEventListener("loadend", function(xx,yy){
	//         setTimeout(function(){
	//         	$(".thirdChannelSection #loadingDiv").hide();
	//         	$(".thirdChannelSection .ldBar")[0].ldBar.set(0)
	//         },1300)
	//     }, false);
	//     this.realSend(value);
	// };
	// initialize tooltips
	$('.thirdChannelSection [data-toggle="tooltip"]').tooltip();

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
	// 				thirdChannel.resources = jqXHR.responseJSON;

	// 			}else if(textstatus == "error"){
	// 				if(jqXHR.responseText)
	// 					$.notify(jqXHR.responseText,'error')
	// 			}
	// 			console.log(jqXHR);
	// 		}
	// 	})
	// }
	

	$(".thirdChannelSection input[name='ThirdChannelDisplayTypeRadio']").on('change',function(){
		console.log(this.value)
		if(this.value == "Groups"){
			tabIndex = $(".thirdChannelSection #thirdChannelTabs").tabs('getTabIndex',$(".thirdChannelSection #thirdChannelTabs").tabs('getSelected'))
			groupName = $(".thirdChannelSection #groupSelectFilter").multipleSelect('getSelects')[0]
			if(tabIndex == 0){
				loadGroupsThirdChannelGeneralTable(groupName)
				thirdChannel.visibleTableAPI = thirdChannel.groupsThirdChannelGeneralTableAPI;
		    	thirdChannel.visibleTableJQ = thirdChannel.groupsThirdChannelGeneralTableJQ;
		    	$(".thirdChannelSection .clustersThirdChannelGeneralTableDiv").hide();
				$(".thirdChannelSection .groupsThirdChannelGeneralTableDiv").show();
		    }else{
		    	loadGroupsThirdChannelPlannedTable(groupName)
				thirdChannel.visibleTableAPI = thirdChannel.groupsThirdChannelPlannedTableAPI;
		    	thirdChannel.visibleTableJQ = thirdChannel.groupsThirdChannelPlannedTableJQ;
		    	$(".thirdChannelSection .clustersThirdChannelPlannedTableDiv").hide();
				$(".thirdChannelSection .groupsThirdChannelPlannedTableDiv").show();
		    }

			$(".thirdChannelSection #clusterSelectFilterDiv").parent().hide();
			$(".thirdChannelSection #groupSelectFilterDiv").parent().show();
			
		}
		// else if(this.value == "Clusters"){
		// 	tabIndex = $(".thirdChannelSection #thirdChannelTabs").tabs('getTabIndex',$(".thirdChannelSection #thirdChannelTabs").tabs('getSelected'))
		// 	clusterName = $(".thirdChannelSection #clusterSelectFilter").multipleSelect('getSelects')[0]
		// 	if(tabIndex == 0){
		// 		loadClustersThirdChannelGeneralTable(clusterName)
		// 		thirdChannel.visibleTableAPI = thirdChannel.clustersThirdChannelGeneralTableAPI;
		//     	thirdChannel.visibleTableJQ = thirdChannel.clustersThirdChannelGeneralTableJQ;
		//     	$(".thirdChannelSection .groupsThirdChannelGeneralTableDiv").hide();
		// 		$(".thirdChannelSection .clustersThirdChannelGeneralTableDiv").show();
		//     }else{
		//     	loadClustersThirdChannelPlannedTable(clusterName)
		// 		thirdChannel.visibleTableAPI = thirdChannel.clustersThirdChannelPlannedTableAPI;
		//     	thirdChannel.visibleTableJQ = thirdChannel.clustersThirdChannelPlannedTableJQ;
		//     	$(".thirdChannelSection .groupsThirdChannelPlannedTableDiv").hide();
		// 		$(".thirdChannelSection .clustersThirdChannelPlannedTableDiv").show();
		//     }


		// 	$(".thirdChannelSection #groupSelectFilterDiv").parent().hide();
		// 	$(".thirdChannelSection #clusterSelectFilterDiv").parent().show();
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
						$(".thirdChannelSection #groupSelectFilter").empty();
						$(".thirdChannelSection #groupSelectFilter").append(options);
						$(".thirdChannelSection #groupSelectFilter").attr("disabled",true);
						
						$(".thirdChannelSection #groupSelectFilter").multipleSelect({
							placeholder: "Select Group",
							filter: true,
							single : true,
							allSelected : false,
							onClick : function(view){
								tabIndex = $(".thirdChannelSection #thirdChannelTabs").tabs('getTabIndex',$(".thirdChannelSection #thirdChannelTabs").tabs('getSelected'))
								groupName = view.value;
								if(tabIndex == 0){
									loadGroupsThirdChannelGeneralTable(groupName)
									thirdChannel.visibleTableAPI = thirdChannel.groupsThirdChannelGeneralTableAPI;
							    	thirdChannel.visibleTableJQ = thirdChannel.groupsThirdChannelGeneralTableJQ;
							    }else{
							    	loadGroupsThirdChannelPlannedTable(groupName)
									thirdChannel.visibleTableAPI = thirdChannel.groupsThirdChannelPlannedTableAPI;
							    	thirdChannel.visibleTableJQ = thirdChannel.groupsThirdChannelPlannedTableJQ;
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
			$(".thirdChannelSection #groupSelectFilter").empty();
			$(".thirdChannelSection #groupSelectFilter").append(options);
			$(".thirdChannelSection #groupSelectFilter").attr('disabled',true);
			$(".thirdChannelSection #groupSelectFilter").multipleSelect({
					placeholder: "Select Group",
					filter: true,
					single : true,
					allSelected : false,
					onClick : function(view){
						tabIndex = $(".thirdChannelSection #thirdChannelTabs").tabs('getTabIndex',$(".thirdChannelSection #thirdChannelTabs").tabs('getSelected'))
						groupName = view.value;
						if(tabIndex == 0){
							loadGroupsThirdChannelGeneralTable(groupName)
							thirdChannel.visibleTableAPI = thirdChannel.groupsThirdChannelGeneralTableAPI;
					    	thirdChannel.visibleTableJQ = thirdChannel.groupsThirdChannelGeneralTableJQ;
					    }else{
					    	loadGroupsThirdChannelPlannedTable(groupName)
							thirdChannel.visibleTableAPI = thirdChannel.groupsThirdChannelPlannedTableAPI;
					    	thirdChannel.visibleTableJQ = thirdChannel.groupsThirdChannelPlannedTableJQ;
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
	// 				$(".thirdChannelSection #clusterSelectFilter").empty();
	// 				$(".thirdChannelSection #clusterSelectFilter").append(options);
					
	// 				$(".thirdChannelSection #clusterSelectFilter").multipleSelect({
	// 					placeholder: "Select Cluster",
	// 					filter: true,
	// 					single : true,
	// 					onClick : function(view){
	// 						tabIndex = $(".thirdChannelSection #thirdChannelTabs").tabs('getTabIndex',$(".thirdChannelSection #thirdChannelTabs").tabs('getSelected'))
	// 						groupName = view.value;
	// 						if(tabIndex == 0){
	// 							loadClustersThirdChannelGeneralTable(groupName)
	// 							thirdChannel.visibleTableAPI = thirdChannel.clustersThirdChannelGeneralTableAPI;
	// 					    	thirdChannel.visibleTableJQ = thirdChannel.clustersThirdChannelGeneralTableJQ;
	// 					    }else{
	// 					    	loadClustersThirdChannelPlannedTable(groupName)
	// 							thirdChannel.visibleTableAPI = thirdChannel.clustersThirdChannelPlannedTableAPI;
	// 					    	thirdChannel.visibleTableJQ = thirdChannel.clustersThirdChannelPlannedTableJQ;
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
	groupName = $(".thirdChannelSection #groupSelectFilter").multipleSelect('getSelects')[0];
	loadGroupsThirdChannelGeneralTable(groupName)


	function loadGroupsThirdChannelGeneralTable(groupName){
		if(thirdChannel.groupsThirdChannelGeneralTableJQ) {
			thirdChannel.groupsThirdChannelGeneralTableJQ.fnClearTable();
			thirdChannel.groupsThirdChannelGeneralTableJQ.fnDestroy();
		}

		thirdChannel.groupsThirdChannelGeneralTableAPI = $('.thirdChannelSection #groupsThirdChannelGeneralTable').DataTable({
	        "ajax" : {
				url : commonData.apiurl + "shared/ch3_g/" + "NO" + "/" + groupName,
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
					thirdChannel.groupsThirdChannelGeneralTableAPI.clear().draw();
					// thirdChannel.visibleTableAPI = undefined;
			  //   	thirdChannel.visibleTableJQ = undefined;
			  //   	thirdChannel.groupsThirdChannelGeneralTableAPI = undefined;
    	// 			thirdChannel.groupsThirdChannelGeneralTableJQ = undefined;
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
	    		// $(".thirdChannelSection #thirdChannelGeneralTable tbody td:nth-child(1)").prepend('<div class="reorderHandler">::</div>')
	    	}
	    });
	    thirdChannel.groupsThirdChannelGeneralTableJQ = $('.thirdChannelSection #groupsThirdChannelGeneralTable').dataTable();

	    // thirdChannel.visibleTableAPI = thirdChannel.groupsThirdChannelGeneralTableAPI;
    	// thirdChannel.visibleTableJQ = thirdChannel.groupsThirdChannelGeneralTableJQ;
	}

	// function loadClustersThirdChannelGeneralTable(clusterName){
	// 	if(thirdChannel.clustersThirdChannelGeneralTableJQ) {
	// 		thirdChannel.clustersThirdChannelGeneralTableJQ.fnClearTable();
	// 		thirdChannel.clustersThirdChannelGeneralTableJQ.fnDestroy();
	// 	}

	// 	thirdChannel.clustersThirdChannelGeneralTableAPI = $('.thirdChannelSection #clustersThirdChannelGeneralTable').DataTable({
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
	// 				thirdChannel.clustersThirdChannelGeneralTableAPI.clear().draw();
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
	//     		// $(".thirdChannelSection #thirdChannelGeneralTable tbody td:nth-child(1)").prepend('<div class="reorderHandler">::</div>')
	//     	}
	//     });
	//     thirdChannel.clustersThirdChannelGeneralTableJQ = $('.thirdChannelSection #clustersThirdChannelGeneralTable').dataTable();

	//     // thirdChannel.visibleTableAPI = thirdChannel.clustersThirdChannelGeneralTableAPI;
 //    	// thirdChannel.visibleTableJQ = thirdChannel.clustersThirdChannelGeneralTableJQ;
	// }

	function loadGroupsThirdChannelPlannedTable(groupName){
		if(thirdChannel.groupsThirdChannelPlannedTableJQ) {
			thirdChannel.groupsThirdChannelPlannedTableJQ.fnClearTable();
			thirdChannel.groupsThirdChannelPlannedTableJQ.fnDestroy();
		}

	    thirdChannel.groupsThirdChannelPlannedTableAPI = $('.thirdChannelSection #groupsThirdChannelPlannedTable').DataTable({
	        "ajax" : {
				url : commonData.apiurl + "planned/ch3_p/" + "NO" + "/" + groupName,
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
					thirdChannel.groupsThirdChannelPlannedTableAPI.clear().draw();
					// irstChannel.visibleTableAPI = undefined;
			  //   	thirdChannel.visibleTableJQ = undefined;
			  //   	thirdChannel.groupsThirdChannelPlannedTableAPI = undefined;
    	// 			thirdChannel.groupsThirdChannelPlannedTableJQ = undefined
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
	    thirdChannel.groupsThirdChannelPlannedTableJQ = $('.thirdChannelSection #groupsThirdChannelPlannedTable').dataTable();

	}

	// function loadClustersThirdChannelPlannedTable(clusterName){
	// 	if(thirdChannel.clustersThirdChannelPlannedTableJQ) {
	// 		thirdChannel.clustersThirdChannelPlannedTableJQ.fnClearTable();
	// 		thirdChannel.clustersThirdChannelPlannedTableJQ.fnDestroy();
	// 	}

	//     thirdChannel.clustersThirdChannelPlannedTableAPI = $('.thirdChannelSection #clustersThirdChannelPlannedTable').DataTable({
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
	// 				thirdChannel.clustersThirdChannelPlannedTableAPI.clear().draw();
	// 				// thirdChannel.visibleTableAPI = undefined;
	// 		  //   	thirdChannel.visibleTableJQ = undefined;
	// 		  //   	thirdChannel.clustersThirdChannelPlannedTableAPI = undefined;
 //    	// 			thirdChannel.clustersThirdChannelPlannedTableJQ = undefined
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
	//     thirdChannel.clustersThirdChannelPlannedTableJQ = $('.thirdChannelSection #clustersThirdChannelPlannedTable').dataTable();

	//     // thirdChannel.visibleTableAPI = thirdChannel.clustersThirdChannelPlannedTableAPI;
 //    	// thirdChannel.visibleTableJQ = thirdChannel.clustersThirdChannelPlannedTableJQ;
	// }

    thirdChannel.visibleTableAPI = thirdChannel.groupsThirdChannelGeneralTableAPI;
	thirdChannel.visibleTableJQ = thirdChannel.groupsThirdChannelGeneralTableJQ;
    $(".thirdChannelSection #thirdChannelTabs").tabs({
    	onSelect : function(title, index){
    		if(index == 0){
    			// if groups is checked
    			if($(".thirdChannelSection input[name='ThirdChannelDisplayTypeRadio']")[0].checked){
    				groupName = $(".thirdChannelSection #groupSelectFilter").multipleSelect('getSelects')[0];
    				$(".thirdChannelSection .groupsThirdChannelGeneralTableDiv").show();
					$(".thirdChannelSection .clustersThirdChannelGeneralTableDiv").hide();
					loadGroupsThirdChannelGeneralTable(groupName)

			    	thirdChannel.visibleTableAPI = thirdChannel.groupsThirdChannelGeneralTableAPI;
			    	thirdChannel.visibleTableJQ = thirdChannel.groupsThirdChannelGeneralTableJQ;
    			}else{
    	// 			clusterName = $(".thirdChannelSection #clusterSelectFilter").multipleSelect('getSelects')[0];
    	// 			$(".thirdChannelSection .groupsThirdChannelGeneralTableDiv").hide();
					// $(".thirdChannelSection .clustersThirdChannelGeneralTableDiv").show();
					// loadClustersThirdChannelGeneralTable(clusterName)

    	// 			thirdChannel.visibleTableAPI = thirdChannel.clustersThirdChannelGeneralTableAPI;
			  //   	thirdChannel.visibleTableJQ = thirdChannel.clustersThirdChannelGeneralTableJQ;
    			}
		    	// $(".thirdChannelSection #clearSelectedslotsButton").hide()
		    	// $(".thirdChannelSection #addNewResourceButton").show()
				// $(".thirdChannelSection #deleteSelectedresourcesButton").show();
    		}else{
    			// if groups is checked
    			if($(".thirdChannelSection input[name='ThirdChannelDisplayTypeRadio']")[0].checked){
			    	groupName = $(".thirdChannelSection #groupSelectFilter").multipleSelect('getSelects')[0];
			    	$(".thirdChannelSection .groupsThirdChannelPlannedTableDiv").show();
					$(".thirdChannelSection .clustersThirdChannelPlannedTableDiv").hide();
					loadGroupsThirdChannelPlannedTable(groupName)

			    	thirdChannel.visibleTableAPI = thirdChannel.groupsThirdChannelPlannedTableAPI;
			    	thirdChannel.visibleTableJQ = thirdChannel.groupsThirdChannelPlannedTableJQ;


    			}else{
    				clusterName = $(".thirdChannelSection #clusterSelectFilter").multipleSelect('getSelects')[0];
    				$(".thirdChannelSection .groupsThirdChannelPlannedTableDiv").hide();
					$(".thirdChannelSection .clustersThirdChannelPlannedTableDiv").show();
					loadClustersThirdChannelPlannedTable(clusterName)

    				thirdChannel.visibleTableAPI = thirdChannel.clustersThirdChannelPlannedTableAPI;
			    	thirdChannel.visibleTableJQ = thirdChannel.clustersThirdChannelPlannedTableJQ;
    			}

				// $(".thirdChannelSection #deleteSelectedresourcesButton").hide()
		    	// $(".thirdChannelSection #addNewResourceButton").hide()
				// $(".thirdChannelSection #clearSelectedslotsButton").show()
    		}
    	}
    })

    $('.thirdChannelSection #groupsThirdChannelGeneralTable tbody').on('click','td:nth-child(3)',function(evt){
		openFieldEditorDialog(thirdChannel.visibleTableAPI, thirdChannel.visibleTableJQ, evt);
	});

	$('.thirdChannelSection #groupsThirdChannelPlannedTable tbody').on('click','td:nth-child(4)',function(evt){
		openFieldEditorDialog(thirdChannel.visibleTableAPI, thirdChannel.visibleTableJQ, evt);
	});

	$('.thirdChannelSection #groupsThirdChannelPlannedTable tbody').on('click','td:nth-child(3)',function(evt){
		openFieldEditorDialog(thirdChannel.visibleTableAPI, thirdChannel.visibleTableJQ, evt);
	});

	$('.thirdChannelSection #groupsThirdChannelGeneralTable tbody').on('click','td:nth-child(4)',function(evt){
		openFieldEditorDialog(thirdChannel.visibleTableAPI, thirdChannel.visibleTableJQ, evt);
	});


	// $('.thirdChannelSection #clustersThirdChannelGeneralTable tbody').on('click','td:nth-child(4)',function(evt){
	// 	openFieldEditorDialog(thirdChannel.visibleTableAPI, thirdChannel.visibleTableJQ, evt);
	// });

	// $('.thirdChannelSection #clustersThirdChannelPlannedTable tbody').on('click','td:nth-child(4)',function(evt){
	// 	openFieldEditorDialog(thirdChannel.visibleTableAPI, thirdChannel.visibleTableJQ, evt);
	// });

	// $('.thirdChannelSection #clustersThirdChannelPlannedTable tbody').on('click','td:nth-child(5)',function(evt){
	// 	openFieldEditorDialog(thirdChannel.visibleTableAPI, thirdChannel.visibleTableJQ, evt);
	// });

	// $('.thirdChannelSection #clustersThirdChannelGeneralTable tbody').on('click','td:nth-child(5)',function(evt){
	// 	openFieldEditorDialog(thirdChannel.visibleTableAPI, thirdChannel.visibleTableJQ, evt);
	// });

	$(".thirdChannelSection #deleteSelectedresourcesButton").off('click').on('click',function(evt){
		if(confirm("Are you you want to delete selected entries permanently and update?")){
			$(".thirdChannelSection #loadingDiv").show();
			page = thirdChannel.visibleTableAPI.page.info().page;
			checkboxTD = thirdChannel.visibleTableAPI.rows().nodes().toJQuery();
			deleteRowsIndexes = []
			$.each(checkboxTD, function(index, value){
				isChecked = $(value).find('td:nth-child(2) input').is(':checked')
				if(isChecked){
					rowNo = parseInt($(value).find('td:nth-child(1)').text()) - 1;
					deleteRowsIndexes.push(rowNo)
				}

			})
			$.each(deleteRowsIndexes, function(index,value){
				thirdChannel.visibleTableJQ.fnDeleteRow(value-index, function(lg){
					// console.log(lg)
				});
			})
			commonData.updateSerialNo(thirdChannel.visibleTableAPI);
			thirdChannel.visibleTableAPI.page( page ).draw( 'page' );
			$(".thirdChannelSection #saveResourcesButton").click();
		}
	});

	$(".thirdChannelSection #clearSelectedslotsButton").off('click').on('click',function(evt){
		page = thirdChannel.visibleTableAPI.page.info().page;
		checkboxTD = thirdChannel.visibleTableAPI.rows().nodes().toJQuery();
		clearRowsIndexes = []
		$.each(checkboxTD, function(index, value){
			isChecked = $(value).find('td:nth-child(2) input').is(':checked')
			if(isChecked){
				rowNo = parseInt($(value).find('td:nth-child(1)').text()) - 1;
				clearRowsIndexes.push(rowNo)
			}

		})
		$.each(clearRowsIndexes, function(index,value){
			// thirdChannel.visibleTableAPI.cell(value,3).data("")
			thirdChannel.visibleTableAPI.cell(value,4).data("")

			$(thirdChannel.visibleTableAPI.rows().nodes().toJQuery()[value]).fadeOut();
			$(thirdChannel.visibleTableAPI.rows().nodes().toJQuery()[value]).fadeIn();
		})
		// commonData.updateSerialNo(thirdChannel.visibleTableAPI);
		thirdChannel.visibleTableAPI.page( page ).draw( 'page' );

		$.each(checkboxTD, function(index, value){
			$(value).find('td:nth-child(2) input').attr('checked',false)
		})
	});


	$(".thirdChannelSection #groupsThirdChannelGeneralTable").off('keyup').on('keyup', function(event){
		if(event.keyCode == 32){
			trgt = $(".thirdChannelSection #groupsThirdChannelGeneralTable tbody td.focus").closest('tr').find('.tableCheckbox input')
			trgt.click();
		}
	});

	// $(".thirdChannelSection #clustersThirdChannelGeneralTable").off('keyup').on('keyup', function(event){
	// 	if(event.keyCode == 32){
	// 		trgt = $(".thirdChannelSection #clustersThirdChannelGeneralTable tbody td.focus").closest('tr').find('.tableCheckbox input')
	// 		trgt.click();
	// 	}
	// });

	$(".thirdChannelSection #groupsThirdChannelPlannedTable").off('keyup').on('keyup', function(event){
		if(event.keyCode == 32){
			trgt = $(".thirdChannelSection #groupsThirdChannelPlannedTable tbody td.focus").closest('tr').find('.tableCheckbox input')
			trgt.click();
		}
	});

	// $(".thirdChannelSection #clustersThirdChannelPlannedTable").off('keyup').on('keyup', function(event){
	// 	if(event.keyCode == 32){
	// 		trgt = $(".thirdChannelSection #clustersThirdChannelPlannedTable tbody td.focus").closest('tr').find('.tableCheckbox input')
	// 		trgt.click();
	// 	}
	// });


	// this will clear the planned tab;le
	// $('.thirdChannelSection table tbody').on('click','td:nth-child(6)',function(evt){
 //    	deleteOrEditGroup(thirdChannel.visibleTableAPI, thirdChannel.visibleTableJQ, evt);
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
			if((visibleTableJQ[0].id == "groupsThirdChannelPlannedTable" && trgtTd.index() == 2) || (visibleTableJQ[0].id == "clustersThirdChannelPlannedTable" && trgtTd.index() == 2)){
				thirdChannel.trgtTd = trgtTd
				$("#modifyFieldDialog").dialog({
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
				$("#modifyFieldDialog div.elementHolder").empty();
				$("#modifyFieldDialog div.elementHolder").append('<div class="input-group date" style="width:' + (parseInt(trgtTd.width()) + 7 -39) + 'px">'+
																	'<input class="myDateTimePicker form-control" id="startTime" '+
																	'style="height:' + (parseInt(trgtTd.height()) + 7) + 'px;'+
																	'width : ' + (parseInt(trgtTd.width()) + 7 -39) + 'px"></input>'+
																	'<span class="input-group-addon">'+
		                        										'<span class="glyphicon glyphicon-calendar"></span>'+
		                    										'</span>'+
		                    									'</div>')	
				$("#modifyFieldDialog .myDateTimePicker").datetimepicker({format: 'DD-MM-YYYY_hh:mm_A',stepping:20,minDate : new moment(),maxDate : new moment().add(7,'days').endOf('day')});
				$("#modifyFieldDialog .myDateTimePicker").data("DateTimePicker").date(new moment(trgtTdValue,"DD-MM-YYYY_hh:mm_A"));
				
				
				$("#" + visibleTableJQ[0].id).off('keyup').on('keyup', function(evt){
					// if(evt.keyCode == 13){
					// 	commonData.updateTableWithResource();
					// }else 
					if(evt.keyCode == 27){
						revertTableUpdate(thirdChannel.visibleTableAPI, thirdChannel.visibleTableJQ);
					}
				});

				$(".window-mask").off('click').on('click',function(){
					startTime = $("#startTime").data("DateTimePicker").date().format('DD-MM-YYYY_hh:mm_A');
					text = ''
					commonData.updateTableWithResource(thirdChannel.visibleTableAPI, thirdChannel.visibleTableJQ, startTime, '', 0);
				})
			}else if((visibleTableJQ[0].id == "groupsThirdChannelGeneralTable" && trgtTd.index() == 2) || 
				(visibleTableJQ[0].id == "clustersThirdChannelGeneralTable" && trgtTd.index() == 2) ||
				(visibleTableJQ[0].id == "groupsThirdChannelPlannedTable" && trgtTd.index() == 3) || 
				(visibleTableJQ[0].id == "clustersThirdChannelPlannedTable" && trgtTd.index() == 3)){
				thirdChannel.trgtTd = trgtTd
				createPicker();
				
				// $("#modifyFieldDialog").dialog({
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
				// $("#modifyFieldDialog div.elementHolder").empty();

				
				// imagesArray = [];
				// videosArray = [];
				// imagesOptGroup = "<optgroup label='Images'>"
				// videosOptGroup = "<optgroup label='Videos'>"
				// $.each(thirdChannel.resources,function(index,value){
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

				// $("#modifyFieldDialog div.elementHolder").append(resourcesSelect)
				
				// $("select.resourceSelect").multipleSelect({
				// 	single: true,
				// 	filter: true,
				// 	placeholder : 'Select Resource',
				// 	onClick: function(view) {
				// 		commonData.updateTableWithResource(thirdChannel.visibleTableAPI, thirdChannel.visibleTableJQ,'', view.value,0)
				// 		// console.log(view.value)
				// 		// console.log(view.checked)
		  //           }
				// })

				// $("select.resourceSelect").multipleSelect("setSelects", [trgtTdValue]);

				// $(".ms-choice").focus();
				

				// $(".ms-choice").off('keyup').on('keyup', function(evt){
				// 	// if(evt.keyCode == 13){
				// 	// 	commonData.updateTableWithResource();
				// 	// }else 
				// 	if(evt.keyCode == 27){
				// 		revertTableUpdate(thirdChannel.visibleTableAPI, thirdChannel.visibleTableJQ);
				// 	}
				// });



				// $(".window-mask").off('click').on('click',function(){
				// 	resource = $("select.resourceSelect").multipleSelect('getSelects').length!=0 ? $("select.resourceSelect").multipleSelect('getSelects') : [""] 
				// 	commonData.updateTableWithResource(thirdChannel.visibleTableAPI, thirdChannel.visibleTableJQ, '', resource[0], 0);
					
				// })
			}else if(trgtTd.index() == 3){
				thirdChannel.trgtTd = trgtTd;
				duration = trgtTd.text();
				$("#modifyFieldDialog").dialog({
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
				$("#modifyFieldDialog div.elementHolder").empty();

					durationInput = `<input type="text" id="duration" value="`+ duration +`" style="height:` + (parseInt(trgtTd.height())+7) + `px;
							 	width:` + (parseInt(trgtTd.width()) + 7) + `px">`;

					$("#modifyFieldDialog div.elementHolder").append(durationInput)
					
					$("#duration").focus();
					$("#duration").off('keyup').on('keyup', function(evt){
						if(evt.keyCode == 13){
							duration = $("#duration").val();
							commonData.updateTableWithResource(thirdChannel.visibleTableAPI, thirdChannel.visibleTableJQ,'','',duration);
						}else 
						if(evt.keyCode == 27){
							revertTableUpdate(thirdChannel.visibleTableAPI, thirdChannel.visibleTableJQ);
						}
					});

					$(".window-mask").off('click').on('click',function(){
						duration = $("#duration").val();
						commonData.updateTableWithResource(thirdChannel.visibleTableAPI, thirdChannel.visibleTableJQ,'','',duration);
					})

						$("input#duration").off('input propertychange').on('input propertychange', function (xx,yy,zz) {
					        $("#duration").val($(this).val().replace(/[A-Z 0a-z.~!@#$%^&*()\-_+=-?></.,":';/\|\{\}\[\]\\]/g, ''))
					    })
			}
		}
	}

	$("input").on('input propertychange','#duration', function (xx,yy,zz) {
        $("#duration").val($(this).val().replace(/[A-Z 0a-z.~!@#$%^&*()\-_+=-?></.,":';/\|\{\}\[\]\\]/g, ''))
    })

	commonData.updateTableWithResource = function(visibleTableAPI, visibleTableJQ, startTime, resourceName, duration){
		rowNo = parseInt(thirdChannel.trgtTd.closest('tr').find('td').first().text()) -1
		// resources.resourcesTableJQ.fnUpdate({resourceName : resourceName, resourceType : 'image'},rowNo);
		

		duration = parseInt(duration)
		if(isNaN(duration)) duration = 5;

		page = visibleTableAPI.page.info().page;
		if(visibleTableJQ[0].id == "groupsThirdChannelGeneralTable"){
			if(resourceName != ""){
				visibleTableAPI.cell(rowNo,2).data(resourceName)
				// visibleTableAPI.cell(rowNo,4).data(duration)
			}
			if(duration != 0)
				visibleTableAPI.cell(rowNo,3).data(duration)
		}else if(visibleTableJQ[0].id == "groupsThirdChannelPlannedTable"){
			if(resourceName != ""){
				visibleTableAPI.cell(rowNo,3).data(resourceName)
				// visibleTableAPI.cell(rowNo,4).data(duration)
			}
			if(startTime != ""){
				visibleTableAPI.cell(rowNo,2).data(startTime)

			}
			// visibleTableAPI.cell(rowNo,4).data(resourceType)
		}
		// else if(visibleTableJQ[0].id == "clustersThirdChannelGeneralTable"){
		// 	if(resourceName != ""){
		// 		visibleTableAPI.cell(rowNo,3).data(resourceName)
		// 		// visibleTableAPI.cell(rowNo,3).data(resourceType)
		// 	}
		// 	if(duration != 0)
		// 		visibleTableAPI.cell(rowNo,4).data(duration)
		// }else if(visibleTableJQ[0].id == "clustersThirdChannelPlannedTable"){
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
		if($("#modifyFieldDialog").is(":visible"))
			$("#modifyFieldDialog").dialog('close')
		$(visibleTableAPI.rows().nodes().toJQuery()[rowNo]).fadeOut();
		$(visibleTableAPI.rows().nodes().toJQuery()[rowNo]).fadeIn();
		visibleTableAPI.keys.enable();
	}

	function revertTableUpdate(visibleTableAPI, visibleTableJQ){
		$("#modifyFieldDialog").dialog('close')
		visibleTableAPI.keys.enable()
	}

	$(".thirdChannelSection #addNewResourceButton").off('click').on('click',function(evt){
		recordsTotal = thirdChannel.visibleTableAPI.page.info().recordsTotal;

		// if(!thirdChannel.resources || thirdChannel.resources.length == 0){
		// 	$.notify('No resource available.','error')
		// }else{
			// var resourceType = 'image'
			// if(thirdChannel.resources[0].split('.')[1].toUpperCase() == "JPG" || thirdChannel.resources[0].split('.')[1].toUpperCase() == "JPEG"){
			// 	resourceType = 'image'
			// }else if(thirdChannel.resources[0].split('.')[1].toUpperCase() == "MP4" || thirdChannel.resources[0].split('.')[1].toUpperCase() == "WEBM"){
			// 	resourceType = 'video'
			// }
			dt = {};
			if(thirdChannel.visibleTableJQ.attr('id') == 'groupsThirdChannelGeneralTable'){
				// groupOrClusterKey = "groupName";
		    	// groupOrCluster = $(".thirdChannelSection #groupSelectFilter").multipleSelect('getSelects')[0];
		    	dt = {sno :  recordsTotal + 1,resName : "",  duration : 5};
			}
			// if(thirdChannel.visibleTableJQ.attr('id') == 'clustersThirdChannelGeneralTable'){
			// 	groupOrClusterKey = "clusterName";
			// 	groupOrCluster = $(".thirdChannelSection #clusterSelectFilter").multipleSelect('getSelects')[0];
			// 	dt = {sno :  recordsTotal + 1,resName : "",  duration : 5};
			// }

			if(thirdChannel.visibleTableJQ.attr('id') == 'groupsThirdChannelPlannedTable'){
				// groupOrClusterKey = "groupName";
				// groupOrCluster = $(".thirdChannelSection #groupSelectFilter").multipleSelect('getSelects')[0];
				remainder = new moment(new Date()).minutes()%20
				startTime = new moment(new Date()).subtract(remainder,'minutes').add('minutes',20).format('DD-MM-YYYY_hh:mm_A')
				// startTime.add('minutes',20);
				dt = {sno :  recordsTotal + 1,resName : "",  time : startTime};
			}
			// if(thirdChannel.visibleTableJQ.attr('id') == 'clustersThirdChannelPlannedTable'){
			// 	groupOrClusterKey = "clusterName";
			// 	groupOrCluster = $(".thirdChannelSection #clusterSelectFilter").multipleSelect('getSelects')[0];
			// 	remainder = new moment(new Date()).minutes()%20
			// 	startTime = new moment(new Date()).subtract(remainder,'minutes').format('DD-MM-YYYY HH:mm')
			// 	dt = {sno :  recordsTotal + 1,resName : "",  time : startTime};
			// }


			// dt = {sno :  recordsTotal + 1,resourceName : thirdChannel.resources[0], resourceType : resourceType, duration : 15, clientName : clientName, updatedBy : "",updatedAt : ""};
			
			// dt[groupOrClusterKey] = groupOrCluster;

			thirdChannel.visibleTableJQ.fnAddData(dt);
			thirdChannel.visibleTableAPI.page( 'last' ).draw( 'page' );

			$(thirdChannel.visibleTableAPI.rows().nodes().toJQuery()[recordsTotal]).fadeOut();
			$(thirdChannel.visibleTableAPI.rows().nodes().toJQuery()[recordsTotal]).fadeIn();
		// }
	})


	$(".thirdChannelSection #saveResourcesButton").off('click').on('click',function(evt){
		$(".thirdChannelSection #loadingDiv").show();
		thirdChannelDataArray = thirdChannel.visibleTableJQ.fnGetData();
		// postData = {}
		// groupOrClusterNameFromTable = thirdChannelDataArray[0].groupName;
		// if(typeof(groupOrClusterNameFromTable) == 'undefined'){
		// 	groupOrClusterNameFromTable = thirdChannelDataArray[0].clusterName;
		// 	// postData.clusterName = groupOrClusterNameFromTable;
		// }else{
		// 	// postData.groupName = groupOrClusterNameFromTable;
		// }
		
		thirdChannelDataArray = _.filter(thirdChannelDataArray,function(value){
			return value.resName != ""
		})
		if(thirdChannel.visibleTableJQ.attr('id') == 'groupsThirdChannelGeneralTable'){
			groupName = $(".thirdChannelSection #groupSelectFilter").multipleSelect('getSelects')[0];
			url = commonData.apiurl + 'shared/ch3_g' + "/" + "NO" + "/" + groupName
		}
		// if(thirdChannel.visibleTableJQ.attr('id') == 'clustersThirdChannelGeneralTable'){
		// 	clusterName = $(".thirdChannelSection #clusterSelectFilter").multipleSelect('getSelects')[0];
		// 	url = commonData.apiurl + 'ch1_genDev' + "/" + clientName + "/" + clusterName
		// }

		if(thirdChannel.visibleTableJQ.attr('id') == 'groupsThirdChannelPlannedTable'){
			groupName = $(".thirdChannelSection #groupSelectFilter").multipleSelect('getSelects')[0];
			url = commonData.apiurl + 'planned/ch3_p' + "/" + "NO" + "/" + groupName
		}
		// if(thirdChannel.visibleTableJQ.attr('id') == 'clustersThirdChannelPlannedTable'){
		// 	clusterName = $(".thirdChannelSection #clusterSelectFilter").multipleSelect('getSelects')[0];
		// 	url = commonData.apiurl + 'ch1_planDev' + "/" + clientName + "/" + clusterName
		// }


    	thirdChannelDataArray = _.map(thirdChannelDataArray, function(model) {
			return _.omit(model, 'sno');
		});
		// postData.data = thirdChannelDataArray;

		$.ajax({
			  type: "POST",
			  async : false,
			  url: url,
			  data: JSON.stringify(thirdChannelDataArray),
			  success: function(data){
			  	$.notify('Success','success')
			  	thirdChannel.visibleTableAPI.ajax.reload();
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
					// $('.thirdChannelSection #addNewResourceDialog').dialog('close');
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