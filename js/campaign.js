campaign = {}
var gridster;
var draggingEvent;
campaign.camps = ['campaign1','campaign2','campaign3']
// campaign.resources = ["img1.jpg","img2.jpg","vid1.mp4","vid2.mp4","vid3.mp4","vid4.mp4","img3.jpg","img4.jpg"];
window.onload = function(){
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
	$('[data-toggle="tooltip"]').tooltip();

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
	// 				campaign.resources = jqXHR.responseJSON;

	// 			}else if(textstatus == "error"){
	// 				if(jqXHR.responseText)
	// 					$.notify(jqXHR.responseText,'error')
	// 			}
	// 			console.log(jqXHR);
	// 		}
	// 	})
	// }
	

	$("input[name='displayTypeRadio']").on('change',function(){
		console.log(this.value)
		if(this.value == "Groups"){
			tabIndex = $("#campaignTabs").tabs('getTabIndex',$("#campaignTabs").tabs('getSelected'))
			groupName = $("#groupSelectFilter").multipleSelect('getSelects')[0]
			if(tabIndex == 0){
				loadGroupsCampaignGeneralTable(groupName)
				campaign.visibleTableAPI = campaign.groupsCampaignGeneralTableAPI;
		    	campaign.visibleTableJQ = campaign.groupsCampaignGeneralTableJQ;
		    	$(".clustersCampaignGeneralTableDiv").hide();
				$(".groupsCampaignGeneralTableDiv").show();
		    }else{
		    	loadGroupsCampaignPlannedTable(groupName)
				campaign.visibleTableAPI = campaign.groupsCampaignPlannedTableAPI;
		    	campaign.visibleTableJQ = campaign.groupsCampaignPlannedTableJQ;
		    	$(".clustersCampaignPlannedTableDiv").hide();
				$(".groupsCampaignPlannedTableDiv").show();
		    }

			$("#clusterSelectFilterDiv").parent().hide();
			$("#groupSelectFilterDiv").parent().show();
			
		}
		// else if(this.value == "Clusters"){
		// 	tabIndex = $("#campaignTabs").tabs('getTabIndex',$("#campaignTabs").tabs('getSelected'))
		// 	clusterName = $("#clusterSelectFilter").multipleSelect('getSelects')[0]
		// 	if(tabIndex == 0){
		// 		loadClustersCampaignGeneralTable(clusterName)
		// 		campaign.visibleTableAPI = campaign.clustersCampaignGeneralTableAPI;
		//     	campaign.visibleTableJQ = campaign.clustersCampaignGeneralTableJQ;
		//     	$(".groupsCampaignGeneralTableDiv").hide();
		// 		$(".clustersCampaignGeneralTableDiv").show();
		//     }else{
		//     	loadClustersCampaignPlannedTable(clusterName)
		// 		campaign.visibleTableAPI = campaign.clustersCampaignPlannedTableAPI;
		//     	campaign.visibleTableJQ = campaign.clustersCampaignPlannedTableJQ;
		//     	$(".groupsCampaignPlannedTableDiv").hide();
		// 		$(".clustersCampaignPlannedTableDiv").show();
		//     }


		// 	$("#groupSelectFilterDiv").parent().hide();
		// 	$("#clusterSelectFilterDiv").parent().show();
		// }
	});


	function getAllGroups(){
		if(commonData.userType != 'Society'){

			$.ajax({
				// url : commonData.apiurl + "groups",
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
						$("#groupSelectFilter").empty();
						$("#groupSelectFilter").append(options);
						$("#groupSelectFilter").attr("disabled",true);
						
						$("#groupSelectFilter").multipleSelect({
							placeholder: "Select Group",
							filter: true,
							single : true,
							allSelected : false,
							onClick : function(view){
								tabIndex = $("#campaignTabs").tabs('getTabIndex',$("#campaignTabs").tabs('getSelected'))
								groupName = view.value;
								if(tabIndex == 0){
									loadGroupsCampaignGeneralTable(groupName)
									campaign.visibleTableAPI = campaign.groupsCampaignGeneralTableAPI;
							    	campaign.visibleTableJQ = campaign.groupsCampaignGeneralTableJQ;
							    }else{
							    	loadGroupsCampaignPlannedTable(groupName)
									campaign.visibleTableAPI = campaign.groupsCampaignPlannedTableAPI;
							    	campaign.visibleTableJQ = campaign.groupsCampaignPlannedTableJQ;
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
			$("#groupSelectFilter").empty();
			$("#groupSelectFilter").append(options);
			$("#groupSelectFilter").attr('disabled',true);
			$("#groupSelectFilter").multipleSelect({
					placeholder: "Select Group",
					filter: true,
					single : true,
					allSelected : false,
					onClick : function(view){
						tabIndex = $("#campaignTabs").tabs('getTabIndex',$("#campaignTabs").tabs('getSelected'))
						groupName = view.value;
						if(tabIndex == 0){
							loadGroupsCampaignGeneralTable(groupName)
							campaign.visibleTableAPI = campaign.groupsCampaignGeneralTableAPI;
					    	campaign.visibleTableJQ = campaign.groupsCampaignGeneralTableJQ;
					    }else{
					    	loadGroupsCampaignPlannedTable(groupName)
							campaign.visibleTableAPI = campaign.groupsCampaignPlannedTableAPI;
					    	campaign.visibleTableJQ = campaign.groupsCampaignPlannedTableJQ;
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
	// 				$("#clusterSelectFilter").empty();
	// 				$("#clusterSelectFilter").append(options);
					
	// 				$("#clusterSelectFilter").multipleSelect({
	// 					placeholder: "Select Cluster",
	// 					filter: true,
	// 					single : true,
	// 					onClick : function(view){
	// 						tabIndex = $("#campaignTabs").tabs('getTabIndex',$("#campaignTabs").tabs('getSelected'))
	// 						groupName = view.value;
	// 						if(tabIndex == 0){
	// 							loadClustersCampaignGeneralTable(groupName)
	// 							campaign.visibleTableAPI = campaign.clustersCampaignGeneralTableAPI;
	// 					    	campaign.visibleTableJQ = campaign.clustersCampaignGeneralTableJQ;
	// 					    }else{
	// 					    	loadClustersCampaignPlannedTable(groupName)
	// 							campaign.visibleTableAPI = campaign.clustersCampaignPlannedTableAPI;
	// 					    	campaign.visibleTableJQ = campaign.clustersCampaignPlannedTableJQ;
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
	groupName = $("#groupSelectFilter").multipleSelect('getSelects')[0];
	loadGroupsCampaignPlannedTable(groupName)


	// function loadGroupsCampaignGeneralTable(groupName){
	// 	if(campaign.groupsCampaignGeneralTableJQ) {
	// 		campaign.groupsCampaignGeneralTableJQ.fnClearTable();
	// 		campaign.groupsCampaignGeneralTableJQ.fnDestroy();
	// 	}

	// 	campaign.groupsCampaignGeneralTableAPI = $('#groupsCampaignGeneralTable').DataTable({
	//         "ajax" : {
	// 			url : commonData.apiurl + "shared/ch1_g/" + "NO" + "/" + groupName,
	// 			// url : "data/ch1_genGrp.json",
	// 			'async': 'false',
	// 			dataSrc : function(data){
	// 				// groupName_temp = data[0].groupName;
	// 				$.each(data, function(index, value){
	// 					value.sno = index + 1;
	// 					// value.groupName = groupName;
	// 				})
	// 				return data;
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
	// 				campaign.groupsCampaignGeneralTableAPI.clear().draw();
	// 				// campaign.visibleTableAPI = undefined;
	// 		  //   	campaign.visibleTableJQ = undefined;
	// 		  //   	campaign.groupsCampaignGeneralTableAPI = undefined;
 //    	// 			campaign.groupsCampaignGeneralTableJQ = undefined;
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
	//             // { "data": "groupName" },
	//             { "data": "resName" },
	//             // { "data": "resourceType" },
	//             { "data": "duration" },
	//             // { "data": "updatedBy" },
	//             // { "data": "updatedAt" }
	//     	],
	//     	drawCallback : function(settings){
	//     		// $("#campaignGeneralTable tbody td:nth-child(1)").prepend('<div class="reorderHandler">::</div>')
	//     	}
	//     });
	//     campaign.groupsCampaignGeneralTableJQ = $('#groupsCampaignGeneralTable').dataTable();

	//     // campaign.visibleTableAPI = campaign.groupsCampaignGeneralTableAPI;
 //    	// campaign.visibleTableJQ = campaign.groupsCampaignGeneralTableJQ;
	// }

	// function loadClustersCampaignGeneralTable(clusterName){
	// 	if(campaign.clustersCampaignGeneralTableJQ) {
	// 		campaign.clustersCampaignGeneralTableJQ.fnClearTable();
	// 		campaign.clustersCampaignGeneralTableJQ.fnDestroy();
	// 	}

	// 	campaign.clustersCampaignGeneralTableAPI = $('#clustersCampaignGeneralTable').DataTable({
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
	// 				campaign.clustersCampaignGeneralTableAPI.clear().draw();
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
	//     		// $("#campaignGeneralTable tbody td:nth-child(1)").prepend('<div class="reorderHandler">::</div>')
	//     	}
	//     });
	//     campaign.clustersCampaignGeneralTableJQ = $('#clustersCampaignGeneralTable').dataTable();

	//     // campaign.visibleTableAPI = campaign.clustersCampaignGeneralTableAPI;
 //    	// campaign.visibleTableJQ = campaign.clustersCampaignGeneralTableJQ;
	// }

	function loadGroupsCampaignPlannedTable(groupName){
		if(campaign.groupsCampaignPlannedTableJQ) {
			campaign.groupsCampaignPlannedTableJQ.fnClearTable();
			campaign.groupsCampaignPlannedTableJQ.fnDestroy();
		}

	    campaign.groupsCampaignPlannedTableAPI = $('#groupsCampaignPlannedTable').DataTable({
	        "ajax" : {
				// url : "/campData.json",
				url : commonData.apiurl + "planned/campaign/" + "NO" + "/" + groupName,
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
					campaign.groupsCampaignPlannedTableAPI.clear().draw();
					// irstChannel.visibleTableAPI = undefined;
			  //   	campaign.visibleTableJQ = undefined;
			  //   	campaign.groupsCampaignPlannedTableAPI = undefined;
    	// 			campaign.groupsCampaignPlannedTableJQ = undefined
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
	            { "data": "campName" },
	            { "data": "duration" },
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
	    campaign.groupsCampaignPlannedTableJQ = $('#groupsCampaignPlannedTable').dataTable();

	}

	// function loadClustersCampaignPlannedTable(clusterName){
	// 	if(campaign.clustersCampaignPlannedTableJQ) {
	// 		campaign.clustersCampaignPlannedTableJQ.fnClearTable();
	// 		campaign.clustersCampaignPlannedTableJQ.fnDestroy();
	// 	}

	//     campaign.clustersCampaignPlannedTableAPI = $('#clustersCampaignPlannedTable').DataTable({
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
	// 				campaign.clustersCampaignPlannedTableAPI.clear().draw();
	// 				// campaign.visibleTableAPI = undefined;
	// 		  //   	campaign.visibleTableJQ = undefined;
	// 		  //   	campaign.clustersCampaignPlannedTableAPI = undefined;
 //    	// 			campaign.clustersCampaignPlannedTableJQ = undefined
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
	//     campaign.clustersCampaignPlannedTableJQ = $('#clustersCampaignPlannedTable').dataTable();

	//     // campaign.visibleTableAPI = campaign.clustersCampaignPlannedTableAPI;
 //    	// campaign.visibleTableJQ = campaign.clustersCampaignPlannedTableJQ;
	// }

    campaign.visibleTableAPI = campaign.groupsCampaignPlannedTableAPI;
	campaign.visibleTableJQ = campaign.groupsCampaignPlannedTableJQ;
    $("#campaignTabs").tabs({
    	onSelect : function(title, index){
    		if(index == 0){
    			// if groups is checked
    			if($("input[name='displayTypeRadio']")[0].checked){
    				groupName = $("#groupSelectFilter").multipleSelect('getSelects')[0];
    				$(".groupsCampaignGeneralTableDiv").show();
					$(".clustersCampaignGeneralTableDiv").hide();
					loadGroupsCampaignGeneralTable(groupName)

			    	campaign.visibleTableAPI = campaign.groupsCampaignGeneralTableAPI;
			    	campaign.visibleTableJQ = campaign.groupsCampaignGeneralTableJQ;
    			}else{
    	// 			clusterName = $("#clusterSelectFilter").multipleSelect('getSelects')[0];
    	// 			$(".groupsCampaignGeneralTableDiv").hide();
					// $(".clustersCampaignGeneralTableDiv").show();
					// loadClustersCampaignGeneralTable(clusterName)

    	// 			campaign.visibleTableAPI = campaign.clustersCampaignGeneralTableAPI;
			  //   	campaign.visibleTableJQ = campaign.clustersCampaignGeneralTableJQ;
    			}
		    	// $("#clearSelectedslotsButton").hide()
		    	// $("#addNewResourceButton").show()
				// $("#deleteSelectedresourcesButton").show();
    		}else{
    			// if groups is checked
    			if($("input[name='displayTypeRadio']")[0].checked){
			    	groupName = $("#groupSelectFilter").multipleSelect('getSelects')[0];
			    	$(".groupsCampaignPlannedTableDiv").show();
					$(".clustersCampaignPlannedTableDiv").hide();
					loadGroupsCampaignPlannedTable(groupName)

			    	campaign.visibleTableAPI = campaign.groupsCampaignPlannedTableAPI;
			    	campaign.visibleTableJQ = campaign.groupsCampaignPlannedTableJQ;


    			}else{
    				clusterName = $("#clusterSelectFilter").multipleSelect('getSelects')[0];
    				$(".groupsCampaignPlannedTableDiv").hide();
					$(".clustersCampaignPlannedTableDiv").show();
					loadClustersCampaignPlannedTable(clusterName)

    				campaign.visibleTableAPI = campaign.clustersCampaignPlannedTableAPI;
			    	campaign.visibleTableJQ = campaign.clustersCampaignPlannedTableJQ;
    			}

				// $("#deleteSelectedresourcesButton").hide()
		    	// $("#addNewResourceButton").hide()
				// $("#clearSelectedslotsButton").show()
    		}
    	}
    })

 //    $('#groupsCampaignGeneralTable tbody').on('click','td:nth-child(3)',function(evt){
	// 	openFieldEditorDialog(campaign.visibleTableAPI, campaign.visibleTableJQ, evt);
	// });

	$('#groupsCampaignPlannedTable tbody').on('click','td:nth-child(4)',function(evt){
		openFieldEditorDialog(campaign.visibleTableAPI, campaign.visibleTableJQ, evt);
	});

	$('#groupsCampaignPlannedTable tbody').on('click','td:nth-child(3)',function(evt){
		openFieldEditorDialog(campaign.visibleTableAPI, campaign.visibleTableJQ, evt);
	});

	$('#groupsCampaignPlannedTable tbody').on('click','td:nth-child(5)',function(evt){
		openFieldEditorDialog(campaign.visibleTableAPI, campaign.visibleTableJQ, evt);
	});

	$('#createCampaignButtonDiv button').on('click',function(evt){
		openCreateCampaignDialog(campaign.visibleTableAPI, campaign.visibleTableJQ, evt);
	});



	// $('#groupsCampaignGeneralTable tbody').on('click','td:nth-child(4)',function(evt){
	// 	openFieldEditorDialog(campaign.visibleTableAPI, campaign.visibleTableJQ, evt);
	// });


	// $('#clustersCampaignGeneralTable tbody').on('click','td:nth-child(4)',function(evt){
	// 	openFieldEditorDialog(campaign.visibleTableAPI, campaign.visibleTableJQ, evt);
	// });

	// $('#clustersCampaignPlannedTable tbody').on('click','td:nth-child(4)',function(evt){
	// 	openFieldEditorDialog(campaign.visibleTableAPI, campaign.visibleTableJQ, evt);
	// });

	// $('#clustersCampaignPlannedTable tbody').on('click','td:nth-child(5)',function(evt){
	// 	openFieldEditorDialog(campaign.visibleTableAPI, campaign.visibleTableJQ, evt);
	// });

	// $('#clustersCampaignGeneralTable tbody').on('click','td:nth-child(5)',function(evt){
	// 	openFieldEditorDialog(campaign.visibleTableAPI, campaign.visibleTableJQ, evt);
	// });

	$("#deleteSelectedresourcesButton").off('click').on('click',function(evt){
		if(confirm("Are you you want to delete selected entries permanently and update?")){
			$("#loadingDiv").show();
			page = campaign.visibleTableAPI.page.info().page;
			checkboxTD = campaign.visibleTableAPI.rows().nodes().toJQuery();
			deleteRowsIndexes = []
			$.each(checkboxTD, function(index, value){
				isChecked = $(value).find('td:nth-child(2) input').is(':checked')
				if(isChecked){
					rowNo = parseInt($(value).find('td:nth-child(1)').text()) - 1;
					deleteRowsIndexes.push(rowNo)
				}

			})
			$.each(deleteRowsIndexes, function(index,value){
				campaign.visibleTableJQ.fnDeleteRow(value-index, function(lg){
					// console.log(lg)
				});
			})
			commonData.updateSerialNo(campaign.visibleTableAPI);
			campaign.visibleTableAPI.page( page ).draw( 'page' );
			$("#saveResourcesButton").click();
		}
	});

	$("#clearSelectedslotsButton").off('click').on('click',function(evt){
		page = campaign.visibleTableAPI.page.info().page;
		checkboxTD = campaign.visibleTableAPI.rows().nodes().toJQuery();
		clearRowsIndexes = []
		$.each(checkboxTD, function(index, value){
			isChecked = $(value).find('td:nth-child(2) input').is(':checked')
			if(isChecked){
				rowNo = parseInt($(value).find('td:nth-child(1)').text()) - 1;
				clearRowsIndexes.push(rowNo)
			}

		})
		$.each(clearRowsIndexes, function(index,value){
			// campaign.visibleTableAPI.cell(value,3).data("")
			campaign.visibleTableAPI.cell(value,4).data("")

			$(campaign.visibleTableAPI.rows().nodes().toJQuery()[value]).fadeOut();
			$(campaign.visibleTableAPI.rows().nodes().toJQuery()[value]).fadeIn();
		})
		// commonData.updateSerialNo(campaign.visibleTableAPI);
		campaign.visibleTableAPI.page( page ).draw( 'page' );

		$.each(checkboxTD, function(index, value){
			$(value).find('td:nth-child(2) input').attr('checked',false)
		})
	});


	$("#groupsCampaignGeneralTable").off('keyup').on('keyup', function(event){
		if(event.keyCode == 32){
			trgt = $("#groupsCampaignGeneralTable tbody td.focus").closest('tr').find('.tableCheckbox input')
			trgt.click();
		}
	});

	// $("#clustersCampaignGeneralTable").off('keyup').on('keyup', function(event){
	// 	if(event.keyCode == 32){
	// 		trgt = $("#clustersCampaignGeneralTable tbody td.focus").closest('tr').find('.tableCheckbox input')
	// 		trgt.click();
	// 	}
	// });

	$("#groupsCampaignPlannedTable").off('keyup').on('keyup', function(event){
		if(event.keyCode == 32){
			trgt = $("#groupsCampaignPlannedTable tbody td.focus").closest('tr').find('.tableCheckbox input')
			trgt.click();
		}
	});

	// $("#clustersCampaignPlannedTable").off('keyup').on('keyup', function(event){
	// 	if(event.keyCode == 32){
	// 		trgt = $("#clustersCampaignPlannedTable tbody td.focus").closest('tr').find('.tableCheckbox input')
	// 		trgt.click();
	// 	}
	// });


	// this will clear the planned tab;le
	// $('table tbody').on('click','td:nth-child(6)',function(evt){
 //    	deleteOrEditGroup(campaign.visibleTableAPI, campaign.visibleTableJQ, evt);
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

	function getChannelsInfo(campName){
		var returnInfo = ""
		if(campName == 'campaign1'){
			returnInfo +=   `<div class="row" style="height: 100%;background: #fff;">
								<div class="col-xs-12" style="height: 100%;padding: 0;border: 2px solid #f26b1d;">
									<div class="contentHolder1 contentHolders" style="padding:1px">
										<div style="background:  purple;position:  absolute;border-radius: 5px;color: white;padding: 2px;">CH1</div>
									</div>
								</div>
							</div>`;
			returnInfo += 'My_Splitter';

			returnInfo +=   `<label style="font-weight: 100 !important;font-size: 15px !important;">Campaign1</label>
							<br>
							<label>CH1 : 100% X 100%</label>`
		}else if(campName == 'campaign2'){
			returnInfo +=   `<div class="row" style="height: 100%;background: #fff;">
								<div class="col-xs-7 col-xs-65-custom" style="height: 100%;padding: 0;border: 2px solid #f26b1d;">
									<div class="contentHolder1 contentHolders" style="padding:1px">
										<div style="background:  purple;position:  absolute;border-radius: 5px;color: white;padding: 2px;">CH1</div>
									</div>
								</div>
								<div class="col-xs-5 col-xs-35-custom" style="height: 100%;padding: 0;border: 2px solid #f26b1d;border-left: 0">
									<div class="contentHolder2 contentHolders" style="padding:1px">
										<div style="background:  green;position:  absolute;border-radius: 5px;color: white;padding: 2px;">CH2</div>
									</div>
								</div>
							</div>`
			returnInfo += 'My_Splitter';

			returnInfo +=   `<label style="font-weight: 100 !important;font-size: 15px !important;">Campaign2</label>
							<br>
							<label>CH1 : 100% X 65%</label><br>
							<label>CH2 : 100% X 35%</label>`
		}else if(campName == 'campaign3'){
			returnInfo += `<div class="row" style="height: 100%;background: #fff;">
							<div class="col-xs-7 col-xs-65-custom" style="height: 100%;padding: 0;border: 2px solid #f26b1d;">
								<div class="contentHolder1 contentHolders" style="padding:1px;">
									<div style="background:  green;position:  absolute;border-radius: 5px;color: white;padding: 2px;">CH1</div>
								</div>
							</div>
							<div class="col-xs-5 col-xs-35-custom" style="height: 100%;padding: 0;border: 2px solid #f26b1d;border-left: 0">
								<div class="row" style="height: 100%;background: #fff;">
									<div class="col-xs-12" style="height: 50%;padding: 0;border-bottom: 2px solid #f26b1d;border-left: 0">
										<div class="contentHolder2 contentHolders" style="padding:1px;">
											<div style="background:  purple;position:  absolute;border-radius: 5px;color: white;padding: 2px;">CH2</div>
										</div>
									</div>
									<div class="col-xs-12" style="height: 50%;padding: 0;border-left: 0">
										<div class="contentHolder3 contentHolders" style="padding:1px;">
											<div style="background:  blue;position:  absolute;border-radius: 5px;color: white;padding: 2px;">CH3</div>
										</div>
									</div>
								</div>
							</div>
						</div>`
			returnInfo += 'My_Splitter';

			returnInfo +=   `<label style="font-weight: 100 !important;font-size: 15px !important;">Campaign2</label>
							<br>
							<label>CH1 : 100% X 65%</label><br>
							<label>CH2 : 50% X 35%</label><br>
							<label>CH3 : 50% X 35%</label>`
		}

		return returnInfo;
	}


	function fillMasterDiv(campaignInfo){
		masterDiv = "";
		channelDiv = campaignInfo.split('My_Splitter')[0];
		channelDivInfo = "";
		if(typeof(campaignInfo.split('My_Splitter')[1]) != 'undefined') channelDivInfo = campaignInfo.split('My_Splitter')[1];
		masterDiv += `<div id="campaignContent">
								<div class="row" style="height:  100%;">
								        <div class="col-xs-4" style="height:100%;padding-left:0">
										` + channelDiv + `	
								        </div>
								        <div class="col-xs-8" style="height:100%;">
										` + channelDivInfo + `	
								        </div>
							    </div>
							</div>`
		return masterDiv;
	}

	function openFieldEditorDialog(visibleTableAPI, visibleTableJQ, evt){
		visibleTableAPI.keys.disable();
		trgtTd = $(evt.target);
		trgtTdValue = trgtTd.text();
		if(trgtTd[0].nodeName == "TD"){
			if((visibleTableJQ[0].id == "groupsCampaignPlannedTable" && trgtTd.index() == 2)){
				campaign.trgtTd = trgtTd
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
				$("#modifyFieldDialog .myDateTimePicker").datetimepicker({format: 'DD-MM-YYYY_hh:mm_A',stepping:2,minDate : new moment(),maxDate : new moment().add(7,'days').endOf('day')});
				$("#modifyFieldDialog .myDateTimePicker").data("DateTimePicker").date(new moment(trgtTdValue,"DD-MM-YYYY_hh:mm_A"));
				
				
				$("#" + visibleTableJQ[0].id).off('keyup').on('keyup', function(evt){
					// if(evt.keyCode == 13){
					// 	commonData.updateTableWithResource();
					// }else 
					if(evt.keyCode == 27){
						revertTableUpdate(campaign.visibleTableAPI, campaign.visibleTableJQ);
					}
				});

				$(".window-mask").off('click').on('click',function(){
					startTime = $("#startTime").data("DateTimePicker").date().format('DD-MM-YYYY_hh:mm_A');
					text = ''
					commonData.updateTableWithResource(campaign.visibleTableAPI, campaign.visibleTableJQ, startTime, '', 0);
				})
			}else if((visibleTableJQ[0].id == "groupsCampaignPlannedTable" && trgtTd.index() == 3)){
				campaign.trgtTd = trgtTd
				trgtTdValue = trgtTd.text();
				// createPicker();
				masterDiv = ""
				optionsList = ""
				$.each(campaign.camps,function(index,value){
					optionsList += '<option value="' + value + '">' + value +'</option>'
				})
				campaignSelect = `<select class='campaignSelect' 
								 	style="height:` + 33 + `px;
								 	width:` + 130 + `px">` + 
								 	optionsList + `</select>`
				masterDiv += campaignSelect;

				campaignInfo = getChannelsInfo(trgtTdValue)
				//content
				masterDiv += fillMasterDiv(campaignInfo);

				masterDiv += `<button id="saveCampaign" class="btn btn-success" style="right:25px;margin-top:20px;position:absolute;">Save</button>`;

				$('#addNewCampaignDialog').dialog({
				    title: 'Select Campaign',
				    // width: 400,
				    // height: 320,
				    closed: false,
				    cache: false,
				    constrain: true,
				    modal: true,
				    content : '<div id="contentMasterDiv">' + masterDiv + '</div>',
				    onClose : function(){
				    	campaign.visibleTableAPI.keys.enable();
				    }
				});




				
				$("select.campaignSelect").multipleSelect({
					single: true,
					filter: true,
					placeholder : 'Select Campaign',
					allSelected : false,
					// onClick: function(view) {
					// 	commonData.updateTableWithResource(campaign.visibleTableAPI, campaign.visibleTableJQ,'', view.value,0)
					// 	// console.log(view.value)
					// 	// console.log(view.checked)
		   //          },
					onClick : function(view){
						tabIndex = $("#campaignTabs").tabs('getTabIndex',$("#campaignTabs").tabs('getSelected'))
						campName = view.value;
						if(tabIndex == 0){
					    	campaignInfo_temp = getChannelsInfo(campName)
							//content
							masterDiv_temp = fillMasterDiv(campaignInfo_temp);

							$("#campaignContent").empty();
							$("#campaignContent").append(masterDiv_temp);
							
					    }else{
					    }
					    // getAllResources(groupName);
					}
				})

				$("select.campaignSelect").multipleSelect("setSelects", [trgtTdValue]);

				$(".ms-choice").focus();
				

				$(".ms-choice").off('keyup').on('keyup', function(evt){
					// if(evt.keyCode == 13){
					// 	commonData.updateTableWithResource();
					// }else 
					if(evt.keyCode == 27){
						revertTableUpdate(campaign.visibleTableAPI, campaign.visibleTableJQ);
					}
				});

				$("#saveCampaign").off('click').on('click',function(event){
					campName = $("select.campaignSelect").multipleSelect('getSelects')[0];
					commonData.updateTableWithResource(campaign.visibleTableAPI, campaign.visibleTableJQ, '', campName, 0);
				})



				$(".window-mask").off('click').on('click',function(){
					resource = $("select.resourceSelect").multipleSelect('getSelects').length!=0 ? $("select.resourceSelect").multipleSelect('getSelects') : [""] 
					commonData.updateTableWithResource(campaign.visibleTableAPI, campaign.visibleTableJQ, '', resource[0], 0);
					
				})
			}else if((visibleTableJQ[0].id == "groupsCampaignPlannedTable" && trgtTd.index() == 4)){
				campaign.trgtTd = trgtTd;
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
							commonData.updateTableWithResource(campaign.visibleTableAPI, campaign.visibleTableJQ,'','',duration);
						}else 
						if(evt.keyCode == 27){
							revertTableUpdate(campaign.visibleTableAPI, campaign.visibleTableJQ);
						}
					});

					$(".window-mask").off('click').on('click',function(){
						duration = $("#duration").val();
						commonData.updateTableWithResource(campaign.visibleTableAPI, campaign.visibleTableJQ,'','',duration);
					})

						$("input#duration").off('input propertychange').on('input propertychange', function (xx,yy,zz) {
					        $("#duration").val($(this).val().replace(/[A-Z a-z.~!@#$%^&*()\-_+=-?></.,":';/\|\{\}\[\]\\]/g, ''))
					    })
			}
		}
	}

	// function openCreateCampaignDialog(visibleTableAPI, visibleTableJQ, evt){

	// 	$('#createCampaignDialog').dialog({
	// 	    title: 'Create New Campaign',
	// 	    // width: 400,
	// 	    // height: 300,
	// 	    closed: false,
	// 	    cache: false,
	// 	    constrain: true,
	// 	    content : 	`<div class="gridsterr" style="">
	// 	    				<div class="gridsterItems">
	// 				            <ul style="padding : 0;">
	// 				                <li class="object-element" draggable="true" ondragstart="drag(event)">
	// 				                    <div class="row">
	// 				                        <div class="col-xs-3 object-element-icon"> 

	// 				                        </div>
	// 				                        <div class="col-xs-9 object-element-text"> 
	// 				                                Title
	// 				                        </div>
	// 				                    </div>
	// 				                </li>
	// 				                <li  class="object-element" draggable="true" ondragstart="drag(event)">
	// 				                    <div class="row">
	// 				                        <div class="col-xs-3 object-element-icon"> 

	// 				                        </div>
	// 				                        <div class="col-xs-9 object-element-text" > 
	// 				                                Image Viewer
	// 				                        </div>
	// 				                    </div>
	// 				                </li>
	// 				                <li  class="object-element" draggable="true" ondragstart="drag(event)">
	// 				                    <div class="row">
	// 				                        <div class="col-xs-3 object-element-icon"> 

	// 				                        </div>
	// 				                        <div class="col-xs-9 object-element-text"> 
	// 				                                Video Viewer
	// 				                        </div>
	// 				                    </div>
	// 				                </li>
	// 				                <li  class="object-element" draggable="true" ondragstart="drag(event)">
	// 				                    <div class="row">
	// 				                        <div class="col-xs-3 object-element-icon"> 

	// 				                        </div>
	// 				                        <div class="col-xs-9 object-element-text"> 
	// 				                                Ticker Viewer
	// 				                        </div>
	// 				                    </div>
	// 				                </li>
	// 				            </ul>
	// 				        </div>
	// 				        <div class="gridsterHolder">
	// 				            <div class="gridster" style="border : 1px solid black" ondrop="drop(event)" ondragover="allowDrop(event)">
	// 				                <ul>
					                   
	// 				                </ul>
	// 				            </div>
	// 			            </div>
	// 			        </div>`,
	// 	    modal: true,
	// 	    onClose : function(){
	// 	    	users.usersTableAPI.keys.enable();
	// 	    }
	// 	});

	//       gridster = $(".gridster ul").gridster({
	//           widget_margins: [4, 4],
	//           avoid_overlapped_widgets : true,
	//           // set_num_columns : "600px",
	//           widget_base_dimensions: [100, 100],
	//           resize : {
	//             enabled : true,
	//             axes : ['both'],
	//             handle_class: 'gs-resize-handle',
	//             max_size : [10, 6],
	//             max_cols : 10,
	//             max_rows : 6,
	//             max_size_x : 10,
	//             max_size_y : 6,
	//             // extra_cols : 2,
	//             start : function(e, ui, $widget){
	//               // console.log(e)
	//               // console.log(ui)
	//               // console.log($widget)
	//                 // console.log('start')
	//             },
	//             stop : function(e, ui, $widget){
	//             	console.log(e)
	//             	console.log(ui)
	//             	console.log($widget)
	//             	size_x = Number($widget.attr('data-sizex'));
	//             	size_y = Number($widget.attr('data-sizey'));
	//             	col = Number($widget.attr('data-col'));
	//             	row = Number($widget.attr('data-row'));

	//             	if((col + size_x) > 11){
	//             		// $widget.attr('data-sizex', (size_x - (size_x - (size_x - (size_x - 1 )))) + "")
	//             		// $widget.attr('data-sizex', (size_x - (size_x - (size_x - (size_x - 1 )))) + "")
	//             		x_pos = (size_x - (size_x - (size_x - (size_x - 1 )))) + "";
	//             		gridster.resize_widget($widget, x_pos, size_y, false, function(){})
	//             	}

	//             	if(Number($(".gridster ul").css('width').split("px")[0]) > 1044)
	//             		$(".gridster ul").css('width','1044px')

	//             },
	//             resize : function(e, ui, $widget){
	//                 // console.log('during')

	//             }
	//           },
	//           draggable : {
	//           	stop : function(event, ui){
	//           		console.log(event)
	//           		console.log(ui)
	//           	}
	//           },
	//           limit : {
	//             width : 2,
	//             height : 2
	//           }

	//       }).data('gridster');
	//       // gridster.container_width = 100;
	//       // gridster.set_num_columns("800px")

	//     // var gridster = $(".gridster ul").gridster().data('gridster');
	// }

	$("input").on('input propertychange','#duration', function (xx,yy,zz) {
        $("#duration").val($(this).val().replace(/[A-Z a-z.~!@#$%^&*()\-_+=-?></.,":';/\|\{\}\[\]\\]/g, ''))
    })

	commonData.updateTableWithResource = function(visibleTableAPI, visibleTableJQ, startTime, campName, duration){
		rowNo = parseInt(campaign.trgtTd.closest('tr').find('td').first().text()) -1
		// resources.resourcesTableJQ.fnUpdate({campName : campName, resourceType : 'image'},rowNo);
		
			console.log(campName)
		duration = parseInt(duration)
		if(isNaN(duration)) duration = 5;

		page = visibleTableAPI.page.info().page;
		if(visibleTableJQ[0].id == "groupsCampaignGeneralTable"){
			if(campName != ""){
				visibleTableAPI.cell(rowNo,2).data(campName)
				// visibleTableAPI.cell(rowNo,4).data(duration)
			}
			if(duration != 0)
				visibleTableAPI.cell(rowNo,3).data(duration)
		}else if(visibleTableJQ[0].id == "groupsCampaignPlannedTable"){
			if(campName != ""){
				visibleTableAPI.cell(rowNo,3).data(campName)
				// visibleTableAPI.cell(rowNo,4).data(duration)
			}
			if(startTime != ""){
				visibleTableAPI.cell(rowNo,2).data(startTime)

			}
			if(duration != ""){
				visibleTableAPI.cell(rowNo,4).data(duration)

			}
			// visibleTableAPI.cell(rowNo,4).data(resourceType)
		}
		// else if(visibleTableJQ[0].id == "clustersCampaignGeneralTable"){
		// 	if(campName != ""){
		// 		visibleTableAPI.cell(rowNo,3).data(campName)
		// 		// visibleTableAPI.cell(rowNo,3).data(resourceType)
		// 	}
		// 	if(duration != 0)
		// 		visibleTableAPI.cell(rowNo,4).data(duration)
		// }else if(visibleTableJQ[0].id == "clustersCampaignPlannedTable"){
		// 	if(campName != ""){
		// 		visibleTableAPI.cell(rowNo,4).data(campName)
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

		if($("#addNewCampaignDialog").is(":visible"))
			$("#addNewCampaignDialog").dialog('close')
		$(visibleTableAPI.rows().nodes().toJQuery()[rowNo]).fadeOut();
		$(visibleTableAPI.rows().nodes().toJQuery()[rowNo]).fadeIn();
		visibleTableAPI.keys.enable();
	}

	function revertTableUpdate(visibleTableAPI, visibleTableJQ){
		$("#modifyFieldDialog").dialog('close')
		visibleTableAPI.keys.enable()
	}

	$("#addNewResourceButton").off('click').on('click',function(evt){
		recordsTotal = campaign.visibleTableAPI.page.info().recordsTotal;

		// if(!campaign.resources || campaign.resources.length == 0){
		// 	$.notify('No resource available.','error')
		// }else{
			// var resourceType = 'image'
			// if(campaign.resources[0].split('.')[1].toUpperCase() == "JPG" || campaign.resources[0].split('.')[1].toUpperCase() == "JPEG"){
			// 	resourceType = 'image'
			// }else if(campaign.resources[0].split('.')[1].toUpperCase() == "MP4" || campaign.resources[0].split('.')[1].toUpperCase() == "WEBM"){
			// 	resourceType = 'video'
			// }
			dt = {};
			if(campaign.visibleTableJQ.attr('id') == 'groupsCampaignGeneralTable'){
				// groupOrClusterKey = "groupName";
		    	// groupOrCluster = $("#groupSelectFilter").multipleSelect('getSelects')[0];
		    	dt = {sno :  recordsTotal + 1,campName : "",  duration : 2};
			}
			// if(campaign.visibleTableJQ.attr('id') == 'clustersCampaignGeneralTable'){
			// 	groupOrClusterKey = "clusterName";
			// 	groupOrCluster = $("#clusterSelectFilter").multipleSelect('getSelects')[0];
			// 	dt = {sno :  recordsTotal + 1,resName : "",  duration : 5};
			// }

			if(campaign.visibleTableJQ.attr('id') == 'groupsCampaignPlannedTable'){
				// groupOrClusterKey = "groupName";
				// groupOrCluster = $("#groupSelectFilter").multipleSelect('getSelects')[0];
				remainder = new moment(new Date()).minutes()%5
				startTime = new moment(new Date()).subtract(remainder,'minutes').add('minutes',5).format('DD-MM-YYYY_hh:mm_A')
				// startTime.add('minutes',20);
				dt = {sno :  recordsTotal + 1,campName : "",  time : startTime,duration : 2};
			}
			// if(campaign.visibleTableJQ.attr('id') == 'clustersCampaignPlannedTable'){
			// 	groupOrClusterKey = "clusterName";
			// 	groupOrCluster = $("#clusterSelectFilter").multipleSelect('getSelects')[0];
			// 	remainder = new moment(new Date()).minutes()%20
			// 	startTime = new moment(new Date()).subtract(remainder,'minutes').format('DD-MM-YYYY HH:mm')
			// 	dt = {sno :  recordsTotal + 1,resName : "",  time : startTime};
			// }


			// dt = {sno :  recordsTotal + 1,resourceName : campaign.resources[0], resourceType : resourceType, duration : 15, clientName : clientName, updatedBy : "",updatedAt : ""};
			
			// dt[groupOrClusterKey] = groupOrCluster;

			campaign.visibleTableJQ.fnAddData(dt);
			campaign.visibleTableAPI.page( 'last' ).draw( 'page' );

			$(campaign.visibleTableAPI.rows().nodes().toJQuery()[recordsTotal]).fadeOut();
			$(campaign.visibleTableAPI.rows().nodes().toJQuery()[recordsTotal]).fadeIn();
		// }
	})


	$("#saveResourcesButton").off('click').on('click',function(evt){
		$("#loadingDiv").show();
		campaignDataArray = campaign.visibleTableJQ.fnGetData();
		// postData = {}
		// groupOrClusterNameFromTable = campaignDataArray[0].groupName;
		// if(typeof(groupOrClusterNameFromTable) == 'undefined'){
		// 	groupOrClusterNameFromTable = campaignDataArray[0].clusterName;
		// 	// postData.clusterName = groupOrClusterNameFromTable;
		// }else{
		// 	// postData.groupName = groupOrClusterNameFromTable;
		// }
		
		campaignDataArray = _.filter(campaignDataArray,function(value){
			return value.campName != ""
		})
		if(campaign.visibleTableJQ.attr('id') == 'groupsCampaignGeneralTable'){
			groupName = $("#groupSelectFilter").multipleSelect('getSelects')[0];
			url = commonData.apiurl + 'shared/campaign' + "/" + "NO" + "/" + groupName
		}
		// if(campaign.visibleTableJQ.attr('id') == 'clustersCampaignGeneralTable'){
		// 	clusterName = $("#clusterSelectFilter").multipleSelect('getSelects')[0];
		// 	url = commonData.apiurl + 'ch1_genDev' + "/" + clientName + "/" + clusterName
		// }

		if(campaign.visibleTableJQ.attr('id') == 'groupsCampaignPlannedTable'){
			groupName = $("#groupSelectFilter").multipleSelect('getSelects')[0];
			url = commonData.apiurl + 'planned/campaign' + "/" + "NO" + "/" + groupName
		}
		// if(campaign.visibleTableJQ.attr('id') == 'clustersCampaignPlannedTable'){
		// 	clusterName = $("#clusterSelectFilter").multipleSelect('getSelects')[0];
		// 	url = commonData.apiurl + 'ch1_planDev' + "/" + clientName + "/" + clusterName
		// }


    	campaignDataArray = _.map(campaignDataArray, function(model) {
			return _.omit(model, 'sno');
		});
		// postData.data = campaignDataArray;

		$.ajax({
			  type: "POST",
			  async : false,
			  url: url,
			  data: JSON.stringify(campaignDataArray),
			  success: function(data){
			  	$.notify('Success','success')
			  	campaign.visibleTableAPI.ajax.reload();
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
					// $('#addNewResourceDialog').dialog('close');
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


function openCreateCampaignDialog(visibleTableAPI, visibleTableJQ, evt){

		$('#createCampaignDialog').dialog({
		    title: 'Create New Campaign',
		    // width: 400,
		    // height: 300,
		    closed: false,
		    cache: false,
		    constrain: true,
		    content : 	`<div class="gridsterr" style="">
		    				<div class="gridsterItems">
					            <ul style="padding : 0;">
					                <li class="object-element" draggable="true" ondragstart="drag(event)">
					                    <div class="row">
					                        <div class="col-xs-3 object-element-icon"> 
					                        +
					                        </div>
					                        <div class="col-xs-9 object-element-text"> 
					                                Title
					                        </div>
					                    </div>
					                </li>
					                <li  class="object-element" draggable="true" ondragstart="drag(event)">
					                    <div class="row">
					                        <div class="col-xs-3 object-element-icon"> 

					                        </div>
					                        <div class="col-xs-9 object-element-text" > 
					                                Image Viewer
					                        </div>
					                    </div>
					                </li>
					                <li  class="object-element" draggable="true" ondragstart="drag(event)">
					                    <div class="row">
					                        <div class="col-xs-3 object-element-icon"> 

					                        </div>
					                        <div class="col-xs-9 object-element-text"> 
					                                Video Viewer
					                        </div>
					                    </div>
					                </li>
					                <li  class="object-element" draggable="true" ondragstart="drag(event)">
					                    <div class="row">
					                        <div class="col-xs-3 object-element-icon"> 

					                        </div>
					                        <div class="col-xs-9 object-element-text"> 
					                                Ticker Viewer
					                        </div>
					                    </div>
					                </li>
					            </ul>
					        </div>
					        <div class="gridsterHolder" style="width:644px;height:364px">
					            <div class="gridster" style="border : 1px solid black;height: 100%;" ondrop="drop(event)" ondragover="allowDrop(event)">
					                
					            </div>
				            </div>
				            <div style="width:38%;padding-left:5%;">
								<label>Positioning</label>
								<table class="position_table">
							        <tbody>
							            <tr>
								            <td>Width</td>
								            <td><input type="number" id="elem_width" min="0"></td>
							            </tr>
							            <tr>
								            <td>Height</td>
								            <td><input type="number" id="elem_height" min="0"></td>
							            </tr>
							            <tr>
								            <td>Top</td>
								            <td><input type="number" id="elem_top_pos" min="0"></td>
							            </tr>
							            <tr>
								            <td>Left</td>
								            <td><input type="number" id="elem_left_pos" min="0"></td>
							            </tr>
							            <tr>
											<td><button class="btn btn-danger deleteCampignItem">Delete</button></td>
							            </tr>
							        </tbody>
							    </table>
				            </div>
				        </div>`,
		    modal: true,
		    onClose : function(){
		    	users.usersTableAPI.keys.enable();
		    }
		});
			var resizing_target;
	      $(".gridsterHolder").off('click').on('click', '.gridster', function(event){
	      		$(event.target).closest('div.campaignItem').addClass("selected");
	      		resizing_target = $(event.target);
	      	
	      })


	      $(".gridsterItems ul li").off('click').on('click', function(evt){
	      	$(".gridster").append(`<div class="campaignItem">
	      		</div>`);
		      	new ResizeSensor(jQuery('.campaignItem'), function(){
		      		// resizing_target
		      		var trgt_element = $("div.selected")
			      	var elem_width = trgt_element.width();
			      	var elem_height = trgt_element.height()
			      	var elem_left_pos = trgt_element.position().left
			      	var elem_top_pos = trgt_element.position().top
			      	if(elem_width + elem_left_pos >= 640) $('div.selected').width(elem_width - (elem_width - (640 - elem_left_pos)));
		      		if(elem_height + elem_top_pos >= 360) $('div.selected').height(elem_height - (elem_height - (360 - elem_top_pos)));
			      	$("#elem_width").val(elem_width)
			      	$("#elem_height").val(elem_height)
			      	$("#elem_left_pos").val(elem_left_pos)
			      	$("#elem_top_pos").val(elem_top_pos)
				    
				});
	      })

	      $(".gridster").off('click').on('click', 'div', function(evt){
	      	$(".gridster div").removeClass('selected');
	      	$(evt.target).addClass('selected')
	      	 // + 2*(parseInt(($(evt.target).css('border-width'))))
	      	var elem_width = $(evt.target).width();
	      	var elem_height = $(evt.target).height()
	      	var elem_left_pos = $(evt.target).position().left
	      	var elem_top_pos = $(evt.target).position().top

	      	// console.log(elem_width)
	      	// console.log(elem_height)
	      	// console.log(elem_left_pos)
	      	// console.log(elem_top_pos)

	      	$("#elem_width").val(elem_width)
	      	$("#elem_height").val(elem_height)
	      	$("#elem_left_pos").val(elem_left_pos)
	      	$("#elem_top_pos").val(elem_top_pos)


	      });

	      	$("#elem_width").bind('input propertychange', function(evt){
			  	var elem_width = $(".selected").width();
		      	var elem_height = $(".selected").height()
		      	var elem_left_pos = parseInt($(".selected").css('left'))
		      	var elem_top_pos = parseInt($(".selected").css('top'))

			  	if((parseInt($(evt.target).val()) + parseInt($("#elem_left_pos").val())) <= 640)
			  		$('.selected').width(parseInt($(evt.target).val()))
			  	else 
			  		$(evt.target).val(oldval);

			  	oldval = parseInt($(evt.target).val());


			});

			$("#elem_height").bind('input propertychange', function(evt){
				var elem_width = $(".selected").width();
		      	var elem_height = $(".selected").height()
		      	var elem_left_pos = parseInt($(".selected").css('left'))
		      	var elem_top_pos = parseInt($(".selected").css('top'))
		      	console.log($(evt.target).val())
		      	console.log(parseInt($("#elem_top_pos").val()));
		      	if((parseInt($(evt.target).val()) + parseInt($("#elem_top_pos").val())) <= 360)
			  		$('.selected').height(parseInt($(evt.target).val()))
			  	else 
			  		$(evt.target).val(oldval);

			  	oldval = parseInt($(evt.target).val());
			});

			$("#elem_top_pos").bind('input propertychange', function(evt){

				var elem_width = $(".selected").width();
		      	var elem_height = $(".selected").height()
		      	var elem_left_pos = parseInt($(".selected").css('left'))
		      	var elem_top_pos = parseInt($(".selected").css('top'))

		      	if((parseInt($(evt.target).val()) + parseInt($("#elem_height").val())) <= 360)
				  	$('.selected').css('top',parseInt($(evt.target).val()))
				else 
			  		$(evt.target).val(oldval);

			  	oldval = parseInt($(evt.target).val());  
			});

			$("#elem_left_pos").bind('input propertychange', function(evt){

				var elem_width = $(".selected").width();
		      	var elem_height = $(".selected").height()
		      	var elem_left_pos = parseInt($(".selected").css('left'))
		      	var elem_top_pos = parseInt($(".selected").css('top'))

		      	if((parseInt($(evt.target).val()) + parseInt($("#elem_width").val())) <= 640)
				  	$('.selected').css('left',parseInt($(evt.target).val()))
				else 
			  		$(evt.target).val(oldval);

			  	oldval = parseInt($(evt.target).val());
			});

			$(".deleteCampignItem").off('click').on('click',function(evt){
				$('.selected').remove();
			})

			
	}



function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    draggingEvent = ev;
    ev.dataTransfer.text =  ev.target.innerText;
    // console.log(ev)
}

function drop(ev) {
    ev.preventDefault();
    var data = draggingEvent.dataTransfer.text;
    clonedNode = draggingEvent.target.cloneNode(true);
    // console.log(clonedNode)
    $(clonedNode).removeAttr('draggable');
    $(clonedNode).removeAttr('ondragstart');
    $(clonedNode).removeAttr('style');
    $(clonedNode).addClass('gs-w');
    // $(clonedNode).append('<span class="gs-resize-handle gs-resize-handle-both"></span>');
    if(data == 'Title')
        gridster.add_widget('<li class="new">Title</li>', 2, 1);
    if(data == 'Image Viewer')
        gridster.add_widget('<li class="new">Image Viewer</li>', 2, 1);
    if(data == 'Video Viewer')
        gridster.add_widget('<li class="new">Video Viewer</li>', 2, 1);
    if(data == 'Ticker Viewer')
        gridster.add_widget('<li class="new">Ticker Viewer</li>', 2, 1);

    if($(".gridster ul li").last().length != 0)
    	$($(".gridster ul li").last()[0]).append(`<span class="gs-close-handle gs-close-handle-both" onclick="deleteObjectElement(event)">
														<svg viewbox="0 0 40 40">
															<path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
														</svg>
													</span>`);
    // console.log(ev)
    // console.log(ev.target)
}

function deleteObjectElement(event){
	
	gridster.remove_widget($(event.target).closest('li'));
}
