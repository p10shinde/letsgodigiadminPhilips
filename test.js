window.onload = function(){

option = {
	auth: {
	    responseType: 'token code id_token refresh_token',
	    params: {
	      scope: 'openid profile'
	    }
  	},
  	autoclose: true,
	closable: false,
	rememberLastLogin: true
}

let lock = new Auth0Lock('wSypUeUH688aidIp6jImqKl1o4lrxeP0', 'testing-app123.auth0.com',option)

	let profile = JSON.parse(localStorage.getItem('profile'));
    let isAuthenticated = localStorage.getItem('isAuthenticated');

    function updateValues(userProfile, authStatus) {
        profile = userProfile;
        isAuthenticated = authStatus;
    }

    isAuthenticated == null ? isAuthenticated = false : isAuthenticated;
    if(isAuthenticated != null && !isAuthenticated){
        
        // lock.show();//show Lock widget
    }
	document.getElementById('btn-login').addEventListener('click', function() {
	  lock.show();
	});

	lock.on("authenticated", function(authResult) {
	  // Use the token in authResult to getUserInfo() and save it to localStorage
	  lock.getUserInfo(authResult.accessToken, function(error, profile) {
	    if (error) {
	      // Handle error
	      console.log(error)
	      return;
	    }

        localStorage.setItem('accessToken', authResult.accessToken);
	    localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('isAuthenticated', true);
        updateValues(profile, true);
        document.getElementById("btn-login").disabled = true

        $.ajax({
            url : "http://localhost:3010/api/private-scoped",
            headers : {'authorization' : 'Bearer ' + localStorage.id_token},
            complete : function(jqXHR, textStatus, statusCode){
                if(textStatus == "success"){
                    //move next
                }else{
                    console.log("Errror")
                    console.log(jqXHR.responseText);
                }
            },
        })

	  });
	});


	$("#logout").click((e) => {
        e.preventDefault();
        logout();
    });

    function logout(){
        localStorage.clear();
        isAuthenticated = false;
        lock.logout({ 
            returnTo: "http://localhost:6051/index2.html" 
        });
    }
}