var myLat = 0;
var myLng = 0;
var request =  new XMLHttpRequest();
var myLocation = new google.maps.LatLng(myLat, myLng);
var map;
var marker;
var infoWindow = new google.maps.InfoWindow();
var mapOptions = {
	zoom: 13,
	center: myLocation,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};

function initMap()
{
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	getMyLocation();
}

function getMyLocation()
{
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.");
	}
}

function renderMap()
{
	myLocation = new google.maps.LatLng(myLat, myLng);
	map.panTo(myLocation); //got to self

	//create marker
	marker = new google.maps.Marker({
		position: myLocation,
		title: "Here I Am!"
	});
	marker.setMap(map);

	//open info window
	google.maps.event.addListener(marker, 'click', function(){
		infoWindow.setContent(marker.title);
		infoWindow.open(map, marker);
	});
}


request = new XMLHttpRequest();
var url =  "https://defense-in-derpth.herokuapp.com/sendLocation";
var param = "lat=myLat&lng=myLng";
req.open("POST", url, true);

http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
http.setRequestHeader("Content-length", param.length);
http.setRequestHeader("Connection", "close");

req.onreadystatechange(function(){
	if(request.readyState == 4 && request.status == 200)
	{
		result = "";
		raw = request.responseText;
		message = JSON.parse(raw);
		//create more markers and loop through to update their infoWindows

	}
});
