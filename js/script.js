function getData() {
    function get_data_from_url(url) {
        var http_req = new XMLHttpRequest();
        http_req.open("GET", 'http://avwx.rest/api/metar/EPKK?token=0IBh_4LUuxvuT8ZdzmFFhtW4c9WgnVrkJil9_Hpvy90', false);
        http_req.send(null);
        return http_req.responseText;
    }

    function parseIsoDatetime(dtstr) {
        var d = new Date(dtstr);
        var dt = d.getHours();
        return dt;
    }

    var data_url = "http://avwx.rest/api/metar/EPKK?token=0IBh_4LUuxvuT8ZdzmFFhtW4c9WgnVrkJil9_Hpvy90";
    var obj = JSON.parse(get_data_from_url(data_url));
    console.log("Data object: " + obj);

    document.getElementById("temperature").innerHTML = obj.temperature.value + " " + obj.units.temperature + "&deg;";
    document.getElementById("dewpoint").innerHTML = obj.dewpoint.value + " " + obj.units.temperature + "&deg;";
    document.getElementById("wind").innerHTML = "<wind id=wind_dir>\u2191</wind> " + obj.wind_speed.repr + " " + obj.units.wind_speed;
    document.getElementById("time").innerHTML = obj.meta.timestamp;
    document.getElementById('wind_dir').style.transform = 'rotate(' + obj.wind_direction.value + 'deg)';
  
    if (obj.visibility.repr < 500) {
        document.getElementById('visibility').style.color = '#fbe9e7';
    }
  
    if (obj.visibility.repr == "CAVOK") {
        document.getElementById("visibility").innerHTML = "&nbsp;>1 km";
    } else {
        document.getElementById("visibility").innerHTML = obj.visibility.repr + " " + obj.units.visibility;
    }
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('currenttime').innerHTML = h + ":" + m;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}

function start() {
getData();
startTime();
const time = setInterval(function() {
    getData()
}, 30000);
}
	



