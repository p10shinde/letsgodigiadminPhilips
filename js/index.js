// if(!sessionStorage.apiurl || !sessionStorage.userName || !sessionStorage.clientLocation || !sessionStorage.userName || !sessionStorage.id_token || !sessionStorage.clientName){
// 	window.location.href = 'login.html'
// }else{
	// window.onload = function(){
	function loadIndexJS(){
		configureView(sessionStorage.userType);
		$("#userImage")[0].src = sessionStorage.image

		$("#userStatusButton").html(sessionStorage.userName + ' <span class="caret"></span>')
		$("#clientName").text(sessionStorage.clientLocation);
		$("#channelMenu li").first().click()
		$("#channelMenu li").off('click').on('click',function(evt){
			if($(this).hasClass('disabled'))
				return;
			$(this).parent().find('li').removeClass('active')
			$(this).toggleClass('active')


			$("#mainlayout").layout('panel','center').panel('setTitle',this.innerText)

			layoutName = this.innerText.toLowerCase();
			if(this.innerText.toLowerCase() == "first channel") layoutName = "firstChannel"
			if(this.innerText.toLowerCase() == "second channel") layoutName = "secondChannel"
			if(this.innerText.toLowerCase() == "third channel") layoutName = "thirdChannel"
			// $("#layoutContainerIframe").attr('src',layoutName + '.html');
			$(".channelSections").hide();
			$("." + layoutName + "Section").show();
			loadRelativeChannel(layoutName)


		});

		function loadRelativeChannel(channelName){
			if(layoutName == "firstChannel") loadFirstChannel();
			if(layoutName == "secondChannel") loadSecondChannel();
			if(layoutName == "thirdChannel") loadThirdChannel();
			if(layoutName == "sos") loadSOS();
			if(layoutName == "campaign") loadCampaign();
			if(layoutName == "logs") loadLog();
			if(layoutName == "tickers") loadTicker();
			if(layoutName == "groups") loadGroup();
		}


		$("#logoutButton").off('click').on('click', function(evt){
			sessionStorage.removeItem('googleId');
			sessionStorage.removeItem('image');
			sessionStorage.removeItem('id_token');
			sessionStorage.removeItem('userName');
			sessionStorage.removeItem('userId');
			sessionStorage.removeItem('userType');
			sessionStorage.removeItem('clientLocation');
			sessionStorage.removeItem('clientName');
			
			sessionStorage.removeItem('apiurl');
			window.location.reload();
		})
		$("#channelMenu li:contains('First Channel')").click()
	}
// }
