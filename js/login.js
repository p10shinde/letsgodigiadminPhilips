var AUTH0_CLIENT_ID='wSypUeUH688aidIp6jImqKl1o4lrxeP0';
var AUTH0_DOMAIN='testing-app123.auth0.com';
var AUTH0_CALLBACK_URL=location.href;
sessionStorage.apiurl = 'http://63.142.250.105:6050/api/';

window.addEventListener('load', function() {
  var content = document.querySelector('.content');
  var loadingSpinner = document.getElementById('loadingSpinner');
  content.style.display = 'block';
  loadingSpinner.style.display = 'none';

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
      loginBtn.style.display = 'none';

      // sessionStorage.googleId = profile.getId();
      sessionStorage.image = "https://lh3.googleusercontent.com/-EL1IRFxPixk/AAAAAAAAAAI/AAAAAAAAGfY/gwLT07Mqx9o/s96-c/photo.jpg";
        sessionStorage.id_token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2ZjBlZTE2YmU3MGM0ODhkZDM5ZGI3MGY2ZjRkMTM3YTA0ODkxZTMifQ.eyJhenAiOiI4NDg2MjY5MzM3NzUtMWV2MDR0bHRwdHVoOGEzMzJ1bnQzYXFob2hhcWg4MzkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4NDg2MjY5MzM3NzUtMWV2MDR0bHRwdHVoOGEzMzJ1bnQzYXFob2hhcWg4MzkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ0MTI1NjY3MTc0NTk4OTU0NTEiLCJlbWFpbCI6InAxMHNoaW5kZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Il9tWDNjdjV3N2lfOExVc19vOWo2aHciLCJleHAiOjE1MjE1MjQ4NTEsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJqdGkiOiJlZmM4YWNlZWNhZDY5YTQ3MTQzNjY0M2NmNjcxOTQyZjczNzkwNmRjIiwiaWF0IjoxNTIxNTIxMjUxLCJuYW1lIjoiUGFua2FqIFNoaW5kZSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLUVMMUlSRnhQaXhrL0FBQUFBQUFBQUFJL0FBQUFBQUFBR2ZZL2d3TFQwN01xeDlvL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJQYW5rYWoiLCJmYW1pbHlfbmFtZSI6IlNoaW5kZSIsImxvY2FsZSI6ImVuLUdCIn0.GJYnxocK-hF4uOHGmUyx0ZbgQ6wnhcHXLCbVG-5d6a9Q6p6TG0J4En8rqfoDrTjMMa33zkpYm_trJxEcCmBStvXO_EUYYqd0AHe6w2eXRd6Gdm6jsHDby-3xxcnupIYKsGyzj65cRZpk-UZop0npfvtQiQDk0GP044cD3DfsTLEoiBD6EUCUwqiIz2NXnXxms-dZs_JdDxLHziW1TYaxvTHffV9ZIlqXeCLFXbesjGdL72stVxt27qMu6Q1KjaFjBfkY7_JyjoMmnJBg1GswnTjMZ6SoWiobxKf-n9qOfrj_-iCd-pkbPpw-3HYTtJqYKkolsNmtw8LH409fGfEJUA";
        // sessionStorage.userId = result.userID; //email
        sessionStorage.userId = "p10shinde@gmail.com"; //email
        // sessionStorage.userName = result.userName;
        sessionStorage.userName = "Pankaj Shinde";
        // sessionStorage.userType = result.userType;
        sessionStorage.userType = "SuperAdmin";
        // sessionStorage.clientLocation = result.clientLocation;
        sessionStorage.clientLocation = "Noida";
        // sessionStorage.clientName = result.clientName;
        sessionStorage.clientName = "LGD";

      $(".main_containerr").show();
      $(".main_containerr").resize();
      loadIndexJS();
      // loginStatus.innerHTML = 'You are logged in!';
    } else {
      loginBtn.style.display = 'inline-block';
      loginView.style.display = 'inline-block'

      // loginStatus.innerHTML =
      //   'You are not logged in! Please log in to continue.';
    }
  }

  handleAuthentication();
});
