// if(!sessionStorage.apiurl || !sessionStorage.userName || !sessionStorage.clientLocation || !sessionStorage.userName || !sessionStorage.id_token || !sessionStorage.clientName){
// 	window.location.href = 'login.html'
// }else{
var AUTH0_CLIENT_ID='dTmJ7GDsHrUwsXNtN0CeMVS0lK6SVmsQ';
var AUTH0_DOMAIN='testing-app123.auth0.com';
var AUTH0_CALLBACK_URL=location.href;
sessionStorage.apiurl = 'http://63.142.250.105:6050/api/';

	
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
			if(layoutName == "clusters") loadCluster();
			if(layoutName == "users") loadUser();
			if(layoutName == "resources") loadResource();
			$(".main_containerr").resize()
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

			localStorage.removeItem('access_token');
		    localStorage.removeItem('id_token2');
		    localStorage.removeItem('expires_at');
			
			sessionStorage.removeItem('apiurl');
			window.location.reload();
		})
		$("#channelMenu li:contains('First Channel')").click()
	}
window.onload = function(){
	var content = document.querySelector('.content');
	  // var loadingSpinner = document.getElementById('loadingSpinnerr');
	  content.style.display = 'block';
	  // loadingSpinner.style.display = 'none';

	  var webAuth = new auth0.WebAuth({
	    domain: AUTH0_DOMAIN,
	    clientID: AUTH0_CLIENT_ID,
	    redirectUri: AUTH0_CALLBACK_URL,
	    audience: 'https://' + AUTH0_DOMAIN + '/userinfo',
	    responseType: 'token id_token',
	    scope: 'openid',
	    leeway: 60
	  });

	  var loginStatus = document.querySelector('.container h4');
	  var loginView = document.getElementById('login-view');

	  // buttons and event listeners
	  var loginBtn = document.getElementById('qsLoginBtn');

	 

	  loginBtn.addEventListener('click', function(e) {
	    e.preventDefault();
	    webAuth.authorize();
	  });


	  function setSession(authResult) {
	    // Set the time that the access token will expire at
	    var expiresAt = JSON.stringify(
	      authResult.expiresIn * 1000 + new Date().getTime()
	    );
	    localStorage.setItem('access_token', authResult.accessToken);
	    localStorage.setItem('id_token2', authResult.idToken);
	    localStorage.setItem('expires_at', expiresAt);
	  }

	  

	  function isAuthenticated() {
	    // Check whether the current time is past the
	    // access token's expiry time
	    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
	    return new Date().getTime() < expiresAt;
	  }

	  function handleAuthentication() {
	    webAuth.parseHash(function(err, authResult) {
	      if (authResult && authResult.accessToken && authResult.idToken) {
	        window.location.hash = '';
	        setSession(authResult);
	        loginBtn.style.display = 'none';


	      } else if (err) {
	        console.log(err);
	        alert(
	          'Error: ' + err.error + '. Check the console for further details.'
	        );
	      }
	      displayButtons();
	    });
	  }

	  function displayButtons() {
	    if (isAuthenticated()) {
	    	$.ajax({
	    		url : "http://localhost:3010/api/private-scoped",
	    		headers : {'authorization' : 'Bearer ' + localStorage.id_token2,"cache-control": "no-cache"},
	    		complete : function(jqXHR, status){
	    			console.log(status);
	    		},
	    	})
	      // loginBtn.style.display = 'none';

	      // // sessionStorage.googleId = profile.getId();
	      // sessionStorage.image = "https://lh3.googleusercontent.com/-EL1IRFxPixk/AAAAAAAAAAI/AAAAAAAAGfY/gwLT07Mqx9o/s96-c/photo.jpg";
	      //   sessionStorage.id_token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2ZjBlZTE2YmU3MGM0ODhkZDM5ZGI3MGY2ZjRkMTM3YTA0ODkxZTMifQ.eyJhenAiOiI4NDg2MjY5MzM3NzUtMWV2MDR0bHRwdHVoOGEzMzJ1bnQzYXFob2hhcWg4MzkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4NDg2MjY5MzM3NzUtMWV2MDR0bHRwdHVoOGEzMzJ1bnQzYXFob2hhcWg4MzkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ0MTI1NjY3MTc0NTk4OTU0NTEiLCJlbWFpbCI6InAxMHNoaW5kZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImFXd3VKbUZmOXNVUkN0R2xTakNWUEEiLCJleHAiOjE1MjE2MDE0MTQsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJqdGkiOiJmMTg1NzM4MjBmZTdmMjk2Mjc1NmRjMWJiNDZjYTZkNTU5YWQ5NTdkIiwiaWF0IjoxNTIxNTk3ODE0LCJuYW1lIjoiUGFua2FqIFNoaW5kZSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLUVMMUlSRnhQaXhrL0FBQUFBQUFBQUFJL0FBQUFBQUFBR2ZZL2d3TFQwN01xeDlvL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJQYW5rYWoiLCJmYW1pbHlfbmFtZSI6IlNoaW5kZSIsImxvY2FsZSI6ImVuLUdCIn0.dPi2gxIj_X3AWarjdY2j5RvUr9MRSy73CYXwsDWF8J504FIS2w6qC4DPjnSC-YE2bJ6Q_y0LHwmnfebtLJAMfB1n3fnoyssG1PZyBGqgUrw4pFEEFkAbbdrAYxF-v-J1-ozUZboMZdZeYKDArmbemKePwQlkuMZuDA288JXRDN7g_38npnl3tBAfi5r9kKSYL0k1rqrUuDwhuHjbwCmmsjpW9-1SPourLmRRTBglFWjSSi0CZzRTL1cMAhgV13J0WO24NVabQukx8-wVbTGkohZd3SC2HBi6L0xaL3CyqMRNXNErAkpSCb1v1yHSRF6UDO0RisdFXTXAg4Us1NRbkQ";
	      //   // sessionStorage.userId = result.userID; //email
	      //   sessionStorage.userId = "p10shinde@gmail.com"; //email
	      //   // sessionStorage.userName = result.userName;
	      //   sessionStorage.userName = "Pankaj Shinde";
	      //   // sessionStorage.userType = result.userType;
	      //   sessionStorage.userType = "SuperAdmin";
	      //   // sessionStorage.clientLocation = result.clientLocation;
	      //   sessionStorage.clientLocation = "Noida";
	      //   // sessionStorage.clientName = result.clientName;
	      //   sessionStorage.clientName = "LGD";

	      // $(".main_containerr").show();
	      // $(".main_containerr").resize();
	      // loadIndexJS();
	    } else {
	      loginBtn.style.display = 'inline-block';
	      loginView.style.display = 'inline-block'

	      // loginStatus.innerHTML =
	      //   'You are not logged in! Please log in to continue.';
	    }
	  }

	  handleAuthentication();
}
