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
var person_icon = {
    		url: "person.png",
    		scaledSize: new google.maps.Size(50, 50)
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

	addPeopleLandmarks();
}

function addPeopleLandmarks(){

	person_icon = {
    	url: "person.png",
    	scaledSize: new google.maps.Size(30, 30)
    };
    landmark_icon = {
    	url: "landmark.png",
    	scaledSize: new google.maps.Size(30, 30)
    };

	var request = new XMLHttpRequest();
	request.open("POST", "https://defense-in-derpth.herokuapp.com/sendLocation", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200)
		{
			raw = request.responseText;
			locations = JSON.parse(raw);
			console.log(locations); //remove after
			for(i=0; i<locations["people"].length; i++) {
				person_location = new google.maps.LatLng(locations["people"][i]["lat"], locations["people"][i]["lng"]);
				person_marker = new google.maps.Marker({
					position: person_location,
					title: locations["people"][i]["login"],
					icon: person_icon
				});
				person_marker.setMap(map);

				/*google.maps.event.addListener(person_marker, 'click', function(){
				infoWindow.setContent(person_marker.title);
				infoWindow.open(map, person_marker);
				});*/
			}
			/*for(i=0; i<locations["properties"].length; i++) {
				landmark_location = new google.maps.LatLng(locations["people"][i]["lat"], locations["people"][i]["lng"]);
				land_marker = new google.maps.Marker({
					position: person_location,
					title: locations["people"][i]["login"],
					icon: person_icon
				});
				person_marker.setMap(map);*/ //have to go through details to get long and lat
		}
		};
		request.send("login=KIRSTEN_MELTON&lat="+myLat+"&lng="+myLng);
};

			//create more markers and loop through to update their infoWindows

