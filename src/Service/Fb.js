
const initFb = () => {
  if(window.FB){
    window.FB.XFBML.parse();
    return;
  }

  window.fbAsyncInit = function() {
      window.FB.init({
        appId            : '1049609792444207',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v11.0'
      });
    };

    // load facebook sdk script
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));  
};


export default {
  initFb
}