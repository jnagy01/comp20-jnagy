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
		locations = JSON.parse(raw);
		for(int i=0; i<raw.people.length; i++) {
			person_location = new google.maps.LatLng(locations.people[i].lat, locations.people[i].lng);
			person_marker = new google.maps.Marker({
				position: person_location,
				title: locations.people[i].login,
				icon: 'person.png'
			});
			person_marker.setMap(map);

			google.maps.event.addListener(person_marker, 'click', function(){
			infoWindow.setContent(marker.title);
			infoWindow.open(map, person_marker);
			});
		}

		/*for(int i=0; i<raw.landmarks.length; i++) {
			landmark_location = new google.maps.LatLng(locations.landmarks[i].lat, locations.landmarks[i].lng);
			landmark_marker = new google.maps.Marker({
				position: person_location,
				title: locations.Location_Name[i].login,
				icon: 'person.png'
			});
			person_marker.setMap(map);

			google.maps.event.addListener(person_marker, 'click', function(){
			infoWindow.setContent(marker.title);
			infoWindow.open(map, person_marker);
			});*/
		}

		//create more markers and loop through to update their infoWindows

	}
});
