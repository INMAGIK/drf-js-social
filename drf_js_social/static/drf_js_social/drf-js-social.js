var drfJsSocial = (function () {

  var openPop = function(url){
          
    var promise = new Promise(function(resolve, reject) {

      var w = window.open(url, "namedWindow","menubar=0,resizable=1,width=400,height=400");
      
      w.onload = function(){
        var lateHanlder = setTimeout(function(){
          reject(Error("It broke, too late"), 30000);
        });
      }

      var listener = window.addEventListener('message', function (event) {
          
          if(event.data.indexOf("token:") != 0){
            return;
          }
          var token = event.data.split(":")[1];
          console.log("worked", token);
          //clearTimeout(lateHanlder);
          resolve(token);
      });

    });

    return promise;
  };


  var loginDjango = function(socialLoginUrl, providerName){
    var authKey = Math.random() * 10000;
    var url = socialLoginUrl + providerName + "?authkey="+authKey + "&next=/popuptoken?authkey="+authKey;
    var promise = new Promise(function(resolve, reject) {

        svc.openPop(url)
        .then(function(res){
            resolve(res);
        })
        .catch(function(err){
          console.error(err)
            reject(err);
        })
    });

    return promise;
  };

  
  return {
    loginDjango: loginDjango
  };

})();






        