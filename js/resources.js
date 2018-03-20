resources = {}
resources.itemsArray = [];//["img1.jpg","img2.jpg","vid1.mp4","vid2.mp4","vid3.mp4","vid4.mp4","img3.jpg","img4.jpg"];

function getAllGroups(){
	// if(commonData.userType != 'Society'){
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
					$(".resourcesSection #groupSelectFilter").empty();
					$(".resourcesSection #groupSelectFilter").append(options);
					$(".resourcesSection #groupSelectFilter").attr("disabled",true);
					
					$(".resourcesSection #groupSelectFilter").multipleSelect({
						placeholder: "Select Group",
						filter: true,
						single : true,
						allSelected : false,
						onClick : function(view){
							tabIndex = $(".resourcesSection #resourcesTabs").tabs('getTabIndex',$(".resourcesSection #resourcesTabs").tabs('getSelected'))
							groupName = view.value;
							if(tabIndex == 0){
								// loadSocietyContent(groupName);
								loadAdvtContent(groupName);
						    }
						}
					});


					// loadSocietyContent($(".resourcesSection #groupSelectFilter").multipleSelect('getSelects')[0]);
					loadAdvtContent($(".resourcesSection #groupSelectFilter").multipleSelect('getSelects')[0]);

				}else if(textstatus == "error"){
					if(jqXHR.responseText)
						$.notify(jqXHR.responseText,'error')
				}
				console.log(jqXHR);
			}
		})
	// }else{
	// 	var options = ""
	// 	options += `<option value="`+clientName+`">`+clientName+`</option>`
	// 	$(".resourcesSection #groupSelectFilter").empty();
	// 	$(".resourcesSection #groupSelectFilter").append(options);
	// 	$(".resourcesSection #groupSelectFilter").attr('disabled',true);
		
	// 	$(".resourcesSection #groupSelectFilter").multipleSelect({
	// 		placeholder: "Select Group",
	// 		filter: true,
	// 		single : true,
	// 		allSelected : false,
	// 		onClick : function(view){
	// 			tabIndex = $(".resourcesSection #resourcesTabs").tabs('getTabIndex',$(".resourcesSection #resourcesTabs").tabs('getSelected'))
	// 			groupName = view.value;
	// 			if(tabIndex == 0){
	// 				loadSocietyContent(groupName);
	// 		    }
	// 		}
	// 	});
	// 	loadSocietyContent($(".resourcesSection #groupSelectFilter").multipleSelect('getSelects')[0]);
	// }
}



//upload to google drive
var alws = function(thisButton){
	tabIndex = $(".resourcesSection #resourcesTabs").tabs('getSelected').panel('options').index
	postData = {};
	thisButton = thisButton;
	postData.resName = $(thisButton).closest('tr').find('td:nth-child(2)').text().trim();
	groupName = ""
	if(tabIndex == 0){
		// postData.resDir = 'society'
		groupName = $(".resourcesSection #groupSelectFilter").multipleSelect('getSelects')[0];
	}else{
		// postData.resDir = 'advt'
		groupName = 'advt';
	}


	$.ajax({
		type: "POST",
	  	async : false,
	  	url: commonData.apiurl + 'updateGD/' + groupName,
	  	data: JSON.stringify(postData),
	  	complete : function(jqXHR, textstatus){
			if(textstatus == "success"){
				refreshTable(thisButton);
			}else if(textstatus == "error"){
				if(jqXHR.responseText)
					$.notify(jqXHR.responseText,'error')
			}
			console.log(jqXHR);
		},
	  	dataType: 'json',
	  	contentType: "application/json",
	})
}


function refreshTable(thisButton){
	$(thisButton).closest('tr').find('td:nth-child(4)').html('<span class="text-success">Uploaded</span>');
	setTimeout(function(){
		$(thisButton).closest('tr').find('td:nth-child(6) button').click();
	},1000)
}
function loadResource(){
// window.onload = function(){
	
	configureView(sessionStorage.userType);
	getAllGroups();

	
$(".resourcesSection .resourcesSocietyTableDiv").off('click').on('click','a.galleryLink',function(evt){
	dataArray = [];
	$.each($(".resourcesSection #resourcesSocietyTable a.galleryLink"), function(index, key){
		if(/\.(mp4)$/i.test(key.title)){
			type = 'video/mp4'
		}else{
			type = 'image'
		}
		dataArray.push({title : key.title, href : key.href, type : type, thumbnail : key.href})
	})

	tbody = $(evt.target).closest('tbody');
	tr = $(evt.target).closest('tr');
	rowIndex = tbody.children().index(tr[0])
	dataArray = _.union(_.rest(dataArray,rowIndex),_.difference(dataArray,_.rest(dataArray,rowIndex)))

	blueimp.Gallery(dataArray,{
    container : '#blueimp-gallery-society'});

	return false;
})

$(".resourcesSection .resourcesAdvtTableDiv").off('click').on('click','a.galleryLink',function(evt){
	dataArray = [];
	

	$.each($(".resourcesSection #resourcesAdvtTable a.galleryLink"), function(index,key){
		if(/\.(mp4)$/i.test(key.title)){
			type = 'video/mp4'
		}else{
			type = 'image'
		}
		dataArray.push({title : key.title, href : key.href, type : type, thumbnail : key.href})
	})

	tbody = $(evt.target).closest('tbody');
	tr = $(evt.target).closest('tr');
	rowIndex = tbody.children().index(tr[0])
	dataArray = _.union(_.rest(dataArray,rowIndex),_.difference(dataArray,_.rest(dataArray,rowIndex)))

	blueimp.Gallery(dataArray,{
    container : '#blueimp-gallery-advt'});

	return false;
})
	$('[data-toggle="tooltip"]').tooltip();
}