(function(){
    "use strict";
    
    function getGeolocation(){
        navigator.geolocation.getCurrentPosition(success);
    }

    function success(position) {
         var lat = position.coords.latitude;
         var long = position.coords.longitude;
         document.querySelector('#latitude span').innerHTML = lat;
         document.querySelector('#longitude span').innerHTML = long;
    }
    
    window.onload = function(){
        document.getElementById('getgeo').onclick = getGeolocation;
    };
    
})();


